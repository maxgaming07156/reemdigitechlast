import { NextRequest, NextResponse } from "next/server";
import { CHATBOT_SYSTEM_PROMPT } from "@/components/chatbot/chatbot-context";
import { submitContactForm } from "@/lib/actions";
import type { ChatApiRequest } from "@/types/chatbot";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ 
        reply: `SYSTEM DIAGNOSTIC: GROQ_API_KEY is missing from Vercel Environment Variables.` 
      });
    }

    const body: ChatApiRequest = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid request." },
        { status: 400 }
      );
    }

    // Build the conversation history in Groq/OpenAI expected format
    const formattedMessages = [
      { role: "system", content: CHATBOT_SYSTEM_PROMPT },
      ...messages.map((msg) => ({
        role: msg.role === "user" ? "user" : "assistant",
        content: msg.content,
      }))
    ];

    const grokRes = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "llama3-70b-8192",
          messages: formattedMessages,
          tools: [
            {
              type: "function",
              function: {
                name: "submit_lead",
                description: "Submits a new lead/contact form. Call this only after you have collected the user's name, email, and message/requirements.",
                parameters: {
                  type: "object",
                  properties: {
                    name: { type: "string", description: "Full name" },
                    email: { type: "string", description: "Email address" },
                    service_interested_in: { type: "string", description: "Service they are interested in" },
                    message: { type: "string", description: "Their project details or requirements" },
                  },
                  required: ["name", "email", "message"],
                },
              },
            },
          ],
          temperature: 0.7,
          max_tokens: 512,
        }),
      }
    );

    if (!grokRes.ok) {
      const errText = await grokRes.text();
      console.error("Grok API error:", errText);
      return NextResponse.json({ 
        reply: `SYSTEM DIAGNOSTIC: The Grok API rejected the request. Details: ${errText}` 
      });
    }

    const data = await grokRes.json();
    const message = data?.choices?.[0]?.message;

    // Intercept function calls
    if (message?.tool_calls && message.tool_calls.length > 0) {
      const toolCall = message.tool_calls[0];
      if (toolCall.function.name === "submit_lead") {
        const args = JSON.parse(toolCall.function.arguments);
        const result = await submitContactForm(args);
        return NextResponse.json({
          reply: result.success
            ? "Thank you! I have successfully submitted your details to our team. We'll be in touch very soon."
            : "Sorry, I had trouble submitting your details automatically. Please use our contact form page instead.",
        });
      }
    }

    const reply =
      message?.content ??
      "I'm sorry, I couldn't generate a response. Please contact us directly at info@reemdigitech.com.";

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error.", details: error.message },
      { status: 500 }
    );
  }
}
