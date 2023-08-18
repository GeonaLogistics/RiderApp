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
      fullname: "",
      address: "",
      phone: "",
      city: "",
      spinner: true,

      orders: []

    };
  }








  async componentDidMount() {





    this.processAddress()

    //console.log("hello")

    fetch('https://expressalllogistics.com/logistics/states.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        mobile: this.state.tmobile,
        password: this.state.tpassword

      })

    }).then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          spinner: false
        }, () => {

          console.log(responseJson)
          this.setState({ orders: responseJson })

        })



      })





  }



  processColor = async () => {

    if (this.state.fullname === "") {
      alert("Full Name cannot be empty")
    }
    else if (this.state.address === "") {
      alert("Address cannot be empty")
    }
    else if (this.state.phone === "") {
      alert("Phone Cannot be empty")
    }

    else if (isNaN(this.state.phone)) {
      // Its not a number
      alert("Phone Number must be numeric only")
    }
    else if (this.state.city === "") {
      alert("City cannot be empty")
    }
    else {

      try {
        await AsyncStorage.setItem('@storage_Fullname', this.state.fullname)
        await AsyncStorage.setItem('@storage_Address', this.state.address)
        await AsyncStorage.setItem('@storage_Phone', this.state.phone)
        await AsyncStorage.setItem('@storage_City', this.state.city)

        this.props.navigation.navigate("Recipient", { platitude: plats, plongitude: plongs, dlatitude: dlats, dlongitude: dlongs, deaddress: daddresss, pestreet: pstreets, Ride: ride })

      }
      catch (error) {
        console.log("Error saving data")
      }


    }
  }


  processAddress = async () => {

    pstreets = await AsyncStorage.getItem('@PickUpAddress')


    this.setState({ address: pstreets })

    console.log('Went well' + this.state.address)

  }




  render() {

    let myUsers = this.state.orders.map((myValue, myIndex) => {
      return (
        <Picker.Item label={myValue.delivery} value={myValue.delivery} key={myIndex} />

      )
    });

    plats = this.props.navigation.state.params.platitude
    plongs = this.props.navigation.state.params.plongitude
    dlats = this.props.navigation.state.params.dlatitude
    dlongs = this.props.navigation.state.params.dlongitude
    daddresss = this.props.navigation.state.params.deaddress
    //pstreets = this.props.navigation.state.params.pestreet
    ride = this.props.navigation.state.params.Ride






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
                  Create Shipment (1/3)
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
            <Text style={styles.centralize}>Pick up Details</Text></View>
          <View style={styles.regForm}>
            <Text>{this.state.fullname}</Text>

            <TextInput label="Enter Full Name" style={styles.textinput} placeholder="Enter Full Name" underlineColorAndroid={'transparent'} onChangeText={(val) => this.setState({ fullname: val })} />

            <TextInput label="Enter Pickup Address" style={styles.textinput} value={this.state.address} placeholder="Enter Pickup Address" underlineColorAndroid={'transparent'} onChangeText={(val) => this.setState({ address: val })} />

            <TextInput keyboardType="numeric" label="Enter Phone No" style={styles.textinput} placeholder="Enter Phone No" underlineColorAndroid={'transparent'} onChangeText={(val) => this.setState({ phone: val })} />

            <View style={{ borderWidth: 1, borderColor: 'black', borderRadius: 4 }}>
              <Picker selectedValue={this.state.selectedValue} onValueChange={(value) => this.setState({ selectedValue: value, city: value })} itemStyle={{ backgroundColor: "grey", color: "black", fontFamily: "uber", fontSize: 17 }}>
                <Picker.Item label="Select Pickup City" value="" />
                {myUsers}
              </Picker>
            </View>


          </View>
        </ScrollView>
        <Button
          Text="Next"
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




