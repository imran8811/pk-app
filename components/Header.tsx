import { useRouter } from 'expo-router';
import { Image, Pressable, StyleSheet, View } from 'react-native';

type Props = {
  theme?: string
};

const router = useRouter();
const redirectToHome = () => {
  router.push('/')
}

export default function Header({theme }: Props) {
  return (
    <View style={styles.headerContainer}>
      <Pressable style={styles.headerLogo} onPress={() => redirectToHome()}>
        <Image source={require('../assets/images/logo.jpg')} style={styles.logoImage} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer : {
    flex: 1,
    paddingTop: 20,
    paddingBottom : 20,
    backgroundColor: '#fff',
    marginBottom: 20
  },
  headerLogo : {
    width: '60%',
    padding: 5
  },
  logoImage: {
    width: '100%',
    height: 40
  }
})