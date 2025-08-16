import { Link } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView>
      <View style={styles.header}>
        <Image source={require('../assets/images/logo.jpg')} />
      </View>
      <Text style={styles.mainHeading}>Men</Text>
      <View style={styles.categoryBox}>
        <Link href={{pathname: '/shop/[dept]/[cat]', params: {dept: 'men', cat : 'jeans-pants'}}} style={styles.categoryLink}>Jeans Pants</Link>
      </View>
      <View style={styles.categoryBox}>
        <Link href={{pathname: '/shop/[dept]/[cat]', params: {dept: 'men', cat : 'chino-pants'}}} style={styles.categoryLink}>Chino Pants</Link>
      </View>
      <Text style={styles.mainHeading}>Boys</Text>
      <View style={styles.categoryBox}>
        <Link href={{pathname: '/shop/[dept]/[cat]', params: {dept: 'boys', cat : 'jeans-pants'}}} style={styles.categoryLink}>Jeans Pants</Link>
      </View>
      <View style={styles.categoryBox}>
        <Link href={{pathname: '/shop/[dept]/[cat]', params: {dept: 'boys', cat : 'chino-pants'}}} style={styles.categoryLink}>Chino Pants</Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainHeading: {
    fontSize: 30,
    lineHeight: 36,
    textAlign: 'center',
    marginBottom: 30
  },
  header : {
    padding : 20,
  },
  categoryLink: {
    flex: 1,
    padding: 20,
    textAlign: 'center',
    fontSize: 25,
    lineHeight: 30,
    borderStyle: 'solid',
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 2
  },
  categoryBox: {
    marginBottom: 20
  },
  pageHeading : {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    lineHeight: 26,
    marginBottom: 25
  }
})