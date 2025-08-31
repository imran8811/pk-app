import { StyleSheet, Text, View } from 'react-native';

type Props = {
  theme?: string
};

export default function Footer({theme }: Props) {
  return (
    <View style={styles.footerContainer}>
      <Text>PK Apparel, All Rights Reserved 2025</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer : {
    flex: 1,
    paddingTop: 20,
    paddingBottom : 20,
    backgroundColor: '#fff',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 25,
    lineHeight: 30
  }
})