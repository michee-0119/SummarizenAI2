import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { error } from "console";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.userId || body.quizId || typeof body.score !== "number") {
    return NextResponse.json(
      { error: "Missing or invalid end" },
      { status: 400 },
    );
  }

  try {
    const score = await prisma.userScore.create({
      data: {
        userId: body.userId,
        quizId: body.quizId,
        score: body.score,
      },
    });
    return NextResponse.json(score);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create score" },
      { status: 500 },
    );
  }
}
