import Text from "@/components/texts/Text";
import { Image } from "expo-image";
import { memo, useState } from "react";
import { View } from "react-native";

type TokenIconProps = {
  name: string;
  imageUrl?: string;
  networkImageUrl?: string;
  size?: number;
};

const TokenIcon = memo(
  ({ name, imageUrl, networkImageUrl, size = 40 }: TokenIconProps) => {
    const [hasError, setHasError] = useState(false);

    if (hasError || !imageUrl) {
      return (
        <View style={{ width: size, height: size, position: "relative" }}>
          <View
            className="items-center justify-center rounded-full bg-gray-100"
            style={{ width: size, height: size }}
          >
            <Text className="!font-Inter-Medium !text-lg">
              {name.charAt(0)}
            </Text>
          </View>
          {networkImageUrl ? (
            <View className="absolute -right-1 -top-1">
              <Image
                source={{ uri: networkImageUrl }}
                style={{
                  width: size * 0.4,
                  height: size * 0.4,
                  borderRadius: size * 0.4,
                }}
                contentFit="cover"
              />
            </View>
          ) : null}
        </View>
      );
    }

    return (
      <View style={{ width: size, height: size, position: "relative" }}>
        <Image
          source={{ uri: imageUrl }}
          style={{ width: size, height: size, borderRadius: size }}
          contentFit="cover"
          onError={() => setHasError(true)}
        />
        {networkImageUrl ? (
          <View className="absolute -right-1 -top-1">
            <Image
              source={{ uri: networkImageUrl }}
              style={{
                width: size * 0.4,
                height: size * 0.4,
                borderRadius: size * 0.4,
              }}
              contentFit="cover"
            />
          </View>
        ) : null}
      </View>
    );
  },
);

TokenIcon.displayName = "TokenIcon";

export default TokenIcon;
