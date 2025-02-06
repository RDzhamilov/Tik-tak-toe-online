import { getGameById } from "./../../../entities/game/services/get-game";
import { GameId } from "@/kernel/ids";
import { sseStream } from "@/shared/lib/sse/server";
import { NextRequest } from "next/server";
import { gameEvents } from "../services/game-events";

export async function getGameStreams(
  req: NextRequest,
  { params }: { params: Promise<{ id: GameId }> },
) {
  const { id } = await params;

  const game = await getGameById(id);

  if (!game) {
    return new Response("Game not found", { status: 404 });
  }

  const { response, write, addCloseListener } = sseStream(req);

  write(game);

  addCloseListener(
    await gameEvents.addListener(game.id, (event) => {
      write(event.data);
    }),
  );

  return response;
}
