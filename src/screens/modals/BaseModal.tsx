import { Screens } from "@/enums/navigation";
import { RootStackScreenProps } from "@/interfaces/navigation";
import { Modal, Pressable, SafeAreaView, Text, View } from "react-native";

const BaseModal = ({
  navigation: _navigation,
}: RootStackScreenProps<Screens.BASE_MODAL>) => {
  return (
    <Modal
      animationType="slide"
      // transparent={true}
      // visible={true}
      onRequestClose={() => {}}
      // presentationStyle="pageSheet"
    >
      <SafeAreaView className="flex-auto p-2">
        <View className={`flex-1 justify-end ${true && "bg-secondary"} p-1`}>
          <View className="flex h-[70%] w-full items-center justify-center rounded-t-[40px] bg-secondary p-5">
            <View className="bg-while rounded-10 items-center border p-5">
              <Pressable onPress={() => {}}>
                <Text>Hello World!</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

BaseModal.displayName = "BaseModalScreen";

export default BaseModal;
