import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { styles } from "@/styles";
import { Link } from "expo-router";
import { useCallback, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  
  return (
    <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
      <Header />
      <View style={styles.categoryBox}>
        <Link href={{pathname: '/shop'}} style={styles.categoryLink}>Wholesale Shop</Link>
      </View>
      <View>
        <Link href="/(app)">Logout</Link>
      </View>
      <Footer />
    </ScrollView>
  );
}
