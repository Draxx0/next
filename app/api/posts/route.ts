import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (
  req: NextRequest,
  res: NextResponse
): Promise<NextResponse> => {
  const orderBy = req.nextUrl.searchParams.get("orderBy") as "asc" | "desc";
  const categoryId = req.nextUrl.searchParams.get("categoryId");

  const posts = categoryId
    ? await prisma.post.findMany({
        where: {
          categoryId: +categoryId,
        },
        include: {
          category: true,
        },
        orderBy: {
          createdAt: orderBy,
        },
      })
    : await prisma.post.findMany({
        orderBy: {
          createdAt: orderBy,
        },
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
