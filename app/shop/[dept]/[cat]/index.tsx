import apis from "@/apis";
import { productImageUrl } from "@/constants";
import axios from "axios";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function ProductByCategory() {
  const [products, setProducts] = useState([]);
  const params = useSearchParams();
  const getDept = params.get('dept');
  const getCategory = params.get('cat');
  
  useEffect(() => {
    const apiUrl = `${apis.getAllProducts}/${getDept}/${getCategory}`;
    axios.get(apiUrl).then((res) => {
      setProducts(res.data);
    });
  }, []);

  return (
    <ScrollView>
      <View style={styles.header}>
        <Image source={require('../../../../assets/images/logo.jpg')} />
      </View>
      <Text>Wholesale Shop</Text>
      <View style={styles.container}>
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
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
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