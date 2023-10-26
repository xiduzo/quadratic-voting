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
      take: 2,
    });
  }),
  trending: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.event.findMany({
      orderBy: { credits: "desc" },
      take: 2,
    });
  }),
  my: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.event.findMany({
      where: { createdBy: ctx.auth.userId },
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
