import useTheme from "@/hooks/misc/useTheme";
import { useLingui } from "@lingui/react/macro";
import { useCallback, useMemo, useRef, useState } from "react";
import { Dimensions, FlatList, View } from "react-native";
import IntroCarouselItem from "./IntroCarouselItem";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

type CarouselItem = {
  id: string;
  title: string;
  description: string;
};

const IntroCarousel = ({ testID }: { testID?: string }) => {
  const [activeId, setActiveId] = useState("1");
  const flashListRef = useRef<FlatList<CarouselItem>>(null);
  const { theme } = useTheme();

  const { t } = useLingui();

  const CAROUSEL_DATA: CarouselItem[] = useMemo(
    () => [
      {
        id: "1",
        title: t`Beat the Crypto Market with AI Insights`,
        description: t`Build crypto wealth with AI-driven insights.`,
      },
      {
        id: "2",
        title: t`Spot Hidden Gems`,
        description: t`Unearth standout tokens from over 7,000 options with powerful AI-driven insights.`,
      },
      {
        id: "3",
        title: t`Your Personal Crypto Assistant`,
        description: t`Trade, swap, and track the market effortlessly. Access live charts, real-time market insights, with our AI Agent.`,
      },
    ],
    [t],
  );

  const renderItem = useCallback(
    ({ item }: { item: CarouselItem }) => (
      <View style={{ width: SCREEN_WIDTH }}>
        <IntroCarouselItem
          title={item.title}
          description={item.description}
          isActive={activeId === item.id}
        />
      </View>
    ),
    [activeId],
  );

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: Array<{ item: CarouselItem }> }) => {
      if (viewableItems[0]) {
        setActiveId(viewableItems[0].item.id);
      }
    },
    [],
  );

  const viewabilityConfig = useMemo(
    () => ({
      viewAreaCoveragePercentThreshold: 50,
      minimumViewTime: 0,
    }),
    [],
  );

  return (
    <View className="flex-auto gap-6" testID={testID}>
      <View className="flex-row gap-2 px-6">
        {CAROUSEL_DATA.map((item) => (
          <View
            key={item.id}
            className="h-1 w-8 rounded-full"
            style={{
              backgroundColor:
                item.id === activeId
                  ? theme["secondary-content"].DEFAULT
                  : theme["neutral-content"][700],
            }}
          />
        ))}
      </View>
      <View className="h-48">
        <FlatList
          ref={flashListRef}
          data={CAROUSEL_DATA}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          viewabilityConfig={viewabilityConfig}
          onViewableItemsChanged={onViewableItemsChanged}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

IntroCarousel.displayName = "IntroCarousel";

export default IntroCarousel;
