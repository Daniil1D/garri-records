import { prisma } from "@/prisma/prisma-client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/shared/contants/auth-options";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { avatarUrl } = await req.json();

  const user = await prisma.user.update({
    where: { email: session.user.email },
    data: { avatarUrl },
  });

  return NextResponse.json(user);
}