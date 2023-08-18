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
  Vibration,
  StyleSheet,
  processColor
} from "react-native";
import container from "../../Styles/Container/style";
let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;
import Color from "../../Config/Color";
import Icon from "react-native-vector-icons/Ionicons";
//import style from "./style";
import TextIcon from "../../Component/TextIcon";
import Button from "../../Component/Button/index";
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import RNPickerSelect from 'react-native-picker-select';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Picker } from '@react-native-picker/picker';
import Spinner from 'react-native-loading-spinner-overlay';

var timelefts = 3;

export default class index extends Component {
  constructor(props) {
    super(props)



    var value = ""
    var trackcode = ""
    var plats = ""
    var plongs = ""
    var dlats = ""
    var dlongs = ""
    var daddresss = ""
    var pstreets = ""

    this.state = {
      values: "",
      textt: "",
      timeleft: 3,
      timer: 40,
      drivermobile: "",
      update: "",
      spinner: true,

      orders: []

    };
  }



  startTimer = () => {
    this.clockCall = setInterval(() => {
      this.decrementClock();
    }, 1000);
  }

  decrementClock = () => {
    if (this.state.timer === 1) {

      timelefts = timelefts - 1

      this.setState({ timeleft: timelefts })

      if (timelefts === 1) {
        this.setState({ textt: "Awaiting for Admin to Assign", timer: 60 })
      }

      if (this.state.timeleft === 0 && this.state.timer === 1) {
        this.setState({ textt: "Please try requesting again shortly", timer: 0 })
        clearInterval(this.clockCall)
      }
      else {


        this.setState({ textt: "No Rider has Accepted, Retrying again", timer: 40 })

        this.startTimer()
      }

    }
    else { this.getMovies() }

    this.setState((prevstate) => ({ timer: prevstate.timer - 1 }));
  };

  getMovies = () => {



    if (this.state.timeleft === 0)

      trackcode = this.props.navigation.state.params.trackcode
    /*
        try {
          var userId = (await AsyncStorage.getItem("@setMobile")) || "none";
        }
        catch (error) {
          // Error saving data
          console.log("Error saving Data")
        }
    */



    fetch('https://expressalllogistics.com/logistics/checkdriver.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({

        trackcodes: trackcode

      })

    }).then((response) => response.json())
      .then((responseJson) => {

        var user_id = responseJson.Tripcode
        var driversmobile = responseJson.driversmobile




        if (user_id === 1) {


          plats = this.props.navigation.state.params.platitude
          plongs = this.props.navigation.state.params.plongitude
          dlats = this.props.navigation.state.params.dlatitude
          dlongs = this.props.navigation.state.params.dlongitude


          Vibration.vibrate(1500)
          this.setState({ drivermobile: driversmobile, textt: "Rider Accepted" })

          this.setState({ timer: 1, update: "Rider has accepted" })

          this.props.navigation.navigate("delivery", { platitude: plats, plongitude: plongs, dlatitude: dlats, dlongitude: dlongs, value: driversmobile, trackcode: trackcode })





        }

        /*
        else if (user_id === 2) {
          this.setState({ textt: "Rider Declined" })

          this.setState({ update: "Awaiting for Admin to assign a rider" })

          //  this.startTimer()
        }
        else {
          this.setState({ update: "Awaiting for Admin to assign a rider" })

          this.startTimer()
        }
        */
      });

  }

  componentWillUnmount() {
    clearInterval(this.clockCall);
  }




  async componentDidMount() {




    this.processAddress()


    /*
    
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
    
    
    */


  }





  processAddress = async () => {

    value = this.props.navigation.state.params.value
    trackcode = this.props.navigation.state.params.trackcode

    this.setState({ values: value })

    if (value === 1) {
      this.setState({ textt: "Rider Found, Awaiting for Rider to accept", spinner: false })

      this.startTimer()




    }
    else {
      this.setState({ textt: "Finding nearest Rider" })
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
                  Find Rider
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
            <Text style={styles.centralize}>{this.state.textt}</Text></View>
          <View><Text style={styles.centralize}>{this.state.timeleft}</Text></View>
          <View style={styles.centralized}><Text style={styles.centralized}> {this.state.timer}</Text></View>
          <View style={styles.regForm}>





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

  },

  centralized: {
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    marginVertical: 10

  }
});




