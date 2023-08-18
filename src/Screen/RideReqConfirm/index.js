import React, { Component } from "react";
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import PolylineDirection from '@react-native-maps/polyline-direction';
import styles from "./style";
import Color from "../../Config/Color";
import { View, StatusBar, Image, Text, TouchableOpacity, Linking } from "react-native";
import container from "../../Styles/Container/style";
import Back from "../../Component/Back/index";
import Button from "../../Component/Button/index";
import IconText from "../../Component/IconText/index";
import Modal from "react-native-modal";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { computeDestinationPoint } from "geolib";
import axios from 'axios';
import Constants from 'expo-constants';

//declare variables

//this page is majorly for confirming/accepting ride request sent by customers

var means = ""
var trans = ""
var user_id = ""



export default class index extends Component {


  constructor(props) {



    super(props)


    //declare state variables

    this.state = {
      isModalVisible: false,
      mobileNo: "",
      name: "",
      paddress: null,
      long: "",
      lat: "",
      ddlong: "",
      ddlat: "",
      price: 0,
      addressone: "",
      addresstwo: "",
      distance: "",
      duration: "",
      trackcode: "",
      means: "",
      transport: "",
      status: ""


    }
  };


  async componentDidMount() {

    // this._retrieveInfo()

    //retrieve rider fone number
    user_id = (await AsyncStorage.getItem("@setMobile")) || "none";


    //get rider details from api
    this.getData()

  }


