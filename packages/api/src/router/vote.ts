import { router, protectedProcedure } from "../trpc";
import { z } from "zod";

const votes = z.array(
  z.object({
    optionId: z.string(),
    votes: z.number(),
  }),
);

export const voteRouter = router({
  create: protectedProcedure.input(votes).mutation(({ ctx, input }) => {
    return ctx.prisma.$transaction(async (transaction) => {
      if (input[0]) {
        await transaction.vote.deleteMany({
          where: {
            userId: ctx.auth.userId,
            option: {
              id: { in: input.map((vote) => vote.optionId) },
            },
          },
        });
      }

      return transaction.vote.createMany({
        data: input.map((vote) => ({
          ...vote,
          userId: ctx.auth.userId,
        })),
      });
    });
  }),
  byEventId: protectedProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.vote.findMany({
      where: {
        userId: ctx.auth.userId,
        option: { eventId: input },
      },
    });
  }),
});
