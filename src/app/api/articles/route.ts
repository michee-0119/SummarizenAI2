import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const articles = await prisma.article.findMany({
    include: { quizzes: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(articles);
}

export async function POST(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body = await req.json();

  const article = await prisma.article.create({
    data: {
      title: body.title,
      content: body.content,
      summary: body.summary,
      userId,
    },
  });

  return NextResponse.json(article);
}
