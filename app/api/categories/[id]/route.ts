import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> => {
  const { id } = params;

  const category = await prisma.category.findUniqueOrThrow({
    include: {
      posts: true,
    },
    where: {
      id: +id,
    },
  });

  if (!category) {
    return NextResponse.json({
      status: 404,
      data: undefined,
    });
  }

  return NextResponse.json({
    status: 200,
    data: category,
  });
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  const body = await req.json();

  const { name } = body;

  const category = await prisma.category.findUniqueOrThrow({
    where: {
      id: +id,
    },
  });

  const updatedCategory = await prisma.category.update({
    where: {
      id: +id,
    },
    data: {
      name: name ?? category.name,
    },
  });

  if (!updatedCategory) {
    return NextResponse.json({
      status: 404,
      data: {
        message: "An error occured while updating category",
        updatedData: undefined,
      },
    });
  }

  return NextResponse.json({
    status: 200,
    data: {
      message: "category have been updated",
      updatedData: updatedCategory,
    },
  });
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  const deletedPosts = await prisma.post.deleteMany({
    where: {
      categoryId: +id,
    },
  });

  const category = await prisma.category.delete({
    where: {
      id: +id,
    },
  });

  if (!category) {
    return NextResponse.json({
      status: 404,
      data: {
        message: "An error occured while deleting category",
        deletedData: undefined,
      },
    });
  }

  return NextResponse.json({
    status: 200,
    data: {
      message: "category have been deleted",
      deletedData: {
        categoryDeleted: category,
        postsDeleted: deletedPosts,
      },
    },
  });
};
