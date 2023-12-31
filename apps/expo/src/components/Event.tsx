import { useMemo } from "react";
import type { FC } from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import type { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { useRouter } from "expo-router";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { trpc } from "../utils/trpc";
import { Typography } from "./Typography";
import { Button } from "./Button";
import { formatDistanceToNow } from "date-fns";
import { inferProcedureOutput } from "@trpc/server";
import { AppRouter } from "@acme/api";

export const Event: FC<Props> = ({
  endDate,
  maxTokens,
  isActive,
  title,
  description,
  numberOfLines,
  imageUri,
  id,
  extraClass,
  size,
  onPress,
  ...viewProps
}) => {
  const { push } = useRouter();
  const { data } = trpc.vote.byEventId.useQuery(id);

  const myCredits = useMemo(
    () => data?.reduce((acc, curr) => acc + curr.votes * curr.votes, 0),
    [data],
  );

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        {...viewProps}
        className={event({ className: extraClass, isActive, size })}
      >
        <View className="flex flex-row items-center justify-between gap-4">
          <View className="rounded-sm bg-white px-2">
            <Typography className="text-slate-900" intent="sm">
              {formatDistanceToNow(endDate)}
            </Typography>
          </View>
          <View className="rounded-sm bg-white px-2">
            <Typography className="text-slate-900" intent="sm">
              {myCredits}/{maxTokens}
            </Typography>
          </View>
        </View>
        <View className="mt-10 flex-grow justify-start">
          <Typography intent="2xl">{title}</Typography>
          <Typography
            intent="sm"
            className="truncate"
            numberOfLines={numberOfLines}
          >
            {description}
          </Typography>
        </View>
        <View className="mt-9">
          <Button
            title="Vote"
            intent="action"
            size="sm"
            className="w-full"
            onPress={() => push(`/event/${id}`)}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

type Event = Omit<inferProcedureOutput<AppRouter["event"]["byId"]>, "options">;

interface Props extends VariantProps<typeof event>, ViewProps, Event {
  id: string;
  maxTokens: number;
  extraClass?: string;
  numberOfLines?: number;
  onPress?: () => void;
}

const event = cva("border-4 rounded-2xl transition-all duration-300", {
  variants: {
    isActive: {
      true: "border-secondary",
      false: "border-slate-900/50",
    },
    size: {
      base: "px-5 py-7",
      sm: "px-3 py-5",
    },
  },
  defaultVariants: {
    isActive: false,
    size: "base",
  },
});
