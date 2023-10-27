import { AppRouter } from "@acme/api";
import { inferProcedureOutput } from "@trpc/server";
import { FC } from "react";
import { View } from "react-native";
import { Typography } from "./Typography";

export const EventResult: FC<Props> = ({ title }) => {
  return (
    <View className="bg-yellow-600">
      <Typography>{title}</Typography>
    </View>
  );
};

type EventWithOptions = inferProcedureOutput<AppRouter["event"]["my"]>[number];

interface Props extends EventWithOptions {
  other?: boolean;
}
