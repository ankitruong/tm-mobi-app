import UserAvatar from "@/components/avatars/UserAvatar";
import Text from "@/components/texts/Text";
import useTheme from "@/hooks/misc/useTheme";
import useUserDetails from "@/hooks/user/useUserDetails";
import Feather from "@expo/vector-icons/Feather";
import { Pressable, View } from "react-native";

type DrawerUserCardProps = {
  onPress: () => void;
};

const DrawerUserCard = ({ onPress }: DrawerUserCardProps) => {
  const { email, fullName } = useUserDetails();

  const { theme } = useTheme();

  return (
    <Pressable
      className="flex-row items-center gap-3 rounded-lg border border-neutral-content-700 p-3"
      onPress={onPress}
    >
      <UserAvatar size={40} />
      <View className="flex-1">
        <Text
          className="truncate !font-Inter-Medium !text-lg"
          numberOfLines={1}
        >
          {fullName}
        </Text>
        <Text className="truncate !text-base-200" numberOfLines={1}>
          {email}
        </Text>
      </View>
      <Feather
        name="chevron-down"
        size={16}
        color={theme["base-100"].DEFAULT}
      />
    </Pressable>
  );
};

DrawerUserCard.displayName = "DrawerUserCard";

export default DrawerUserCard;
