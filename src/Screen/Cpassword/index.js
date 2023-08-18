import React, { Component } from "react";
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  StyleSheet
} from "react-native";
import container from "../../Styles/Container/style";
let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;
import Color from "../../Config/Color";
import Icon from "react-native-vector-icons/Ionicons";
import style from "./style";
import TextIcon from "../../Component/TextIcon";
import Button from "../../Component/Button/index";
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Picker } from '@react-native-picker/picker';
import Spinner from 'react-native-loading-spinner-overlay';



export default class index extends Component {
  constructor(props) {
    super(props)



    this.state = {
      password: "",
      email: "",
      cpassword: "",
      spinner: false




    }



  }


  async componentDidMount() {

    try {


      var emails = await AsyncStorage.getItem('@setuseremail')




      this.setState({ email: emails })


    }
    catch (error) {
      // Error saving data
      console.log("Error saving Data")
    }



  }


  processColor = async () => {

    if (this.state.password === "") {
      alert("Password cannot be empty")
    }
    else if (this.state.cpassword === "") {
      alert("Confirm Password cannot be empty")
    }


    else if (this.state.password === this.state.cpassword) {

      console.log(this.state.email + this.state.password + this.state.cpassword)

      this.setState({
        spinner: true
      }, () => {

        fetch('https://expressalllogistics.com/logistics/resetp.php', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({

            password: this.state.password,
            email: this.state.email

          })

        }).then((response) => response.json())
          .then((responseJson) => {

            this.setState({
              spinner: false


            }, () => {

              var user_id = responseJson.Tripcodes;

              //var success = responseJson.Success;
              console.log(user_id)



              // If server response message same as Data Matched
              if (user_id == 2) {



                //connection end

                // if successful show alert popup and navigate back to login screen
                alert("Password change confirmed.... Click on Sign in tab to Login")

                this.props.navigation.navigate("SignUp")

              }
              else {
                alert("Password change confirmed.... Click on Sign in tab to Login")
                this.props.navigation.navigate("SignUp")
              }


            })
          })



      })





    }

    else {
      alert("Passwords do not match")
    }
  }






  /*
    getData = async () => {
      try {
        const value = await AsyncStorage.getItem('@storage_Key')
        if (value !== null) {
          // value previously stored
          alert(value)
        }
      } catch (e) {
        // error reading value
        alert("Could not read value")
      }
    }
  
  */



  render() {







    return (
      <View style={[container.container]}>
        <StatusBar
          barStyle="light-content"
        />
        <Spinner
          visible={this.state.spinner}
          textContent={'Updating Password'}
          overlayColor={'rgba(0, 0, 0, 0.8)'}
          textStyle={{ color: '#FFF' }}
          cancelable={false}

        />
        <View style={{ width: width, backgroundColor: '#000' }}>
          <View
            style={{
              marginHorizontal: 15,
              marginTop: 40,
            }}
          >
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
            >
              <Icon
                name="ios-arrow-back"
                size={25}
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
            <View style={{ flexDirection: "row", }}>
              <View style={{ flex: 0.75, justifyContent: "center" }}>
                <Text
                  style={{
                    fontSize: 26,
                    fontFamily: "uber-b",
                    color: Color.white,
                    marginTop: 10,
                    marginBottom: 25
                  }}
                >
                  Reset Password
                  </Text>
              </View>
              {/* <View style={[style.imageProfileView, { flex: 0.25 }]}>
                  <Image
                    source={require("../../Image/Pic.png")}
                    style={style.imageProfile}
                  />
                </View> */}
            </View>
          </View>
        </View>
        <View />


        <ScrollView>
          <View style={styles.centralize}>
            <Text style={styles.centralize}>Reset your password</Text></View>
          <View style={styles.regForm}>

            <TextInput
              style={styles.textinput}
              autoCapitalize='none'
              placeholderTextColor={Color.steel}
              placeholder="Password"
              secureTextEntry
              underlineColorAndroid={"transparent"}
              onChangeText={(val) => this.setState({ password: val })}
            />


            <TextInput
              style={styles.textinput}
              autoCapitalize='none'
              placeholderTextColor={Color.steel}
              placeholder="Confirm Password"
              secureTextEntry
              underlineColorAndroid={"transparent"}
              onChangeText={(val) => this.setState({ cpassword: val })}
            />






          </View>
        </ScrollView>
        <Button
          Text="Reset Password"
          viewStyle={{
            backgroundColor: Color.black,
            color: '#ffffff',
            borderRadius: 0,
            borderColor: Color.white,
            marginTop: 10,
            marginBottom: 0,
            marginHorizontal: 0
          }}
          textStyle={{ color: Color.steel }}
          onPress={() => this.processColor()}

        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  regForm: {
    padding: 20
  },
  textinput: {


    marginBottom: 30,
    color: '#000000',
    borderColor: '#000000',
    borderWidth: 1,
    padding: 10,
    fontSize: 12
  },
  centralize: {
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    marginVertical: 10

  }
});




