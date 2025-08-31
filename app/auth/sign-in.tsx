import Header from '@/components/Header';
import { styles } from '@/styles';
import axios from 'axios';
import { Link, useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Text, TextInput, View } from 'react-native';
import apis from '../../apis';
import Button from '../../components/Button';

export default function SignIn() {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [emailRequired, setEmailRequired] = useState(false);
  const [passwordRequired, setPasswordRequired] = useState(false);
  const [invalidCreds, setInvalidCreds] = useState(false);

  const router = useRouter();

  const data = {
    user_email : userEmail,
    user_password : userPassword
  }
  
  const userLogin = () => {
    setInvalidCreds(false);
    !userEmail? setEmailRequired(true) : setEmailRequired(false);
    !userPassword? setPasswordRequired(true) : setPasswordRequired(false);  
    if(userEmail && userPassword){
      axios.post(apis.userLogin, data).then(async(res) => {
        if(res.data.type === 'success'){
          await SecureStore.setItemAsync('sessionToken', res?.data?.token);
          await SecureStore.setItemAsync('userId', res?.data?.data?.userId);
          router.push('/');
        }
      }).catch((err) => {
        if(err.response?.data?.msg === 'Invalid Credentials'){
          setInvalidCreds(true);
        } else {
          Alert.alert('Server Error', err.code);
        }
      })
    }
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Header />
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
      <View style={{flex: 1/2, alignItems: 'center', alignContent: 'space-between', marginTop: 20, marginBottom: 20}}>
        <Link href={'/auth/sign-up'}>Sign up</Link>
        <Link href={'/auth/forgot-password'}>Forgot Password</Link>
        <Link href={'/auth/forgot-password'}>Shop</Link>
      </View>
    </View>
  );
}
