import { NextResponse } from "next/server";
import { createAgent, getAgent } from "@/actions/useractions";

export async function POST(req) {
    const { name, email } = await req.json();
    const agent = await createAgent(email, name);
    return NextResponse.json(agent);
}
export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const agent = await getAgent(email);
    return NextResponse.json(agent);
}