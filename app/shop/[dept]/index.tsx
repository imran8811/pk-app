import Header from "@/components/Header";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function Shop() {
  return (
    <ScrollView>
      <Header />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>This is shop department</Text>
      </View>
    </ScrollView>
  );
}
