import React, { Component } from "react";
import MapView from 'react-native-maps';
import styles from "./style";
import Color from "../../Config/Color";
import axios from 'axios';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import RideType from "../../Component/RideType/index";
import Button from "../../Component/Button/index";



import {
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Platform,
  Alert,
  Vibration
} from "react-native";
import { Drawer, Icon, Col } from "native-base";
import SideBar from "../../Screen/SideMenu/index";
import Container from "../../Styles/Container/style";
import IconText from "../../Component/Icon2Text/index";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import AsyncStorage from '@react-native-async-storage/async-storage'
import Spinner from 'react-native-loading-spinner-overlay';
import * as TaskManager from 'expo-task-manager';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

const LOCATION_TASK_NAME = "background-location-task";

//dis page displays the ongoing rides 

//declare variables 


var userId = ""

var storeaddress = ""


var names = ""

var number = ""

var phones = ""
var trackcode = ""
var means = ""

//set notifications

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});



export default class index extends Component {




  constructor(props) {
    super(props)

    //declare state variables

    this.notificationListener = React.createRef();
    this.responseListener = React.createRef();

    this.state = {
      status: "",
      getstatus: "",
      statuscheck: "",
      anothercheck: "",
      useridentity: "",
      location: null,
      spinner: true,
      geocode: null,
      errorMessage: "",
      longitude: 0,
      latitude: 0,
      Address: null,
      CityName: null,
      track: "",
      names: "",
      numbers: "",
      receiver_no: "",
      address: null,
      request: "",
      seconds: 0,
      onduty: 0,

      setExpoPushToken: "",
      setNotification: "",
      onduty: "",
      plat: 0,
      plong: 0,
      dlat: 0,
      dlong: 0,
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    }
  }



  async componentDidMount() {

    //get user mobile no

    userId = (await AsyncStorage.getItem("@setMobile")) || "none";

    //get current location and request permissions function call
    this.getCurrentLocation();

    this.requestPermissions()


    // this.getMovies();



    //setting notifications



    //endofsettingnotifications
  }

  componentWillUnmount() {
    // unregister all event listeners
    // BackgroundGeolocation.removeAllListeners();
    TaskManager.unregisterAllTasksAsync(LOCATION_TASK_NAME)
    // Notifications.removeNotificationSubscription(notificationListener.current);
    //Notifications.removeNotificationSubscription(responseListener.current);
    navigator.geolocation.clearWatch(this.watchID);
  }

