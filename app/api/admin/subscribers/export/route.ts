import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

function escapeCsvField(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from("admin_profiles")
    .select("id")
    .eq("id", user.id)
    .single();

  if (!profile) {
    return NextResponse.json({ error: "Not authorized." }, { status: 403 });
  }

  const { data: subscribers, error } = await supabase
    .from("subscribers")
    .select("*")
    .order("subscribed_at", { ascending: false });

  if (error) {
    console.error("Error exporting subscribers:", error);
    return NextResponse.json({ error: "Failed to export subscribers." }, { status: 500 });
  }

  const header = ["Email", "Subscribed At", "Status"];
  const rows = (subscribers ?? []).map((s) => [
    escapeCsvField(s.email),
    escapeCsvField(new Date(s.subscribed_at).toISOString()),
    escapeCsvField(s.is_active ? "Active" : "Unsubscribed"),
  ]);

  const csv = [header.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const filename = `reemdigitech-subscribers-${new Date().toISOString().split("T")[0]}.csv`;

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
