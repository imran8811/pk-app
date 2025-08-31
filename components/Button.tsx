import { Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  label: string;
  color: string;
  bgColor: string;
  onPress: any;
};

export default function Button({onPress, label, color, bgColor }: Props) {
  return (
    <View style={styles.buttonContainer}>
      <Pressable style={{...styles.button, backgroundColor: bgColor}} onPress={onPress}>
        <Text style={{...styles.buttonLabel, color: color }}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#000'
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
  },
});