  //get user current location
  getCurrentLocation = async () => {


    Location.installWebGeolocationPolyfill()
    this.watchID = navigator.geolocation.watchPosition(
      position => {
        console.log(parseFloat(position.coords.latitude))
        this.setState({ latitude: parseFloat(JSON.stringify(position.coords.latitude)) })
        this.setState({ longitude: parseFloat(JSON.stringify(position.coords.longitude)) })
        let region = {
          latitude: parseFloat(JSON.stringify(position.coords.latitude)),
          longitude: parseFloat(JSON.stringify(position.coords.longitude)),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        };


        this.setState({
          initialRegion: region,
          spinner: false
        });

        fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + this.state.latitude + ',' + this.state.longitude + '&key=AIzaSyCw54WeLp5ojmGmBNZVvk0IixkPNCOCCjE')
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({ Address: responseJson.results[0].formatted_address })

            storeaddress = responseJson.results[0].formatted_address;

            //console.log(responseJson.results[0].address_components.filter(x => x.types.filter(t => t == 'administrative_area_level_2').length > 0)[0].long_name)
            this.setState({ pickupState: responseJson.results[0].address_components.filter(x => x.types.filter(t => t == 'administrative_area_level_1').length > 0)[0].long_name })
            this.setState({ CityName: responseJson.results[0].address_components[2].short_name })
            // console.log(responseJson.results[0].address_components[2].short_name)

            this._storeData()

            this.getCurrentRiderLocation();

          }).catch((error) => { // catch is called after then
            this.setState({ error: error.message })
          });
      },
      error => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceInterval: 1,
        timeInterval: 25000,
        foregroundService: {
          notificationTitle: 'Geona app is Using your location at the background',
          notificationBody: 'To turn off, go back to the app and switch something off.',
        },
      },

    );


  }

  //updating all trips.... pending, ongoing, delivery, pickup trips, this scripts update the trips once the button is clicked 
  _updateData = () => {

    console.log(this.state.getstatus)

    fetch('https://expressalllogistics.com/logistics/alltrips.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        mobile: userId,
        type: this.state.getstatus,
        trackcode: this.state.track,


      })


    }).then((response) => response.json())
      .then((responseJson) => {

        var tcode = responseJson.Tripcode;

        if (responseJson.status == 2) {

          this.setState({ statuscheck: 'Pickup Ongoing', getstatus: 2, anothercheck: 'End Pickup Ride', names: responseJson.pickup_name, numbers: responseJson.pickup_no, address: responseJson.pickup_address })


        }

        else if (responseJson.status == 3) {
          this.setState({ statuscheck: 'Destination Ongoing', getstatus: 3, anothercheck: 'End  Ride', names: responseJson.receiver_name, numbers: responseJson.receiver_no, address: responseJson.receiver_address })

          statuscheck = "Destination Ongoing"
          anothercheck = "End Destination Ride"

          names = this.state.receiver_name
          number = this.state.receiver_no

        }

        else if (responseJson.status == 0) {

          this.setState({ statuscheck: 'Finished Ride', getstatus: 6, anothercheck: 'Finished Ride', names: responseJson.receiver_name, numbers: responseJson.receiver_no, address: responseJson.receiver_address })

          statuscheck = "Finished Ride"
          anothercheck = "Finish Ride"
          names = this.state.receiver_name
          this.setState({ getstatus: 0 })
          number = this.state.receiver_no

        }




        console.log(responseJson)



      }).catch((error) => {
        console.error(error);
      });





  }


  //this function is for checking all current trips and setting the status of the trip, its defined here but called below under getcurrentriderlocation

  _checkingDatas = () => {


    //api call to check current trip of driver
    fetch('https://expressalllogistics.com/logistics/alltrips.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        //sending parameters via api
        mobile: userId,
        type: 500,
        trackcode: this.state.track,


      })


    }).then((response) => response.json())
      .then((responseJson) => {

        var tcode = responseJson.Tripcode;

        //conditional statement to set the status of the trip and update the current ride.

        if (responseJson.status == 2) {

          this.setState({ statuscheck: 'Pickup Ongoing', getstatus: 2, anothercheck: 'End Pickup Ride', names: responseJson.pickup_name, numbers: responseJson.pickup_no, address: responseJson.pickup_address })


        }

        else if (responseJson.status == 3) {
          this.setState({ statuscheck: 'Destination Ongoing', getstatus: 3, anothercheck: 'End Ride', names: responseJson.receiver_name, numbers: responseJson.receiver_no, address: responseJson.receiver_address })

          statuscheck = "Destination Ongoing"
          anothercheck = "End Destination Ride"

          names = this.state.receiver_name
          number = this.state.receiver_no

        }

        else if (responseJson.status == 0) {

          this.setState({ statuscheck: 'Finished Ride', getstatus: 6, anothercheck: 'Finished Ride', names: responseJson.receiver_name, numbers: responseJson.receiver_no, address: responseJson.receiver_address })

          statuscheck = "Finished Ride"
          anothercheck = "Finish Ride"
          names = this.state.receiver_name
          this.setState({ getstatus: 6 })
          number = this.state.receiver_no

        }




        console.log(responseJson)



      }).catch((error) => {
        console.error(error);
      });




  }


  //get current riders location 
  getCurrentRiderLocation = async () => {



    trackcode = this.props.navigation.state.params.trackcode
    // means = parseFloat(this.props.navigation.state.params.means)

    this.setState({ track: trackcode })

    userId = (await AsyncStorage.getItem("@setMobile")) || "none";

    console.log('Trackcode' + trackcode + means + userId)

    this._checkingDatas()





  }


  requestPermissions = async () => {
    const { status } = await Location.requestBackgroundPermissionsAsync();
    if (status === 'granted') {
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.High,
        timeInterval: 10000,
        distanceInterval: 1,
      });
    }
  }


  async stopTracking() {
    console.log('Remove tracking')

    TaskManager.unregisterAllTasksAsync(LOCATION_TASK_NAME)
  }

  //function that stores all data into async
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





  _storetrackcode = async () => {
    try {
      await AsyncStorage.setItem(
        '@track',
        this.state.track
      );
      console.log('trackcode ' + this.state.track)
    } catch (error) {
      // Error saving data
      console.log("Error saving Data")
    }
  }





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


  getGeocodeAsync = async (location) => {
    let geocode = await Location.reverseGeocodeAsync(location)
    this.setState({ geocode })
  }



  async registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    return token;
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
              <View style={{ margin: 15 }}>
                <RideType
                  onPress={() => console.log('hello')}
                  Source={this.props.navigation.state.params.imagesource}
                  RideType={this.state.address}
                  Price={this.props.navigation.state.params.Prices}
                  Distance={this.state.statuscheck}
                  priceText={{ color: Color.pink }}
                  Time=""
                />
                <View style={styles.view}>
                  <View style={styles.optionView}>
                    <TouchableOpacity>
                      <Image
                        source={require("../../Image/payment.png")}
                        style={styles.image}
                      />
                      <Text style={styles.text}> {this.state.names} </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.optionView}>
                    <TouchableOpacity
                      onPress={() => console.log('hamen')}
                    >
                      <Image
                        source={require("../../Image/promoCode.png")}
                        style={styles.image}
                      />
                      <Text style={styles.text}> {this.state.numbers} </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.optionView}>
                    <TouchableOpacity
                      onPress={() => console.log('Hallelujah')}
                    >
                      <Image
                        source={require("../../Image/cancel.png")}
                        style={styles.image}
                      />
                      <Text style={styles.text}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <Button
                Text={this.state.anothercheck}
                onPress={this._updateData}
              />
            </View>
          </View>
        </View>
      </Drawer >
    );
  }
}
//Drawer.defaultProps.styles.mainOverlay.elevation = 0;


