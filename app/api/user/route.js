import { NextResponse } from "next/server";
import { createUser } from "@/actions/useractions";

export async function POST(req) {
    const { user } = await req.json();
    const newUser = await createUser(user);
    return NextResponse.json(newUser);
}