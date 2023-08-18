import React from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  StatusBar
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Spinner from 'react-native-loading-spinner-overlay';
import { Picker } from '@react-native-picker/picker';

const SignUpScreen = ({ navigation }) => {

  const [data, setData] = React.useState({
    username: '',
    password: '',
    phone: '',
    confirm_password: '',
    check_textInputChange: false,
    check_phoneInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
    activation: '',
    spinner: false
  });

  const textInputChange = (val) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (val.length !== 0) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true
      });
    }


    else if (reg.test(val) === false) {
      setData({
        ...data,
        username: val,
        check_textInputChange: false
      });
    }
    else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false
      });
    }
  }

  const phoneInputChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        phone: val,
        check_phoneInputChange: true
      });
    } else {
      setData({
        ...data,
        phone: val,
        check_phoneInputChange: false
      });
    }
  }

  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val
    });
  }

  const handleConfirmPasswordChange = (val) => {
    setData({
      ...data,
      confirm_password: val
    });
  }

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
    });
  }

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry
    });
  }

  const signupHandle = async (userName, password, pHone) => {

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (data.username.length == 0 || data.password.length == 0 || data.phone.length == 0) {
      Alert.alert('Error!', 'Fields cannot be empty.', [
        { text: 'Okay' }
      ]);
      return;
    }
    else if (data.password.length !== data.confirm_password.length) {
      Alert.alert('Password Mismatch!', 'Password and confirm password must match.', [
        { text: 'Okay' }
      ]);
      return;
    }

    else if (reg.test(data.username) === false) {

      Alert.alert('Email Incorrect!', 'Please type a valid email.', [
        { text: 'Okay' }
      ]);
      return;
    }

    else {


      setData({
        ...data,
        spinner: true,
      });

      fetch('https://expressalllogistics.com/logistics/androidappsignupagent.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eemail: userName,
          emobile: pHone,
          epassword: password

        })

      }).then((response) => response.json())
        .then((responseJson) => {


          setData({
            ...data,
            spinner: false,
          });

          var d = responseJson.Tripcodes;

          var r = responseJson.activation;

          if (d === 4) {
            alert("Mobile Already Exists, Kindly Sign in to Continue")
          }
          else if (d === 5) {
            alert("Email Already Exists, Kindly Sign in to Continue")
          }
          else if (d === 2) {
            setData({
              ...data,
              activation: r
            });

            this._activation()
            this._activationmobile()



            //if successful navigate user to OTP Screen
            navigation.navigate("OTP")



          }
          else {
            alert("A problem occured, Please try again....")
          }


        });



    }


  }

  _activation = async () => {
    try {
      await AsyncStorage.setItem(
        '@setActivation',
        data.activation
      );
    } catch (error) {
      // Error saving data
      console.log("Error saving activation data")
    }


  }

  //functions to store user details in async storage

  _activationmobile = async () => {

    console.log("Checking if signup mobile exists. " + data.phone)
    try {
      await AsyncStorage.setItem(
        '@setauthmobile',
        data.phone

      );
    } catch (error) {
      // Error saving data
      console.log("Error saving activation mobile data")
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='#009387' barStyle="light-content" />
      <Spinner
        visible={data.spinner}
        textContent={'Processing...'}
        overlayColor={'rgba(0, 0, 0, 0.8)'}
        textStyle={{ color: '#FFF' }}
        cancelable={false}

      />
      <View style={styles.header}>
        <Text style={styles.text_header}>Register Now!</Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        style={styles.footer}
      >
        <ScrollView>
          <Text style={styles.text_footer}>Email</Text>
          <View style={styles.action}>
            <FontAwesome
              name="envelope-open"
              color="#05375a"
              size={20}
            />
            <TextInput
              placeholder="Your Email"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => textInputChange(val)}
            />
            {data.check_textInputChange ?
              <Animatable.View
                animation="bounceIn"
              >
                <Feather
                  name="check-circle"
                  color="green"
                  size={20}
                />
              </Animatable.View>
              : null}
          </View>


          <Text style={[styles.text_footer, {
            marginTop: 35
          }]}>Phone No</Text>
          <View style={styles.action}>
            <FontAwesome
              name="phone"
              color="#05375a"
              size={20}
            />
            <TextInput
              placeholder="e.g 080xxxxxxxx"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => phoneInputChange(val)}
              keyboardType="phone-pad"
            />
            {data.check_textInputChange ?
              <Animatable.View
                animation="bounceIn"
              >
                <Feather
                  name="check-circle"
                  color="green"
                  size={20}
                />
              </Animatable.View>
              : null}
          </View>

          <Text style={[styles.text_footer, {
            marginTop: 35
          }]}>Password</Text>
          <View style={styles.action}>
            <Feather
              name="lock"
              color="#05375a"
              size={20}
            />
            <TextInput
              placeholder="Your Password"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handlePasswordChange(val)}
            />
            <TouchableOpacity
              onPress={updateSecureTextEntry}
            >
              {data.secureTextEntry ?
                <Feather
                  name="eye-off"
                  color="grey"
                  size={20}
                />
                :
                <Feather
                  name="eye"
                  color="grey"
                  size={20}
                />
              }
            </TouchableOpacity>
          </View>

          <Text style={[styles.text_footer, {
            marginTop: 35
          }]}>Confirm Password</Text>
          <View style={styles.action}>
            <Feather
              name="lock"
              color="#05375a"
              size={20}
            />
            <TextInput
              placeholder="Confirm Your Password"
              secureTextEntry={data.confirm_secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handleConfirmPasswordChange(val)}
            />
            <TouchableOpacity
              onPress={updateConfirmSecureTextEntry}
            >
              {data.secureTextEntry ?
                <Feather
                  name="eye-off"
                  color="grey"
                  size={20}
                />
                :
                <Feather
                  name="eye"
                  color="grey"
                  size={20}
                />
              }
            </TouchableOpacity>
          </View>
          <View style={styles.textPrivate}>
            <Text style={styles.color_textPrivate}>
              By signing up you agree to our
                </Text>
            <Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}>{" "}Terms of service</Text>
            <Text style={styles.color_textPrivate}>{" "}and</Text>
            <Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}>{" "}Privacy policy</Text>
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={() => { signupHandle(data.username, data.password, data.phone) }}
            >
              <LinearGradient
                colors={['#08d4c4', '#01ab9d']}
                style={styles.signIn}
              >
                <Text style={[styles.textSign, {
                  color: '#fff'
                }]}>Sign Up</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('SignIn')}
              style={[styles.signIn, {
                borderColor: '#009387',
                borderWidth: 1,
                marginTop: 15
              }]}
            >
              <Text style={[styles.textSign, {
                color: '#009387'
              }]}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387'
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50
  },
  footer: {
    flex: Platform.OS === 'ios' ? 3 : 5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  button: {
    alignItems: 'center',
    marginTop: 50
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20
  },
  color_textPrivate: {
    color: 'grey'
  }
});