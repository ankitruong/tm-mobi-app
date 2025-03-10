import UserAvatar from "@/components/avatars/UserAvatar";
import { memo } from "react";
import { Text, View } from "react-native";

type MyMessageProps = {
  message: string;
  testID?: string;
};

const MyMessage = memo(({ message, testID }: MyMessageProps) => {
  return (
    <View className="flex-row items-end gap-3 py-5" testID={testID}>
      <View className="flex-1 rounded-t-xl rounded-bl-xl bg-neutral-content px-4 py-3">
        <Text className="font-Inter-Regular text-[16px] leading-[24px] text-secondary">
          {message}
        </Text>
      </View>
      <UserAvatar size={24} />
    </View>
  );
});

MyMessage.displayName = "MyMessage";

export default MyMessage;