  //function that gets rider details from api
  getData = async () => {

    //trackcodes = this.props.navigation.state.params.tracks

    //api call via url
    fetch('https://expressalllogistics.com/logistics/driverlocate.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        //mobile no sent via api call
        mobile: user_id

      })


    }).then((response) => response.json())
      .then((responseJson) => {

        console.log(responseJson)


        //var userId = responseJson.Tripcode;

        //response gotten from api call, containing information of the rider 

        var addresses = responseJson.pickup_address;
        var receivers_address = responseJson.receiver_address
        plats = responseJson.plat
        plongs = responseJson.plong
        dlats = responseJson.dlat
        dlongs = responseJson.dlong
        var usermobiles = responseJson.usermobile
        var trackcodes = responseJson.trackcode
        var distances = responseJson.distance
        var durations = responseJson.duration
        var prices = responseJson.price
        var meanst = responseJson.means
        var transport = responseJson.transport
        var status = responseJson.status

        //storing the variables gotten 

        this.setState({ status: status, transport: transport, lat: plats, means: meanst, long: plongs, ddlat: dlats, ddlong: dlongs, addressone: addresses, addresstwo: receivers_address, mobileNo: usermobiles, distance: distances, duration: durations, trackcode: trackcodes, price: prices })


      }).catch((error) => {
        console.error(error);
      });





  }



  _toggleModal = () => {

    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  _toggleModal2 = () => {
    this.props.navigation.navigate("Home", this._toggleModal);
  }

  //check and process ongoing trips

  _processtripsuccess = () => {


    //api call to get trips if any

    fetch('https://expressalllogistics.com/logistics/alltrips.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        //parameters sent via api call
        mobile: user_id,
        means: this.state.means,
        type: 1,
        trackcode: this.state.trackcode

      })


    }).then((response) => response.json())
      .then((responseJson) => {

        console.log(responseJson)

        //if ride is confirmed then move to booking page 
        this.props.navigation.navigate("BookingReq", { trackcode: this.state.trackcode, means: this.state.means })


      }).catch((error) => {
        console.error(error);
      });



  }
  /*
  
    _retrieveInfo = async () => {
  
      tracking = this.props.navigation.state.params.tracks
  
      console.log("tracking")
  
      axios.post('https://expressalllogistics.com/logistics/customerlocate.php', JSON.stringify({
        track: tracking,
        mobile: user_id
      }), {
        headers: {
          "Content-Type": "application/json",
        }
      }).then(response => {
  
        userId = response.Tripcode
        pickup = response.pickupcity
        addresses = response.pickup_address
        namepickups = response.pickup_name
        pickup_nos = response.pickup_no
        receiver_nos = response.receiver_no
        usermobiles = response.usermobile
        trackcodes = response.trackcode
        plats = response.plat
        plongs = response.plong
        dlats = response.dlat
        dlongs = response.dlong
        statuses = response.status
        receivers_name = response.receiver_name
        receivers_address = response.receiver_address
        durations = response.duration
        distances = response.distance
        prices = response.price
  
  
  
        console.log(plats)
        console.log("--------------")
        console.log(plongs)
        console.log("--------------")
        console.log(dlongs)
        console.log("--------------")
        console.log(dlats)
  
        let region = {
          latitude: parseFloat(plats),
          longitude: parseFloat(plongs),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        };
  
  
  
        if (status == 1) {
          mainstatus = 'Pending'
        }
        else if (status == 2) {
  
          mainstatus = "Pickup Ongoing"
  
          this.setState({
            mobileNo: pickup_no,
            name: namepickup,
            paddress: address
          });
  
        }
  
        else if (status == 3) {
          mainstatus = "Destination Ongoing"
  
          this.setState({
            mobileNo: pickup_no,
            name: receiver_name,
            paddress: receiver_address
  
          });
  
        }
  
        else if (status == 4) {
          mainstatus = "Suspended"
        }
  
        else if (status == 6) {
          mainstatus = "Cancelled"
        }
  
  
      });
  
    }
  
  */


  //user no call 

  call = () => {
    console.log("+++++++++callNumber ", this.state.mobileNo);
    let phoneNumber = this.state.mobileNo;
    if (Platform.OS !== "android") {
      phoneNumber = `telprompt:${this.state.mobileNo}`;
    } else {
      phoneNumber = `tel:${this.state.mobileNo}`;
    }
    Linking.canOpenURL(phoneNumber)
      .then(supported => {
        if (!supported) {
          Alert.alert("Number is not available");
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch(err => console.log(err));
  };



  render() {


    var plats = parseFloat(this.props.navigation.state.params.plat)
    var plongs = parseFloat(this.props.navigation.state.params.plong)
    var dlats = parseFloat(this.props.navigation.state.params.dlat)
    var dlongs = parseFloat(this.props.navigation.state.params.dlong)

    console.log(plats + plongs + dlats + dlongs)


    const origin = { latitude: plats, longitude: plongs };
    const destination = { latitude: dlats, longitude: dlongs };

    if (this.state.transport === 'Bike') {
      trans = require("../../Image/bike.png")
    }
    else {
      trans = require("../../Image/sedan-car-model.png")
    }

    return (
      // Main View
      <View style={container.container}>
        <StatusBar barStyle="dark-content" />
        <MapView
          provider={MapView.PROVIDER_GOOGLE}
          style={{ flex: 1 }}
          initialRegion={{
            latitude: plats,
            longitude: plongs,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}>

          <Marker
            coordinate={{
              latitude: plats,
              longitude: plongs
            }}
            title="Pick up"
          >
            <Text style={{ backgroundColor: '#fff', fontWeight: 'bold', padding: 7 }}>Pick up</Text>
            <Image
              source={require("../../Image/pin2.png")}
              style={{
                width: 50,
                height: 50,
                alignSelf: "center",
                resizeMode: "contain"
              }}
            />
          </Marker>
          <Marker
            coordinate={{
              latitude: dlats,
              longitude: dlongs
            }}
            title="Drop Off"
          >
            <Text style={{ backgroundColor: '#fff', fontWeight: 'bold', padding: 7 }}>Drop Off</Text>
            <Image
              source={require("../../Image/pin.png")}
              style={{
                width: 50,
                height: 50,
                alignSelf: "center",
                resizeMode: "contain"
              }}
            />
          </Marker>




          <PolylineDirection
            lineDashPattern={[0]}
            origin={origin}
            destination={destination}
            apiKey="AIzaSyCw54WeLp5ojmGmBNZVvk0IixkPNCOCCjE"
            strokeWidth={4}
            strokeColor="#12bc00"
          />

        </MapView>
        <Back onPress={() => this.props.navigation.navigate("Home")} />
        {/* sub view */}
        <View style={styles.container}>
          <View style={styles.subContainerView}>
            <View style={{ margin: 15 }}>
              {/* first row */}
              <View style={{ flexDirection: "row" }}>
                {/* profile pic */}

                <View style={{ flex: 0.2, alignItems: "center" }}>
                  <View style={styles.imageProfileView}>
                    {/*
                    <Image
                      source={require("../../Image/Pic.png")}
                      style={styles.imageProfile}
                    />
                    */}
                  </View>
                </View>

                {/* profile name */}
                <View style={styles.textProfileView}>
                  <Text style={styles.textProfile}>{this.state.mobileNo}</Text>
                  <View style={{ flexDirection: "row", marginLeft: 10, flex: 1 }}>
                    <TouchableOpacity
                      onPress={() => this.props.navigation.navigate("Rating")}
                    >
                      {/* <View style={{backgroundColor:'red' }}> */}
                      <View style={{ color: 'black' }}><Text style={{ color: 'black' }}> {this.state.trackcode} ({this.state.means} trip)</Text></View>
                      {/* </View> */}
                    </TouchableOpacity>
                    {/*
                    <Text style={[styles.titleText, { marginHorizontal: 5, fontSize: 14 }]}>
                      4.2
                    </Text>
                    */}
                  </View>
                </View>
                {/* msg,call */}
                <View style={{ flex: 0.25, marginVertical: 10 }}>
                  <View
                    style={{
                      alignSelf: "flex-end",
                      flexDirection: "row",
                      marginHorizontal: 2
                    }}
                  >
                    <TouchableOpacity
                      style={{ marginRight: 20 }}
                      onPress={() => this.props.navigation.navigate("Chat")}
                    >
                      <View
                        style={{
                          height: 18,
                          width: 18,
                          justifyContent: "center"
                        }}
                      >
                        <Image
                          source={require("../../Image/msg.png")}
                          style={styles.imageProfile}
                        />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginRight: 10 }} onPress={() => this.call()}>
                      <View
                        style={{
                          height: 20,
                          width: 20,
                          justifyContent: "center"
                        }}
                      >
                        <Image
                          source={require("../../Image/phone.png")}
                          style={styles.imageProfile}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              {/* 2nd row */}
              <View style={{ marginVertical: 20 }}>
                <IconText
                  source={require("../../Image/picupicon.png")}
                  Address={this.state.addressone}
                />
                <IconText
                  source={require("../../Image/destination-icon.png")}
                  Address={this.state.addresstwo}

                />
              </View>
              {/* 3rd row */}
              <View style={styles.view}>
                <View style={styles.optionView}>
                  <Image
                    source={trans}
                    style={styles.image}
                  />
                </View>
                <View style={styles.optionView}>
                  <Text style={styles.titleText}>DISTANCE</Text>
                  <Text style={styles.text}> {this.state.distance} </Text>
                </View>
                <View style={styles.optionView}>
                  <Text style={styles.titleText}>TIME</Text>
                  <Text style={styles.text}>{this.state.duration}</Text>
                </View>
                <View style={styles.optionView}>
                  <Text style={styles.titleText}>PRICE</Text>
                  <Text style={styles.text}> NGN{this.state.price} </Text>
                </View>
              </View>
            </View>
            <Button
              Text="Accept"
              onPress={this._processtripsuccess}
              textStyle={{ fontFamily: "uber", fontSize: 16 }}
              viewStyle={{ marginBottom: 20 }}
            />
            {/* Alert Dialog */}
            <Modal isVisible={this.state.isModalVisible}>
              <View
                style={[
                  styles.subContainerView,
                  { alignSelf: "center", shadowOpacity: 0 }
                ]}
              >
                <Image
                  source={require("../../Image/checked.png")}
                  style={[
                    styles.image,
                    { width: 90, height: 90, borderRadius: 0, marginTop: 30 }
                  ]}
                />
                <Text
                  style={[
                    styles.textProfile,
                    {
                      alignSelf: "center",
                      fontFamily: "uber",
                      fontSize: 16,
                      margin: 10
                    }
                  ]}
                >
                  Booking Successful
                </Text>
                <View style={{ marginVertical: 20 }}>
                  <Text
                    style={[
                      styles.titleText,
                      { marginHorizontal: 2, fontSize: 14 }
                    ]}
                  >
                    Your booking has been confirmed.
                  </Text>
                  <Text
                    style={[
                      styles.titleText,
                      { marginHorizontal: 2, fontSize: 14 }
                    ]}
                  >
                    Driver will pickup you in 2 minutes.
                  </Text>
                </View>
                <View
                  style={{
                    borderTopWidth: 0.3,
                    flexDirection: "row",
                    borderTopColor: Color.steel,
                    marginTop: 20
                  }}
                >
                  <View
                    style={{
                      flex: 0.5,
                      borderRightWidth: 0.3,
                      borderRightColor: Color.steel
                    }}
                  >
                    <TouchableOpacity
                      onPress={this._toggleModal}
                      style={{ margin: 10 }}
                    >
                      <Text style={[styles.titleText, { margin: 20 }]}>
                        Cancel
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View style={{ flex: 0.5 }}>
                    <TouchableOpacity
                      onPress={() => {
                        this._toggleModal(), this._toggleModal2();
                      }}
                      style={{ margin: 10 }}
                    >
                      <Text
                        style={[
                          styles.titleText,
                          { color: Color.black, margin: 20 }
                        ]}
                      >
                        Done
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </View>
    );
  }
}
