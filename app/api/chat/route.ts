import { NextRequest, NextResponse } from "next/server";
import { CHATBOT_SYSTEM_PROMPT } from "@/components/chatbot/chatbot-context";
import { submitContactForm } from "@/lib/actions";
import type { ChatApiRequest } from "@/types/chatbot";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "AI service not configured." },
        { status: 503 }
      );
    }

    const body: ChatApiRequest = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid request." },
        { status: 400 }
      );
    }

    // Build the conversation history in Gemini's expected format
    const contents = messages.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: CHATBOT_SYSTEM_PROMPT }],
          },
          contents,
          tools: [
            {
              functionDeclarations: [
                {
                  name: "submit_lead",
                  description: "Submits a new lead/contact form. Call this only after you have collected the user's name, email, and message/requirements.",
                  parameters: {
                    type: "OBJECT",
                    properties: {
                      name: { type: "STRING", description: "Full name" },
                      email: { type: "STRING", description: "Email address" },
                      service_interested_in: { type: "STRING", description: "Service they are interested in" },
                      message: { type: "STRING", description: "Their project details or requirements" },
                    },
                    required: ["name", "email", "message"],
                  },
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 512,
          },
        }),
      }
    );

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      let availableModels = "Could not fetch models";
      try {
        const modelsRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        if (modelsRes.ok) {
          const modelsData = await modelsRes.json();
          availableModels = modelsData.models.map((m: any) => m.name).join(", ");
        }
      } catch (e) {}

      console.error("Gemini API error:", errText);
      return NextResponse.json(
        { error: "AI service error.", details: errText, availableModels },
        { status: 502 }
      );
    }

    const data = await geminiRes.json();
    const parts = data?.candidates?.[0]?.content?.parts;

    // Intercept function calls
    if (parts?.[0]?.functionCall) {
      const call = parts[0].functionCall;
      if (call.name === "submit_lead") {
        const result = await submitContactForm(call.args);
        return NextResponse.json({
          reply: result.success
            ? "Thank you! I have successfully submitted your details to our team. We'll be in touch very soon."
            : "Sorry, I had trouble submitting your details automatically. Please use our contact form page instead.",
        });
      }
    }

    const reply =
      parts?.[0]?.text ??
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
