import Layout from "@/components/layouts/Layout";
import TradeHistory from "@/components/trades/TradeHistory";
import { MainBottomTabScreens } from "@/enums/navigation";
import { MainBottomTabScreenProps } from "@/interfaces/navigation";
import { View } from "react-native";

const Trades = ({
  navigation: _navigation,
}: MainBottomTabScreenProps<MainBottomTabScreens.TRADES>) => (
  <Layout>
    <View className="flex-auto pt-5">
      <TradeHistory />
    </View>
  </Layout>
);

Trades.displayName = "TradesScreen";

export default Trades;
