import { useCallback, useEffect, useMemo, useState } from "react";
import { TouchableHighlight, View } from "react-native";
import { Stack, useGlobalSearchParams } from "expo-router";
import { FlashList } from "@shopify/flash-list";
import { trpc } from "../../../src/utils/trpc";
import { Button } from "../../../src/components/Button";
import { EggBasket } from "../../../src/components/EggBasket";
import { EggButton } from "../../../src/components/EggButton";
import { Typography } from "../../../src/components/Typography";

const EventDetailPage = () => {
  const context = trpc.useContext();
  const { id } = useGlobalSearchParams();
  const { data } = trpc.event.byId.useQuery(id as unknown as string);
  const { data: userVotes } = trpc.vote.byEventId.useQuery(
    id as unknown as string,
  );
  const { mutateAsync, isLoading } = trpc.vote.create.useMutation({
    onSuccess: async () => {
      await context.event.byId.invalidate();
      await context.vote.byEventId.invalidate();
    },
  });

  const [votes, setVotes] = useState<Record<string, number>>({});

  const [update, setUpdate] = useState(true);
  const [selectedItem, setSelectedItem] = useState("");

  const creditsLeft = useMemo(() => {
    const spend = Object.values(votes).reduce((acc, curr) => {
      return acc + curr * curr;
    }, 0);

    return (data?.credits ?? 100) - spend;
  }, [votes, data, update]);

  const canPressNextCredits = useCallback(
    (direction: "up" | "down") => {
      if (!selectedItem) return false;

      const amountOfVotes = votes[selectedItem] ?? 0;
      if (amountOfVotes > 0 && direction === "down") return true;
      if (amountOfVotes < 0 && direction === "up") return true;

      const currentCredits = amountOfVotes * amountOfVotes;
      const nextCredits = (amountOfVotes + 1) * (amountOfVotes + 1);
      const diff = nextCredits - currentCredits;

      return creditsLeft >= diff;
    },
    [votes, update, selectedItem, creditsLeft],
  );

  useEffect(() => {
    if (!userVotes?.length) return;

    const credits = userVotes.reduce((acc, curr) => {
      acc[curr.optionId] = curr.credits ?? 0;
      return acc;
    }, {} as Record<string, number>);

    setVotes(() => credits);
  }, [userVotes]);

  const incrementCreditsSpend = useCallback(() => {
    if (!selectedItem) return;
    setVotes((prev) => {
      prev[selectedItem] = (prev[selectedItem] ?? 0) + 1;
      return prev;
    });
    setUpdate((prev) => !prev);
  }, [selectedItem]);

  const decrementCreditsSpend = useCallback(() => {
    if (!selectedItem) return;
    setVotes((prev) => {
      prev[selectedItem] = (prev[selectedItem] ?? 0) - 1;
      return prev;
    });
    setUpdate((prev) => !prev);
  }, [selectedItem]);

  const handleSubmit = useCallback(async () => {
    await mutateAsync(
      Object.keys(votes).map((optionId) => ({
        optionId,
        credits: votes[optionId] ?? 0,
      })),
    );
  }, [votes, mutateAsync]);

  return (
    <View className="bg-primary">
      <Stack.Screen
        options={{
          title: "Voting",
          animation: "none",
          headerBackVisible: true,
        }}
      />
      <View className="h-full w-full pt-8">
        <View className="px-8">
          <Typography intent="3xl">{data?.title}</Typography>
          <Typography className="mb-4">{data?.description}</Typography>
        </View>

        <FlashList
          className="px-8"
          estimatedItemSize={100}
          extraData={{
            selectedItem,
            creditsSpend: votes,
          }}
          data={data?.options ?? []}
          contentContainerStyle={{}}
          ItemSeparatorComponent={() => <View className="h-2" />}
          renderItem={({ item }) => (
            <TouchableHighlight
              key={item.id}
              onPress={() => setSelectedItem(item.id)}
              className={`mx-8 rounded-md border-2 p-4 ${
                selectedItem === item.id
                  ? "border-transparent bg-white/40"
                  : "border-white"
              }`}
            >
              <View className="flex">
                <View className="flex-grow">
                  <Typography>{item.name}</Typography>
                  <Typography>{item.description}</Typography>
                </View>
                <View className="-mt-10 -mb-3 flex-row items-center justify-between">
                  <View className="mt-10 justify-center">
                    <Typography>{votes[item.id] ?? 0} votes</Typography>
                    <Typography>
                      {(votes[item.id] ?? 0) * (votes[item.id] ?? 0)} credits
                    </Typography>
                  </View>
                  <View className="-mr-5 scale-75">
                    <EggBasket
                      filledPercentage={
                        (((votes[item.id] ?? 0) * (votes[item.id] ?? 0)) /
                          (data?.credits ?? 100)) *
                        100
                      }
                    />
                  </View>
                </View>
              </View>
            </TouchableHighlight>
          )}
        />
        <View className="mb-12 mt-8 flex-row items-center justify-between space-x-8 px-8">
          <View className="flex flex-row space-x-4">
            <EggButton
              icon="minus"
              onPress={decrementCreditsSpend}
              disabled={!canPressNextCredits("down")}
            />
            <Typography intent="3xl" className="min-w-[12vw] text-center">
              {creditsLeft}
            </Typography>
            <EggButton
              icon="plus"
              onPress={incrementCreditsSpend}
              disabled={!canPressNextCredits("up")}
            />
          </View>
          <Button
            intent="action"
            title="Submit"
            className="grow"
            disabled={isLoading}
            onPress={handleSubmit}
          />
        </View>
      </View>
    </View>
  );
};

export default EventDetailPage;
