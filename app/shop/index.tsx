import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { productImageUrl } from "@/constants";
import axios from "axios";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import apis from "../../apis";

export default function HomeScreen() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(apis.getAllProducts).then((res) => {
      setProducts(res.data);
    });
  }, []);

  return (
    <ScrollView>
      <Header />
      <Text style={styles.pageHeading}>Wholesale Shop</Text>
      {products.length > 0 && products.map((product:any, index) => {
        return (
          <Link href={{pathname: '/shop/[dept]/[cat]/[id]', params: {dept: product.dept, cat : product.cat, id : product.p_id}}} key={index}>
            <Image source={{uri: productImageUrl+product?.article_no+'/front.jpg'}} style={{width: '100%', height: 600}} />
            <View style={styles.productInfo}>
              <Text>{product.article_no} - {product.product_name}</Text>
              <Text>{product.fabric_type} {product.fabric_stretch} {product.fabric_weight} {product.fabric_content}</Text>
              <Text>Rs. {product.price_pkr}</Text>
              <Text>Sizes {product.p_sizes}</Text>
              <Text>Stock 5 sets</Text>
            </View>
          </Link>
        )
      })}
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header : {
    padding : 20,
  },
  pageHeading : {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 26,
    marginBottom: 25
  },
  productInfo: {
    padding:10 
  }
})