var seconds = 0;

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.log(error);
    return;
  }
  if (data) {

    seconds++;

    const { locations } = data;
    let lat = locations[0].coords.latitude;
    let long = locations[0].coords.longitude;
    userId = (await AsyncStorage.getItem("@setMobile")) || "none";


    console.log(userId, lat, long, storeaddress)
    axios.post('https://expressalllogistics.com/logistics/driverlocation.php', JSON.stringify({
      mobile: userId,
      lati: lat,
      longi: long,
      cityName: storeaddress
    }), {
      headers: {
        "Content-Type": "application/json",
      }
    }).then(response => {

      //setStateFn(reponse.data.Tripcode);

      console.log(response.data.Tripcode)
      console.log(response.data.receivercity)
      console.log(response.data.pickupcity)
      console.log(response.data.usermobile)

      //store.dispatch(UPDATE_LOCATION(response.data.pickupcity, response.data.receivercity, response.data.mobile))

      if (seconds >= 5) {
        console.log("Broadcast cant send again cause its already sent twice")

      }

      else {
        if (responseJson.request == 1 && responseJson.onduty == null && responseJson.status == 1) {
          Vibration.vibrate(500);
          Notifications.scheduleNotificationAsync({
            content: {
              title: 'Order from Geona App',
              body: 'Log in to the app to view your pending order',
              data: { data: 'goes here' },
            },
            trigger: {
              seconds: 2,

            },
          });

        }

      }


    }).catch(err => console.log("api Erorr: ", err.response))


  }


});