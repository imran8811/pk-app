import { productImageUrl } from "@/Constants";
import axios from "axios";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/products").then((res) => {
      console.log(res.data);
      setProducts(res.data);
    });
  }, []);

  return (
    <ScrollView>
      <View style={styles.header}>
        <Image source={require('../../assets/images/logo.jpg')} />
      </View>
      <Text style={styles.pageHeading}>Wholesale Shop</Text>
      {products.length > 0 && products.map((product:any, index) => {
        return <View key={index}>
          <img src={productImageUrl+product.article_no+'/front.jpg'} />
          <Text>{product.article_no}</Text>
          <Text>{product.product_name}</Text>
        </View>  
      })}
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
  }
})