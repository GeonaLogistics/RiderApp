import React, { Component } from "react";
import {
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Share,
  StyleSheet,
  StatusBar
} from "react-native";
import container from "../../Styles/Container/style";
import Header from "../../Component/Header/index";
import style from "./style";
import Button from "../../Component/Button/index";
import Color from "../../Config/Color";
import Icon from "react-native-vector-icons/Entypo";
import AsyncStorage from '@react-native-async-storage/async-storage'
import Spinner from 'react-native-loading-spinner-overlay';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class index extends Component {

  constructor(props) {
    super(props);
    this.state = {

      resetemail: "",
      activation: "",
      spinner: false

    };


  }

  async componentDidMount() {
    //get current location immediately the dom is loaded
    this.getLocationAsync();
    //clear all cache storage from async
    this.clearAsyncStorage();


  }

  _sendOTP = () => {

    if (this.state.resetemail === "") {
      alert("Please enter an email address")
    }
    else {

      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (reg.test(this.state.resetemail) === false) {
        console.log("Email is Not Correct");
        alert("Please enter a valid email")
      }
      else {

        this.setState({
          spinner: true
        }, () => {


          //Connect to API

          fetch('https://expressalllogistics.com/logistics/resetpass.php', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              eemail: this.state.resetemail,


            })

          }).then((response) => response.json())
            .then((responseJson) => {

              this.setState({
                spinner: false


              }, () => {


                var d = responseJson.Tripcodes;

                var r = responseJson.activation;

                if (d === 4) {
                  alert("Email doesn't exist")
                }
                else if (d === 1) {
                  this.setState({
                    activation: r


                  }, () => {

                    console.log(d)
                    this._activation()
                    //this._activationmobile()



                    //if successful navigate user to OTP Screen
                    this.props.navigation.navigate("AOTP")
                  });


                }
                else {
                  alert("A problem occured, Please try again....")
                }

              })
            })
        })

      }
    }
  }




  _activation = async () => {
    try {
      await AsyncStorage.setItem(
        '@setActivation',
        this.state.activation
      );
    } catch (error) {
      // Error saving data
      console.log("Error saving activation data")
    }

    try {
      await AsyncStorage.setItem(
        '@setuseremail',
        this.state.resetemail
      );
    } catch (error) {
      // Error saving data
      console.log("Error saving Data")
    }
  }

  render() {
    return (
      <View style={container.container}>

        <Spinner
          visible={this.state.spinner}
          textContent={'Loading'}
          overlayColor={'rgba(0, 0, 0, 0.8)'}
          textStyle={{ color: '#FFF' }}
          cancelable={false}

        />
        <ImageBackground
          source={require("../../Image/halfbg.png")}
          style={{ flex: 0.8 }}
        >
          <Header
            title="Reset Password"
            onPress={() => this.props.navigation.navigate("SignIn")}
          />
          <Image
            source={require("../../Image/padlock.png")}
            style={{ width: 100, height: 100, alignSelf: "center", margin: 10 }}
          />
          <Text style={[style.text, { marginTop: 30, fontSize: 18 }]}>Reset Password</Text>
          <Text style={[style.text, { fontSize: 18 }]}>

          </Text>
          <Text style={[style.text, { margin: 25, textAlign: "center", fontFamily: 'uber', fontSize: 14, color: Color.whiteSmoke }]}>
            An OTP Would be sent to your email for verification purposes.
          </Text>
        </ImageBackground>

        <View
          style={{
            justifyContent: "flex-end",
            flex: 0.4,
            marginHorizontal: 40
          }}
        >

          <Text
            style={[
              style.text,
              { color: Color.black, alignSelf: "flex-start" }
            ]}
          >
            Enter your registered email
          </Text>

          <View
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              borderBottomColor: "#C9C9C9",
              // marginVertical: 5,
              paddingVertical: 20
            }}
          >
            <View style={{ flex: 0.7, justifyContent: "center" }}>
              <TextInput
                style={{
                  borderColor: Color.steel,
                  borderWidth: 0.5,
                  borderRadius: 5,
                  fontSize: 18,
                  marginVertical: 10,
                  paddingHorizontal: 15,
                  paddingVertical: 7,
                  fontFamily: "uber-r"
                }}
                autoCapitalize='none'
                autoFocus={false}
                placeholderTextColor={Color.steel}
                placeholder="Email address"
                underlineColorAndroid={"transparent"}
                keyboardType="email-address"
                onChangeText={(val) => this.setState({ resetemail: val })}
              />


            </View>
            {/*
            <View style={{ flex: 0.3, justifyContent: "center" }}>
              <TouchableOpacity
                onPress={() =>
                  Share.share({
                    message: "au9wdb",
                    title: "Code"
                  })
                }
              >
                <Icon
                  name="share-alternative"
                  size={25}
                  style={{
                    alignSelf: "flex-end",
                    color: Color.purple
                  }}
                />
              </TouchableOpacity>
            </View>
                */}
          </View>

        </View>
        <Button
          Text="Send"
          viewStyle={{
            backgroundColor: Color.purple,
            marginHorizontal: 15,
            marginVertical: 25
          }}
          onPress={onPress = () => this._sendOTP()}
        />

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 0.8,
  },
})