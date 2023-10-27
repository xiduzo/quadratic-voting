import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";

const createEventSchema = z.object({
  event: z.object({
    title: z.string(),
    description: z.string().max(280),
    credits: z.number(),
    imageUri: z.string(),
    startDate: z.date(),
    endDate: z.date(),
  }),
  options: z.array(
    z.object({
      name: z.string(),
      description: z.string().max(280),
    }),
  ),
});

export const eventRouter = router({
  all: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.event.findMany();
  }),
  latest: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.event.findMany({
      orderBy: { createdAt: "desc" },
      where: { endDate: { gte: new Date() } },
      take: 3,
    });
  }),
  trending: publicProcedure.query(async ({ ctx }) => {
    const latestVotes = await ctx.prisma.vote.findMany({
      orderBy: { createdAt: "desc" },
      where: { option: { event: { endDate: { gte: new Date() } } } },
      include: { option: { include: { event: { select: { id: true } } } } },
      take: 500,
    });

    // reduce votes to a map of event id to vote count
    const eventVoteCountMap = latestVotes.reduce((acc, vote) => {
      const eventId = vote.option.event.id;
      const currentCount = acc.get(eventId) ?? 0;
      acc.set(eventId, currentCount + 1);
      return acc;
    }, new Map<string, number>());

    // get the top 2 events
    const topEvents = Array.from(eventVoteCountMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2);

    // get the events from the db
    return ctx.prisma.event.findMany({
      where: { id: { in: topEvents.map(([id]) => id) } },
      include: { options: true },
    });
  }),
  my: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.event.findMany({
      where: { createdBy: ctx.auth.userId },
      include: { options: true },
    });
  }),
  byId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.prisma.event.findUniqueOrThrow({
      where: { id: input },
      include: { options: true },
    });
  }),
  create: protectedProcedure
    .input(createEventSchema)
    .mutation(({ ctx, input }) => {
      return ctx.prisma.event.create({
        data: {
          ...input.event,
          createdBy: ctx.auth.userId,
          options: {
            create: input.options,
          },
        },
      });
    }),
  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const event = await ctx.prisma.event.findUnique({
        where: { id: input },
      });

      if (!event) return;

      // TODO delete image from vercel blob

      if (event.createdBy !== ctx.auth.userId) return;

      return ctx.prisma.event.delete({
        where: { id: input },
      });
    }),
});
