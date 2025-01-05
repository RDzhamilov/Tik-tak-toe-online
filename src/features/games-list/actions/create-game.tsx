"use server";

import { createGames } from "@/entities/game/server";
import { prisma } from "@/shared/lib/db";
import { left } from "@/shared/lib/either";
import { redirect } from "next/navigation";

export const createGameAction = async () => {
  const user = await prisma.user.findFirst();

  if (!user) {
    return left("user-not-found" as const);
  }
  const gameResult = await createGames(user);

  if (gameResult.type === "right") {
    redirect(`/game/${gameResult.value.id}`);
  }

  return gameResult;
};
