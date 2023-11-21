import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (
  req: NextRequest,
  res: NextResponse
): Promise<NextResponse> => {
  const categories = await prisma.category.findMany({
    include: {
      posts: true,
    },
  });

  if (!categories) {
    return NextResponse.json({
      status: 404,
      data: undefined,
    });
  }

  return NextResponse.json({
    status: 200,
    data: categories,
  });
};

export const POST = async (
  req: NextRequest,
  res: NextResponse
): Promise<NextResponse> => {
  const body = await req.json();

  const { name } = body;

  const newCategory = await prisma.category.create({
    data: {
      name,
    },
  });

  return NextResponse.json({
    status: 200,
    data: { ...newCategory },
  });
};
