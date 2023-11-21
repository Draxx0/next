import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> => {
  const { id } = params;

  const post = await prisma.post.findUniqueOrThrow({
    include: {
      category: true,
    },
    where: {
      id: +id,
    },
  });

  if (!post) {
    return NextResponse.json({
      status: 404,
      data: undefined,
    });
  }

  return NextResponse.json({
    status: 200,
    data: post,
  });
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const body = await req.json();

  const { title, content } = body;

  const post = await prisma.post.findUniqueOrThrow({
    where: {
      id: +id,
    },
  });

  const updatedPost = await prisma.post.update({
    where: {
      id: +id,
    },
    data: {
      title: title ?? post.title,
      content: content ?? post.content,
    },
  });

  if (!updatedPost) {
    return NextResponse.json({
      status: 404,
      data: {
        message: "An error occured while updating post",
        updatedData: undefined,
      },
    });
  }

  return NextResponse.json({
    status: 200,
    data: {
      message: "post have been updated",
      updatedData: updatedPost,
    },
  });
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  const post = await prisma.post.delete({
    where: {
      id: +id,
    },
  });

  if (!post) {
    return NextResponse.json({
      status: 404,
      data: {
        message: "An error occured while deleting post",
        deletedData: undefined,
      },
    });
  }

  return NextResponse.json({
    status: 200,
    data: {
      message: "post have been deleted",
      deletedData: post,
    },
  });
};
