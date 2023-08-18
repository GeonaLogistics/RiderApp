import React, { Component } from "react";
import MapView from 'react-native-maps';
import styles from "./style";
import Color from "../../Config/Color";
import axios from 'axios';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';


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

const LOCATION_TASK_NAME = "background-location-task";

var userId = ""
var storeaddress = ""

var mseconds = 0


var watchID = null;



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

    //create states for all variables 

    this.notificationListener = React.createRef();
    this.responseListener = React.createRef();

    this.state = {
      status: "",
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
      request: "",
      seconds: 0,
      onduty: 0,
      pickupState: null,
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
    //get rider phone mobile from async
    userId = (await AsyncStorage.getItem("@setMobile")) || "none";

    //get current location of rider
    this.getCurrentLocation();

    this.requestPermissions()


    setInterval(() => {
      console.log('Interval triggered');

      this.getCurrentRiderLocation();

    }, 10000);



    //setting push notifications

    this.registerForPushNotificationsAsync().then(token => this.setState({ setExpoPushToken: token }));

    this.notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      this.setState({ setNotification: notification })
    });

    this.responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    //endofsettingnotifications
  }

  componentWillUnmount() {
    //removing all notifications once this page closes 

    // unregister all event listeners
    // BackgroundGeolocation.removeAllListeners();
    TaskManager.unregisterAllTasksAsync(LOCATION_TASK_NAME)
    // Notifications.removeNotificationSubscription(notificationListener.current);
    //Notifications.removeNotificationSubscription(responseListener.current);
    navigator.geolocation.clearWatch(this.watchID);
  }

  //getting users current location
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

        //google api that captures users address and city

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








  //get current riders location and upload to server intermittently

  getCurrentRiderLocation = async () => {


    userId = (await AsyncStorage.getItem("@setMobile")) || "none";


    fetch('https://expressalllogistics.com/logistics/driverlocation.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        mobile: userId,
        lati: this.state.latitude,
        longi: this.state.longitude,
        cityName: storeaddress
      })


    }).then((response) => response.json())
      .then((responseJson) => {

        var tcode = responseJson.Tripcode;

        this.setState({
          status: responseJson.online,
          request: responseJson.request,

        })


        console.log("online " + responseJson.online + "offline " + this.state.request + responseJson.plat)

        console.log(responseJson.request + responseJson.onduty + responseJson.status)

        // check if rider has a request and is online

        if (responseJson.request == 1 && responseJson.status == 1) {

          this.setState({ seconds: this.state.seconds + 1 })

          console.log(this.state.seconds)
          //set vibration if there is a request
          if (this.state.seconds < 3) {

            Vibration.vibrate(800);
          }
          //send push notification if there is a request
          if (this.state.seconds < 2) {

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

          //navigate to ongoing ride if rider mistakenly closes the app or battery dies....... once he logs in this script would automatically continue the current ride
          if (responseJson.request == 1 && responseJson.status == 1) {
            console.log(responseJson.plat + responseJson.dlong)
            //automatically navigates user to confirmation screen to accept ride 
            this.props.navigation.navigate("RideReqConfirm", { plat: responseJson.plat, plong: responseJson.plong, dlat: responseJson.dlat, dlong: responseJson.dlong })
          }

        }
        //navigate to ongoing ride if rider mistakenly closes the app or battery dies....... once he logs in this script would automatically continue the current ride, 2 signified pickup ongoing
        else if (responseJson.request == 1 && responseJson.status == 2) {

          //automatically navigates user to ongoing ride screen
          this.props.navigation.navigate("BookingReq", { trackcode: responseJson.trackcode })

        }
        //navigate to ongoing ride if rider mistakenly closes the app or battery dies....... once he logs in this script would automatically continue the current ride. 3 signifies delivery ongoing
        else if (responseJson.request == 1 && responseJson.status == 3) {

          //automatically navigates user to ongoing ride screen
          this.props.navigation.navigate("BookingReq", { trackcode: responseJson.trackcode })
        }



      }).catch((error) => {
        console.error(error);
      });








  }


  //request permissions

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

  //functions that stores info of rider
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

  _cancelOrder = () => {

    this.setState({
      onduty: 0,
      request: 0,
    }, () => {

      this.mainStatusRequestChange()

    });


  }

  _startOrder = () => {


    //this.mainStatusRequestChange()

    this.props.navigation.navigate("RideReqConfirm")






  }



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



  //get user current location

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

  //function that toggles between online and offline when button is clicked on home screen
  mainStatusRequestChange = () => {

    axios.post('https://expressalllogistics.com/logistics/changestatus.php', JSON.stringify({
      mobile: userId,
      status: this.state.status

    }), {
      headers: {
        "Content-Type": "application/json",
      }
    }).then(response => {

      console.log(response.data.Tripcode)
    });

  }


  //function that get current status if user is offline or online
  getStatusState = () => {
    if (this.state.status === 1) {


      this.setState({
        status: 0
      }, () => {

        this.mainStatusRequestChange()

      });

      this.stopTracking()


      console.log('Stopped Tracking....')
    }

    else {

      this.setState({
        status: 1
      }, () => {

        this.mainStatusRequestChange()


      });


    }

  }


  getGeocodeAsync = async (location) => {
    let geocode = await Location.reverseGeocodeAsync(location)
    this.setState({ geocode })
  }

  //function that shows the alert
  changeColor() {
    Alert.alert(
      this.state.status == 1 ? "Go Offline" : "Go Online",
      "Change Status",
      [
        { text: 'Yes', onPress: this.getStatusState },
        { text: 'No', onPress: () => { }, style: 'cancel' },
      ],
      {
        cancelable: true
      }
    );
  }


  getGeocodeAsync = async (location) => {
    let geocode = await Location.reverseGeocodeAsync(location)
    this.setState({ geocode })
  }

  //function that send push notification once an order enters

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


            <View style={{
              marginTop: -150
            }}>
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: 'rgba(0,0,0,0.2)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 70,
                  height: 70,
                  backgroundColor: "#000",

                  borderRadius: 100,
                }}
                onPress={() => this.changeColor()}

              >
                <Text
                  style={{ color: '#fff', fontSize: 25 }}>{this.state.status == 1 ? "STOP" : "GO"}</Text>
              </TouchableOpacity>


              {/*
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

                */}
            </View>
          </View>
        </View>
      </Drawer >
    );
  }
}
//Drawer.defaultProps.styles.mainOverlay.elevation = 0;

//background task for getting user location consistenly and uploading to server
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
          Vibration.vibrate(800);
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