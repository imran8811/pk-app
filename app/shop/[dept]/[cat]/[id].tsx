import apis from "@/apis";
import { addToCart } from "@/app/interfaces/add-to-cart.model";
import Header from "@/components/Header";
import { productImageUrl } from "@/constants";
import axios from "axios";
import { usePathname, useRouter, useSearchParams } from "expo-router/build/hooks";
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from "react";
import { Alert, Button, Image, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function ProductDetails() {
  const [productDetails, setProductsDetails] = useState([]);
  const [addedToCart, setAddedToCart] = useState(false);
  const [instructions, setInstructions] = useState('');
  const [quantity, setQuantity] = useState('');
  const [userId, setUserId] = useState('');
  
  const router = useRouter();
  const params = useSearchParams();
  const getProductId = params.get('id');
  const pathName = usePathname();
  
  useEffect(() => {
    const apiUrl = `${apis.getAllProducts}/${getProductId}`;
    axios.get(apiUrl).then((res) => {
      setProductsDetails(res.data);
    }).catch((err) => {
      Alert.alert(err);
    })
  }, []);

  const addToCart = async (apiData: addToCart) => {
    let userId = await SecureStore.getItemAsync('userId');
    axios.post(apis.addToCart, {...apiData, userId}).then((res) => {
      if(res.data.type === 'success') {
        setAddedToCart(true);
        Alert.alert("", "Added Successfully", [
          {
            text: 'Checkout',
            onPress: () => router.push('/checkout'),
            style: 'default',
          },
          {
            text: 'Continue Shopping', 
            onPress: () => router.back(),
            style: 'destructive'
          },
        ]);
      } else {
        setAddedToCart(false);
        Alert.alert(JSON.stringify(res.data));
      }
    });
  }
  
  return (
    <ScrollView>
      <Header />
        <View style={styles.container}>
        {productDetails.length > 0 && productDetails.map((product:any, index) => {
          return (
            <View style={{flex : 1}} key={index}>
              <View>
                <Image source={{uri: productImageUrl+product?.article_no+'/front.jpg'}} style={{width: '100%', height: 600}} />
              </View>
              <View style={styles.productInfoWrap}>
                <Text style={styles.productInfo}>
                  Article No: {product.article_no}
                </Text>
                <Text style={styles.productInfo}>
                  Price: {product.price_pkr}
                </Text>
                <Text style={styles.productInfo}>
                  Name: {product.product_name}
                </Text>
                <Text style={styles.productInfo}>
                  Quantity: <TextInput placeholder="number of sets" onChangeText={setQuantity} value={quantity} keyboardType="numeric" style={styles.textInput} />
                </Text>
                <TextInput placeholder="Write instruction here" onChangeText={setInstructions} value={instructions} style={styles.textAreaInput}>
                </TextInput>
              </View>
              <Button onPress={() => {addToCart({pId: product.p_id, quantity, userId, instructions})}} title="add to cart" />
            </View>
          )
        })}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom:80
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
  productInfoWrap : {
    padding: 15
  },
  productInfo : {
    display: 'flex',
    textAlign: 'left',
    padding: 10
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#000',
    width: '100%',
    padding: 10
  },
  textAreaInput :{
    borderWidth: 1,
    borderColor: '#000',
    minHeight: 100,
    width: '100%',
    padding: 10
  }
})