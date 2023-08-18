import React, { Component, useState } from "react";
import MapView, { Marker } from 'react-native-maps';
import PolylineDirection from '@react-native-maps/polyline-direction';
import styles from "./style";
import Color from "../../Config/Color";
import {
  View,
  StatusBar,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  NetInfo
} from "react-native";
import container from "../../Styles/Container/style";
import Back from "../../Component/Back/index";
import RideType from "../../Component/RideType/index";
import AsyncStorage from '@react-native-async-storage/async-storage'
import Connection from "../Connection";
import Spinner from 'react-native-loading-spinner-overlay';





export default class index extends Component {
  constructor(props) {
    super(props);
    var plats = ""
    var plongs = ""
    var dlats = ""
    var dlongs = ""
    var daddresss = ""
    var pstreets = ""
    var prices = 0
    var pricess = 0


    //const [duration, setduratiom] = useState("");


    this.state = {
      data: [
        {
          Source: require("../../Image/bike.png"),
          RideType: "Bike",
          Price: "5000",
          Time: "2 mins"

        },
        {
          Source: require("../../Image/just_go.png"),
          RideType: "Car",
          Price: "",
          Time: "NAN",
        },
        {
          Source: require("../../Image/van.png"),
          RideType: "Van",
          Price: "",
          Time: "NAN",
        },
        {
          Source: require("../../Image/lorry.png"),
          RideType: "Truck",
          Price: "",
          Time: "NAN",
        },


      ],
      plat: "",
      plong: "",
      dlat: "",
      dlong: "",
      daddress: "",
      pstreet: "",
      duration: "",
      spinner: true,
      price: ""


    };

  }




  async componentDidMount() {


    this.getData()
    this._storePrice()
  }



  getData = async () => {
    try {
      const durationa = await AsyncStorage.getItem('@duration')

      var distance = await AsyncStorage.getItem('@distance')

      const citydestination = await AsyncStorage.getItem('@CityNameDestination')

      var real = parseInt(distance);

      prices = 100 + (real * 25)


      pricess = 100 + (real * 50)





      if (durationa !== null) {
        // value previously stored


        //this.setState({ data: [...data3.map(item => item.RideType === "Bike" ? { ...item, Time: durationa } : item)] })

        const elementsIndex = this.state.data.findIndex(element => element.RideType == "Bike")
        const elementsIndext = this.state.data.findIndex(element => element.RideType == "Car")
        let newArray = [...this.state.data]
        newArray[elementsIndex] = { ...newArray[elementsIndex], Time: durationa, Price: 'NGN' + prices }
        newArray[elementsIndext] = { ...newArray[elementsIndext], Time: durationa, Price: 'NGN' + pricess }


        this.setState({
          data: newArray,
          spinner: false,
          price: prices
        }, () => {



        })



        console.log("meeeee: " + durationa)
        console.log("City Name" + citydestination)
        console.log("Distance" + distance)
        console.log("Price" + this.state.price)
      }
    } catch (e) {
      // error reading value
      console.log("Error reading value")
    }
  }




  _storePrice = async () => {
    try {

      await AsyncStorage.setItem(
        '@price',
        this.state.price

      );
      console.log("successful")

    }
    catch (error) {
      // Error saving data
      console.log("price is null")
    }
  };



  _keyExtractor = (item, index) => item.RideType;

  _renderItem = ({ item }) => (



    <RideType

      onPress={() => this.props.navigation.navigate("Orders", { platitude: plats, plongitude: plongs, dlatitude: dlats, dlongitude: dlongs, deaddress: daddresss, pestreet: pstreets, Ride: item.RideType, imagesource: item.Source, Prices: item.price })}
      Source={item.Source}
      RideType={item.RideType}
      Price={item.Price}
      Time={item.Time}
    />

  );


  render() {
    plats = this.props.navigation.state.params.platitude
    plongs = this.props.navigation.state.params.plongitude
    dlats = this.props.navigation.state.params.dlatitude
    dlongs = this.props.navigation.state.params.dlongitude
    daddresss = this.props.navigation.state.params.deaddress
    pstreets = this.props.navigation.state.params.pestreet

    const origin = { latitude: plats, longitude: plongs };
    const destination = { latitude: dlats, longitude: dlongs };


    return (
      // Main View
      <View style={container.container}>
        <StatusBar barStyle="dark-content" />
        <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          overlayColor={'rgba(0, 0, 0, 0.8)'}
          textStyle={{ color: '#FFF' }}
          cancelable={false}

        />
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
            origin={origin}
            destination={destination}
            apiKey="AIzaSyDLPAO7vS1AUtpwNwi1wQjXgTWmYUVsxP4"
            strokeWidth={4}
            strokeColor="#12bc00"
          />

        </MapView>

        <Back onPress={() => this.props.navigation.goBack()} />
        {/* sub view */}
        <View style={styles.container}>
          <View style={styles.subContainerView}>
            <View style={{ margin: 15 }}>
              <TouchableOpacity>
                <Image
                  source={require("../../Image/up.png")}
                  style={styles.image}
                />
              </TouchableOpacity>

              <FlatList
                data={this.state.data}
                horizontal={false}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}
