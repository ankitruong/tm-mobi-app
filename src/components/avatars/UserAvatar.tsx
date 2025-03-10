import { Image } from "expo-image";
import { memo, useState } from "react";
import { View } from "react-native";

type UserAvatarProps = {
  imageUrl?: string;
  size?: number;
};

const UserAvatar = memo(({ imageUrl, size = 40 }: UserAvatarProps) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !imageUrl) {
    return (
      <View style={{ width: size, height: size }}>
        <Image
          source={require("@/assets/images/user-avatar.webp")}
          style={{ width: size, height: size, borderRadius: size }}
          contentFit="cover"
        />
      </View>
    );
  }

  return (
    <View style={{ width: size, height: size }}>
      <Image
        source={{ uri: imageUrl }}
        style={{ width: size, height: size, borderRadius: size }}
        contentFit="cover"
        onError={() => setHasError(true)}
        placeholder={require("@/assets/images/user-avatar.webp")}
        placeholderContentFit="cover"
      />
    </View>
  );
});

UserAvatar.displayName = "UserAvatar";

export default UserAvatar;
