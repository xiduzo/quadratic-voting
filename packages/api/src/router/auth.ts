import { protectedProcedure, router } from "../trpc";
import { clerkClient } from "@clerk/nextjs/server";

export const authRouter = router({
  requestAccountDeletion: protectedProcedure.mutation(async ({ ctx }) => {
    try {
      await ctx.prisma.event.deleteMany({
        where: { createdBy: ctx.auth.userId },
      });

      return clerkClient.users.deleteUser(ctx.auth.userId);
    } catch (error) {
      console.log(error);
      return;
    }
  }),
});
