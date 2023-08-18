import React, { Component } from "react";
import {
  Text,
  View,
  ImageBackground,
  Image,
  TextInput,
  Dimensions,
  TouchableOpacity
} from "react-native";
import container from "../../Styles/Container/style";
import CodeInput from "react-native-confirmation-code-input";
let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;
import Color from "../../Config/Color";
import Icon from "react-native-vector-icons/Ionicons";
import Button from "../../Component/Button/index";
import AsyncStorage from '@react-native-async-storage/async-storage'
import Spinner from 'react-native-loading-spinner-overlay';

export default class index extends Component {

  constructor(props) {
    super(props);

    //define the different states 

    this.state = {
      auth: "",
      authCode: "",
      email: "",
      spinner: false

    }
  }

  async componentDidMount() {
    //function that get the otp code
    this._getCode();
  }


  //function that is called once button is clicked which validates and checks if otp code entered is correct
  _onFulfill() {

    //check if user has entered any code at allz
    if (this.state.auth === "") {
      alert("Kindly enter an authorization code")
    }

    //otherwise validate the code entered
    else if (this.state.auth === this.state.authCode) {


      this.props.navigation.navigate("Cpassword")

    }
    //if unsuccessful throw invalid code authorization
    else {
      alert("Invalid Authorization Code")
    }


  }

  //function that stores the otp code and phone number
  _getCode = async () => {

    try {

      var authCodes = await AsyncStorage.getItem('@setActivation')
      var emails = await AsyncStorage.getItem('@setuseremail')




      this.setState({ authCode: authCodes, email: emails })

      console.log(this.state.authCode, this.state.email)
    }
    catch (error) {
      // Error saving data
      console.log("Error saving Data")
    }
  }


  render() {
    return (

      <View style={[container.container]}>
        <Spinner
          visible={this.state.spinner}
          textContent={'Verifying OTP'}
          overlayColor={'rgba(0, 0, 0, 0.8)'}
          textStyle={{ color: '#FFF' }}
          cancelable={false}

        />
        <View style={{ flex: 1 }}>
          <View
            style={{
              width: width,
              height: height / 3.5,
              backgroundColor: Color.black
            }}
          >
            <ImageBackground
              source={require("../../Image/city-building.png")}
              style={{ flex: 1 }}
            >
              <View
                style={{
                  marginHorizontal: 15,
                  marginTop: 40,
                  marginBottom: 20
                }}
              >
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("SignIn")}
                >
                  <Icon
                    name="ios-arrow-back"
                    size={30}
                    style={[
                      {
                        alignSelf: "flex-start",
                        color: "#fff"
                        //marginTop:40
                      },
                      this.props.iconStyle
                    ]}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 28,
                    fontFamily: "uber-b",
                    color: Color.white,
                    marginVertical: 10
                  }}
                >
                  Mobile Verification
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: "uber-l",
                    color: Color.whiteSmoke,
                    marginVertical: 10
                  }}
                >
                  Enter your OTP code
                </Text>
              </View>
            </ImageBackground>
          </View>
          <View
            style={{
              marginHorizontal: 20,
              //flex: 1,
              //justifyContent: "flex-end",
              //alignItems: "center",
              //marginVertical: 50
            }}
          >
            <View
              style={{
                alignItems: "center",
                marginVertical: 50,
                justifyContent: "center",
                //  flex: 0.5
              }}
            >
              <CodeInput
                ref="codeInputRef1"
                className={"border-b"}
                keyboardType="number-pad"
                space={20}
                size={50}
                cellBorderWidth={5}
                codeLength={4}
                codeInputStyle={{
                  fontFamily: "uber-b",
                  fontSize: 28
                }}
                inputPosition="left"
                activeColor="black"
                inactiveColor="#A0A0A0"
                onFulfill={(val) => this.setState({ auth: val })}
              />
            </View>
            <View style={{ marginHorizontal: 38, marginVertical: 75 }}>
              <Button
                onPress={() => this._onFulfill()}
                Text="Verify"
                viewStyle={{ backgroundColor: Color.black, }}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}
