import { AppRouter } from "@acme/api";
import { inferProcedureOutput } from "@trpc/server";
import { FC, useMemo } from "react";
import { View } from "react-native";
import { Typography } from "./Typography";
import { EggSmall } from "./svgs";
import { isFuture } from "date-fns";

export const EventResult: FC<EventWithOptions> = ({
  title,
  description,
  credits,
  options,
  endDate,
}) => {
  const totalVotes = useMemo(() => {
    return options.reduce((acc, option) => acc + option.votes.length, 0);
  }, [options]);

  return (
    <View>
      <View className="rounded-3xl rounded-bl-none bg-yellow-600 p-4">
        <Typography intent="xl" className="text-base text-[#292727]">
          Poll {isFuture(endDate) ? "open" : "closed"}
        </Typography>
        <Typography intent="3xl" className="mt-4 text-[#292727]">
          {title}
        </Typography>
        <Typography intent="2xl" className="mt-4 text-[#292727]">
          {description}
        </Typography>
      </View>

      <View className="-mr-3.5 flex-row items-start">
        <View className="grow space-y-2 rounded-b-3xl bg-yellow-600 p-4">
          {options.map((option) => (
            <View key={option.id} className="rounded-full bg-black/30 py-2">
              <View
                className="absolute h-10 rounded-full bg-[#292727]"
                style={{
                  width: `${(option.votes.length / totalVotes) * 100}%`,
                }}
              />
              <View className="flex-row items-center justify-between px-3">
                <Typography intent="lg" className="text-base">
                  {option.name}
                </Typography>
                <Typography intent="lg" className="text-sm">
                  {option.votes.length} vote
                  {option.votes.length === 1 ? "" : "s"}
                </Typography>
              </View>
            </View>
          ))}
        </View>
        <View className="rounded-r-3xl rounded-bl-3xl bg-yellow-600">
          <View className="items-center rounded-3xl border-[16px] border-primary p-4">
            <EggSmall color="#292727" />
            <Typography intent="2xl" className="mt-1 text-xs text-[#292727]">
              {credits}
            </Typography>
          </View>
        </View>
      </View>
    </View>
  );
};

type EventWithOptions = inferProcedureOutput<AppRouter["event"]["my"]>[number];
