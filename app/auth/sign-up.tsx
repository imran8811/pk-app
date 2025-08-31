import { styles } from '@/styles';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Text, TextInput, View } from 'react-native';
import apis from '../../apis';
import Button from '../../components/Button';
import { useSession } from '../../ctx';

export default function SignIn() {
  let [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [emailRequired, setEmailRequired] = useState(false);
  const [passwordRequired, setPasswordRequired] = useState(false);
  const [invalidCreds, setInvalidCreds] = useState(false);

  const { signIn } = useSession();
  const router = useRouter();

  // const validateForm = () => {
  //   if(userEmail){
  //     userEmail = userEmail.toLowerCase();
  //     const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  //     emailRegex.test(userEmail)? setEmailValid(true) : setEmailValid(false);
  //     return;
  //   }
  //   return false;
  // }
  const data = {
    user_email : userEmail,
    user_password : userPassword
  }
  const userLogin = () => {
    !userEmail? setEmailRequired(true) : setEmailRequired(false);
    !userPassword? setPasswordRequired(true) : setPasswordRequired(false);  
    if(userEmail && userPassword){
      axios.post(apis.userLogin, data).then((res) => {
        if(res.data.type === 'success'){
          router.push('/');
        }
      }).catch((err) => {
        if(err.response.data.msg === 'Invalid Credentials'){
          setInvalidCreds(true);
        } else {
          Alert.alert('Server Error', err.code);
        }
      })
    }
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={styles.pageHeading}>User Login</Text>
      {invalidCreds && 
        <Text style={{...styles.errorMsg, textAlign: 'center'}}>Invalid Email/Password</Text>
      }
      <View>
        <KeyboardAvoidingView>
          <Text style={styles.textInputWrap}>
            <TextInput placeholder='Email' onChangeText={setUserEmail} value={userEmail} style={styles.textInput} />
            {emailRequired &&
              <Text style={styles.errorMsgSmall}>Required</Text>
            }
          </Text>
          <Text style={styles.textInputWrap}>
            <TextInput secureTextEntry onChangeText={setUserPassword} value={userPassword}  style={styles.textInput} placeholder='Password' />
            {passwordRequired &&
              <Text style={styles.errorMsgSmall}>Required</Text>
            }
          </Text>
          <Button label="Login" color='#fff' bgColor='#000' onPress={userLogin} />
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}
