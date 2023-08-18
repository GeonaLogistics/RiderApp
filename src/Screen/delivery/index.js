import React, { Component } from "react";
import MapView from 'react-native-maps';
import styles from "./style";
import Color from "../../Config/Color";
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';


import {
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Platform,
  Alert
} from "react-native";
import { Drawer, Icon, Col } from "native-base";
import SideBar from "../../Screen/SideMenu/index";
import Container from "../../Styles/Container/style";
import IconText from "../../Component/Icon2Text/index";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from '@react-native-async-storage/async-storage'
import Spinner from 'react-native-loading-spinner-overlay';




export default class index extends Component {




  constructor(props) {
    super(props)


    this.state = {
      location: null,
      spinner: true,
      geocode: null,
      errorMessage: "",
      longitude: 0,
      latitude: 0,
      Address: null,
      CityName: null,
      pickupState: null,
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    }
  }

  async componentDidMount() {
    //this.getLocationAsync();
    this.getCurrentLocation();

  }




  async getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(parseFloat(position.coords.latitude))
        this.setState({ latitude: parseFloat(position.coords.latitude) })
        this.setState({ longitude: parseFloat(position.coords.longitude) })
        let region = {
          latitude: parseFloat(position.coords.latitude),
          longitude: parseFloat(position.coords.longitude),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        };


        this.setState({
          initialRegion: region,
          spinner: false
        });

        fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + this.state.latitude + ',' + this.state.longitude + '&key=AIzaSyDasqwd9pdZlf48NG9pdJGpVNRRjLeEK6o')
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({ Address: responseJson.results[0].formatted_address })

            //console.log(responseJson.results[0].address_components.filter(x => x.types.filter(t => t == 'administrative_area_level_2').length > 0)[0].long_name)
            this.setState({ pickupState: responseJson.results[0].address_components.filter(x => x.types.filter(t => t == 'administrative_area_level_1').length > 0)[0].long_name })
            this.setState({ CityName: responseJson.results[0].address_components[2].short_name })
            // console.log(responseJson.results[0].address_components[2].short_name)

            this._storeData()

          }).catch((error) => { // catch is called after then
            this.setState({ error: error.message })
          });
      },
      error => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      }
    );
  }



  _storeData = async () => {
    try {
      await AsyncStorage.setItem(
        '@CityName',
        this.state.CityName
      );
      console.log('Pickup City ' + this.state.cityName)
    } catch (error) {
      // Error saving data
      console.log("Error saving Data")
    }

    try {
      await AsyncStorage.setItem(
        '@PickUpState',
        this.state.pickupState
      );
      console.log('Pickup State' + this.state.pickupState)
    } catch (error) {
      // Error saving data
      console.log("Error saving Data")
    }



    try {
      await AsyncStorage.setItem(
        '@PickUpAddress',
        this.state.Address
      );
      console.log('Pickup Address' + this.state.Address)
    } catch (error) {
      // Error saving data
      console.log("Error saving Data")
    }
  };







  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.BestForNavigation });

    //const { latitude, longitude } = location.coords

    //this.getGeocodeAsync({ latitude, longitude })
    /*
        let vlatitude = location.coords.latitude
        let vlongitude = location.coords.longitude
    
        this.getGeocodeAsync({ vlatitude, vlongitude })
        this.setState({ location: { latitude, longitude } });
    
        this.setState({ latitude: vlatitude })
    
        this.setState({ longitude: vlongitude })
    
    */





  };





  getGeocodeAsync = async (location) => {
    let geocode = await Location.reverseGeocodeAsync(location)
    this.setState({ geocode })
  }

  render() {



    const { location, geocode, errorMessage } = this.state




    return (

      <Drawer
        ref={ref => {
          this.drawer = ref;
        }}
        content={<SideBar navigation={this.props.navigation} />}
        onClose={() => this.drawer._root.close()}
      >
        <View style={Container.container}>
          <StatusBar barStyle="dark-content" />
          <Spinner
            visible={this.state.spinner}
            textContent={'Getting your location... Please wait'}
            overlayColor={'rgba(0, 0, 0, 0.8)'}
            textStyle={{ color: '#FFF' }}
            cancelable={false}

          />
          <MapView
            provider={MapView.PROVIDER_GOOGLE}
            style={{ flex: 1 }}
            zoomEnabled={true}
            showsUserLocation={true}
            initialRegion={this.state.initialRegion}
          />
          <View
            style={{
              marginTop: 40,
              position: "absolute",
              flex: 1,
              marginLeft: 15,
              ...Platform.select({
                ios: {
                  zIndex: 9
                }
              })
            }}
          >
            <TouchableOpacity
              style={{
                position: "absolute",
              }}
              onPress={() => this.drawer._root.open()}
            >
              <Image
                source={require("../../Image/menu.png")}
                style={{
                  width: 55,
                  height: 55
                }}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.container}>
            <View style={styles.subContainerView}>
              <View style={{ margin: 30 }}>


                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('PickUp', { platitude: this.state.latitude, plongitude: this.state.longitude, pstreet: this.state.Address })}

                >
                  <IconText
                    Title="Pick-up"
                    Address={this.state.Address ? this.state.Address : "Searching..."}
                    source={require("../../Image/picupicon.png")}
                    viewText={{
                      borderBottom: Color.frost,
                      borderBottomWidth: 0.2
                    }}
                    addressText={{ marginBottom: 10 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('HomeLetsGo', { platitude: this.state.latitude, plongitude: this.state.longitude, pstreet: this.state.Address })}
                >


                  <IconText
                    Title="Drop-Off"
                    Address="Click to Choose"
                    source={require("../../Image/destination-icon.png")}
                  />
                </TouchableOpacity>

              </View>
            </View>
          </View>
        </View>
      </Drawer>
    );
  }
}
//Drawer.defaultProps.styles.mainOverlay.elevation = 0;
