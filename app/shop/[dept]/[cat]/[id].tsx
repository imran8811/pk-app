import { apiAddToCart } from "@/apis";
import { addToCart } from "@/app/interfaces/add-to-cart.model";
import { apiBaseUrl, productImageUrl } from "@/Constants";
import axios from "axios";
import { usePathname, useSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import { Alert, Button, Image, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function Shop() {
  const [productDetails, setProductsDetails] = useState([]);
  const [addedToCart, setAddedToCart] = useState(false);
  const [isHungry, setIsHungry] = useState(true);
  const [instructions, setInstructions] = useState('');
  
  const params = useSearchParams();
  const getProductId = params.get('id');
  const pathName = usePathname();
  
  useEffect(() => {
    const apiUrl = `${apiBaseUrl}product/${getProductId}`;
    axios.get(apiUrl).then((res) => {
      setProductsDetails(res.data);
    });
  }, []);

  const addToCart = (apiData: addToCart) => {
    axios.post(apiAddToCart, apiData).then((res) => {
      if(res) {
        setAddedToCart(true);
        Alert.alert("", "Added Successfully", [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OK', 
            onPress: () => console.log('OK Pressed'),
            style: 'destructive'
          },
        ]);
      } else {
        setAddedToCart(false);
        Alert.alert("", "Server error, try again", [
          {
            text: 'OK', 
            onPress: () => console.log('OK Pressed'),
            style: 'destructive'
          },
        ]);
      }
    });
  }
  
  return (
    <ScrollView>
      <View style={styles.header}>
        <Image source={require('../../../../assets/images/logo.jpg')} />
      </View>
      <View style={styles.container}>
      {productDetails.length > 0 && productDetails.map((product:any, index) => {
        return <View style={{flex : 1}} key={index}>
          <View>
            <Image source={{uri: productImageUrl+product?.article_no+'/front.jpg'}} style={{width: '100%', height: 500}} />
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
              Quantity: <TextInput placeholder="number of sets" />
            </Text>
            <TextInput placeholder="Write instruction here" onChangeText={setInstructions} value={instructions} style={styles.textInput}></TextInput>
          </View>
          <Button onPress={() => {addToCart({pId: product.p_id, quantity: 1, userId: 2, instructions})}} title="add to cart" />
        </View> 
      })}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom:80,
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
    justifyContent: 'space-around',
    textAlign: 'left',
    padding: 10
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#000',
    minHeight: 100
  }
})