import React, { useCallback } from "react";
import { View } from "react-native";
import { useFormContext } from "react-hook-form";
import { CreateFormData } from "../../../app/event/create";
import { Typography } from "../Typography";
import { EggButton } from "../EggButton";
import { EggBasket } from "../EggBasket";

export const Step3 = () => {
  const { setValue, getValues } = useFormContext<CreateFormData>();

  const updateAmount = useCallback(
    (by: number) => () => {
      setValue("credits", getValues("credits") + by);
    },
    [setValue, getValues],
  );

  return (
    <View className="mt-20 grow">
      <Typography dimmed className="mb-10">
        Select your voter token allocation
      </Typography>
      <View className="flex flex-row items-center justify-center space-x-4">
        <EggButton
          icon="minus"
          onPress={updateAmount(-10)}
          disabled={getValues("credits") <= 10}
        />
        <View className="min-w-[150px] items-center">
          <Typography intent="4xl" className="text-7xl leading-[120px]">
            {getValues("credits")}
          </Typography>
        </View>
        <EggButton
          icon="plus"
          onPress={updateAmount(10)}
          disabled={getValues("credits") >= 999}
        />
      </View>
      <EggBasket filledPercentage={100} />
    </View>
  );
};
