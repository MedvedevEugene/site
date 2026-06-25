import { NextResponse } from "next/server";
import { createToolSession, getToolSession } from "@/lib/tool-sessions";
import type { ToolId } from "@/lib/tool-sessions";

const VALID_TOOLS: ToolId[] = ["insightograph", "sixteen_associations", "nlu"];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const tool = body.tool as ToolId;
    const payload = body.payload;

    if (!VALID_TOOLS.includes(tool) || !payload || typeof payload !== "object") {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const session = await createToolSession(tool, payload);
    return NextResponse.json({ id: session.id });
  } catch (error) {
    console.error("[tool-sessions POST]", error);
    return NextResponse.json({ error: "Failed to save session" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const id = new URL(request.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  try {
    const session = await getToolSession(id);
    if (!session) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(session);
  } catch (error) {
    console.error("[tool-sessions GET]", error);
    return NextResponse.json({ error: "Failed to load session" }, { status: 500 });
  }
}
