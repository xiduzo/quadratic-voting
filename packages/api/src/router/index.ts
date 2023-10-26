import { router } from "../trpc";
import { postRouter } from "./post";
import { authRouter } from "./auth";
import { eventRouter } from "./event";
import { voteRouter } from "./vote";

export const appRouter = router({
  post: postRouter,
  auth: authRouter,
  event: eventRouter,
  vote: voteRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
