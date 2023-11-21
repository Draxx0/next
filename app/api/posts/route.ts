import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (
  req: NextRequest,
  res: NextResponse
): Promise<NextResponse> => {
  const posts = await prisma.post.findMany({
    include: {
      category: true,
    },
  });

  if (!posts) {
    return NextResponse.json({
      status: 404,
      data: undefined,
    });
  }

  return NextResponse.json({
    status: 200,
    data: posts,
  });
};

export const POST = async (
  req: NextRequest,
  res: NextResponse
): Promise<NextResponse> => {
  const body = await req.json();

  const { title, content, categoryId } = body;

  const newPost = await prisma.post.create({
    data: {
      title,
      content,
      categoryId: +categoryId,
    },
  });

  return NextResponse.json({
    status: 200,
    data: { ...newPost },
  });
};
