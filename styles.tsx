import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
  },
  container: {
    flex: 1,
    paddingBottom:80
  },
  productInfoWrap : {
    padding: 15
  },
  productInfo : {
    display: 'flex',
    textAlign: 'left',
    padding: 10
  },
  textInputWrap : {
    marginBottom: 20
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
    padding: 10,
    borderRadius: 5
  },
  textAreaInput :{
    borderWidth: 1,
    borderColor: '#ccc',
    minHeight: 100,
    width: '100%',
    padding: 10,
    borderRadius: 5
  },
  errorMsgSmall : {
    fontSize: 12,
    lineHeight: 16,
    color: 'red'
  },
  errorMsg : {
    fontSize: 12,
    lineHeight: 16,
    color: 'red'
  }
})