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
  StyleSheet,
  processColor
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


var mobile = ""

export default class index extends Component {
  constructor(props) {
    super(props)

    var plats = ""
    var plongs = ""
    var dlats = ""
    var dlongs = ""
    var daddresss = ""
    var pstreets = ""

    this.state = {
      firstname: "",
      lastname: "",
      address: "",
      phone: "",
      sex: "",
      password: "",
      spinner: false,


    };
  }








  async componentDidMount() {


    mobile = await AsyncStorage.getItem('@setMobile')




    //console.log("hello")

    fetch('https://expressalllogistics.com/logistics/getInfos.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        mobile: mobile

      })

    }).then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          spinner: false
        }, () => {

          console.log("Results" + responseJson + mobile)
          this.setState({ firstname: responseJson.firstname, lastname: responseJson.lastname, sex: responseJson.sex, address: responseJson.address })

        })



      })





  }



  processColor = async () => {

    this.setState({
      spinners: true
    }, () => {
    })

    if (this.state.firstname === "") {
      alert("First Name cannot be empty")
    }
    else if (this.state.address === "") {
      alert("Address cannot be empty")
    }


    else if (isNaN(this.state.phone)) {
      // Its not a number
      alert("Phone Number must be numeric only")
    }
    else if (this.state.lastname === "") {
      alert("Last Name cannot be empty")
    }
    else {

      try {
        fetch('https://expressalllogistics.com/logistics/storeinfo.php', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({

            mobile: mobile,
            sex: this.state.sex,
            phone: this.state.phone,
            address: this.state.address,
            lastname: this.state.lastname,
            firstname: this.state.firstname,
            password: this.state.password

          })

        }).then((response) => response.json())
          .then((responseJson) => {

            this.setState({
              spinner: false
            }, async () => {

              try {




                if (responseJson.Tripcode === 1) {
                  alert("Information sucessfully updated")

                  this.props.navigation.navigate("Settings")
                }
                else {
                  alert("An Error Occured")
                }

              }
              catch (error) {
                // Error saving data
                console.log("Error saving Data")
              }


              console.log(responseJson)




            })



          })




      }
      catch (error) {
        console.log("Error saving data")
      }


    }
  }





  render() {


    return (
      <View style={[container.container]}>
        <StatusBar
          barStyle="light-content"
        />
        <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
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
                  Update Profile
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
            <Text style={styles.centralize}>Profile Details</Text></View>
          <View style={styles.regForm}>
            <Text></Text>

            <TextInput label="Enter Firstname" style={styles.textinput} value={this.state.firstname} placeholder="Enter Firstname" underlineColorAndroid={'transparent'} onChangeText={(val) => this.setState({ firstname: val })} />

            <TextInput label="Enter Lastname" style={styles.textinput} value={this.state.lastname} placeholder="Enter Lastname" underlineColorAndroid={'transparent'} onChangeText={(val) => this.setState({ lastname: val })} />

            <TextInput label="Enter Address" style={styles.textinput} value={this.state.address} placeholder="Enter Address" underlineColorAndroid={'transparent'} onChangeText={(val) => this.setState({ address: val })} />

            <TextInput keyboardType="numeric" label="Enter Phone No" editable={false} value={mobile} style={styles.textinput} placeholder="Enter Phone No" underlineColorAndroid={'transparent'} onChangeText={(val) => this.setState({ phone: val })} />
            <TextInput style={{ marginTop: 25 }} label="Enter Password" style={styles.textinput} placeholder="Password (Leave blank if unchanged)" underlineColorAndroid={'transparent'} secureTextEntry={true} autoCapitalize='none' onChangeText={(val) => this.setState({ password: val })} />

            <View style={{ borderWidth: 1, borderColor: 'black', borderRadius: 4 }}>
              <Picker selectedValue={this.state.selectedValue} onValueChange={(value) => this.setState({ selectedValue: value, sex: value })} itemStyle={{ backgroundColor: "grey", color: "black", fontFamily: "uber", fontSize: 17, marginVertical: 20 }}>
                <Picker.Item label={this.state.sex} value={this.state.sex} />
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
              </Picker>
            </View>



          </View>
        </ScrollView>
        <Button
          Text="Update"
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




