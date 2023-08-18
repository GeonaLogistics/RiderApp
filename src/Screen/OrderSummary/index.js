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
import { Card, ListItem } from 'react-native-elements'
import Spinner from 'react-native-loading-spinner-overlay';




export default class index extends Component {
  constructor(props) {
    super(props)

    var plats = plats ? plats : ""
    var plongs = plongs ? plongs : ""
    var dlats = dlats ? dlats : ""
    var dlongs = dlongs ? dlongs : ""
    var daddresss = daddresss ? daddresss : raddress
    var pstreets = pstreets ? pstreets : ""

    var ride = ride ? ride : ""
    var pfullname = pfullname ? pfullname : ""
    var paddress = paddress ? paddress : ""





    var weight = weight ? weight : ""
    var itemName = itemName ? itemName : ""
    var pdescription = pdescription ? pdescription : ""
    var quantity = quantity ? quantity : ""
    var Items = Items ? Items : ""


    var pphone = pphone ? pphone : ""
    var pcity = pcity ? pcity : ""

    var dcities = dcities ? dcities : ""

    var dstatename = dstatename ? dstatename : ""

    var pickupstate = pickupstate ? pickupstate : ""

    var prices = prices ? prices : 0
    var duration = duration ? duration : ""
    var distance = distance ? distance : ""
    var real = real ? real : ""





    var rfullname = rfullname ? rfullname : ""
    var raddress = raddress ? raddress : ""
    var rphone = rphone ? rphone : ""
    var rcity = rcity ? rcity : ""
    // var rcity = await AsyncStorage.getItem('@storage_rCity')

    var mobile = mobile ? mobile : ""
    var paymenttype;





    this.state = {
      ppfullname: "",
      ppaddress: "",
      ppphone: "",
      city: "",
      ddfullname: "",
      ddaddress: "",
      dddphone: "",
      price: 0,
      rides: "",
      itemNames: "",
      weights: "",
      descriptions: "",
      quantities: "",
      item: "",
      mobilephone: "",
      dstate: "",
      dcit: "",
      pstate: "",
      platitude: "",
      plongitude: "",
      dlatitude: "",
      dlongitude: "",
      spinner: true,
      spinners: false,
      trackcode: "",
      distances: "",
      durations: "",
      paymentype: ""


    };
  }



  getPrice = () => {

    this.setState({
      spinners: true
    }, () => {

      console.log(this.state.trackcode)

      fetch('https://expressalllogistics.com/logistics/findrider.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({


          pname: pfullname,
          paddress: paddress,
          pphone: this.state.ppphone,
          citi: pcity,
          dname: rfullname,
          dadd: raddress,
          dphone: rphone,
          pricing: this.state.price,
          ridetype: ride,
          itemns: itemName,
          weight: weight,
          description: pdescription,
          quantity: quantity,
          items: Items,
          mobile: mobile,
          dstates: dstatename,
          dcitie: rcity,
          pstates: pickupstate,
          plat: plats,
          plong: plongs,
          dlat: dlats,
          dlong: dlongs,
          trackcode: this.state.trackcode,
          distanc: this.state.distances,
          duratio: this.state.durations,
          typeofpayment: this.state.paymentype

        })


      }).then((response) => response.json())
        .then((responseJson) => {

          this.setState({
            spinners: false
          }, () => {

            var code = responseJson.Tripcode;

            console.log(code)

            if (code == 1) {
              // alert(price)

              this.props.navigation.navigate("findrider", { platitude: plats, plongitude: plongs, dlatitude: dlats, dlongitude: dlongs, value: 1, trackcode: this.state.trackcode })

              //this.timer = setInterval(() => this.getMovies(), 10000)

            }
            else if (code == 3) {
              alert("Request already sent")

              this.props.navigation.navigate("findrider", { platitude: plats, plongitude: plongs, dlatitude: dlats, dlongitude: dlongs, value: 1, trackcode: this.state.trackcode })

            }

            else if (code == 10) {
              alert("No Rider Available! Try again later")

              this.props.navigation.navigate("findrider", { value: 2, trackcode: this.state.trackcode })
            }




          }).catch((error) => {
            console.error(error);
          });




        })

      // If server response message same as Data Matched


      //Then open Profile activity and send user email to profile activity.
      //this.props.navigation.navigate('Second', { Email: UserEmail });



    })




  }



  async componentDidMount() {


    this.processColor()
    this.trackerscode()


  }

  trackerscode = () => {

    var num = Math.floor(Math.random() * 90000) + 10000;

    this.setState({
      trackcode: "GL" + num
    }, () => {

      //this._storePrice()

    })

  }
  /*
    getPri = () => {
  
  
      fetch('https://expressalllogistics.com/logistics/getprice.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
  
          dCity: this.state.city,
          dState: this.state.dstate,
          pCity: this.state.dcit,
          pState: this.state.pstate
  
  
  
        })
  
  
      }).then((response) => response.json())
        .then((responseJson) => {
  
  
          this.setState({
            spinner: false
          }, () => {
  
          })
  
  
          // If server response message same as Data Matched
  
  
          //Then open Profile activity and send user email to profile activity.
          //this.props.navigation.navigate('Second', { Email: UserEmail });
  
          var pprice = responseJson.Tripcode;
  
          if (pprice > 1) {
            // alert(price)
  
  
  
            this.setState({
              price: pprice
            }, () => {
  
              //this._storePrice()
  
            })
  
  
  
            console.log(this.state.price)
  
          }
  
          else {
            alert("Couldnt get price")
          }
  
  
  
  
        }).catch((error) => {
          console.error(error);
        });
  
  
  
  
  
    }
  */

  processColor = async () => {

    plats = this.props.navigation.state.params.platitude
    plongs = this.props.navigation.state.params.plongitude
    dlats = this.props.navigation.state.params.dlatitude
    dlongs = this.props.navigation.state.params.dlongitude
    daddresss = this.props.navigation.state.params.deaddress

    ride = this.props.navigation.state.params.Ride


    /*
    
        if (ride === 'Bike') {
    
          prices = 100 + (real * 25)
        }
        else {
          prices = 100 + (real * 50)
        }
    
    */

    try {

      weight = await AsyncStorage.getItem('@storage_itemWeight')
      itemName = await AsyncStorage.getItem('@storage_itemName')
      pdescription = await AsyncStorage.getItem('@storage_Description')
      quantity = await AsyncStorage.getItem('@storage_Quantity')
      Items = await AsyncStorage.getItem('@storage_Items')
      pstreets = await AsyncStorage.getItem('@PickUpAddress')
      pfullname = await AsyncStorage.getItem('@storage_Fullname')
      paddress = await AsyncStorage.getItem('@storage_Address')
      pphone = await AsyncStorage.getItem('@storage_Phone')
      pcity = await AsyncStorage.getItem('@storage_City')

      dcities = await AsyncStorage.getItem('@CityNameDestination')

      paymenttype = await AsyncStorage.getItem('@storage_Payment')

      dstatename = await AsyncStorage.getItem('@dstatename')

      pickupstate = await AsyncStorage.getItem('@PickUpState');



      duration = await AsyncStorage.getItem('@duration')

      distance = await AsyncStorage.getItem('@distance')



      real = parseInt(distance);

      if (ride === 'Bike') {
        prices = 100 + (real * 25)
      }
      else {
        prices = 100 + (real * 50)
      }
      //prices = 100 + (real * 25)




      rfullname = await AsyncStorage.getItem('@storage_rFullname')
      raddress = await AsyncStorage.getItem('@storage_rAddress')
      rphone = await AsyncStorage.getItem('@storage_rPhone')
      rcity = await AsyncStorage.getItem('@storage_rCity')
      // var rcity = await AsyncStorage.getItem('@storage_rCity')

      mobile = await AsyncStorage.getItem('@setMobile')

      //alert(mobile)
    }

    catch (error) {
      // Error saving data
      console.log("Error saving some Data")
    }


    this.setState({
      platitude: plats,
      plongitude: plongs,
      dlatitude: dlats,
      dlongitude: dlongs,
      mobilephone: mobile,
      pstate: pickupstate,
      dcit: rcity,
      city: pcity,
      dstate: dstatename,
      ppfullname: pfullname,
      ppaddress: paddress,
      ppphone: pphone,
      ddfullname: rfullname,
      ddaddress: raddress,
      dddphone: rphone,
      price: prices,
      rides: ride,
      itemNames: itemName,
      weights: weight,
      descriptions: pdescription,
      quantities: quantity,
      item: Items,
      distances: distance,
      durations: duration,
      paymentype: paymenttype



    }, () => {

      /*

      fetch('https://expressalllogistics.com/logistics/getprice.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({

          dCity: rcity,
          dState: this.state.dstate,
          pCity: pcity,
          pState: this.state.pstate



        })


      }).then((response) => response.json())
        .then((responseJson) => {


          this.setState({
            spinner: false
          }, () => {

          })


          // If server response message same as Data Matched


          //Then open Profile activity and send user email to profile activity.
          //this.props.navigation.navigate('Second', { Email: UserEmail });

          var pprice = responseJson.Tripcode;

          if (pprice > 1) {
            // alert(price)



            this.setState({
              price: pprice
            }, () => {

              //this._storePrice()

            })



            console.log(this.state.price)

          }

          else {
            alert("Couldnt get price")
          }




        }).catch((error) => {
          console.error(error);
        });


*/


    })





    console.log('Pickup Latitude' + plats)
    console.log('Pickup Longitude' + plongs)
    console.log('Destination Latitude' + dlats)
    console.log('Destination Longitude' + dlongs)
    console.log('Destination Address' + daddresss)
    console.log('Pickup Street' + pstreets)
    console.log('Ride Chosen' + ride)
    console.log('Prices' + this.state.price)
    console.log('--------------------------------------')
    console.log('weight' + weight)
    console.log('Item Name' + itemName)
    console.log('Product Description ' + pdescription)
    console.log('Quantity ' + quantity)
    console.log('Items' + Items)
    console.log('---------------------------------------')
    console.log('Fullname pickup ' + pfullname)
    console.log('Pickup Address ' + paddress)
    console.log('Pickup Phone ' + pphone)
    console.log('Pickup City' + this.state.city)
    console.log('----------------------------------------')
    console.log('Receipient Fullname' + rfullname)
    console.log('Receipient Address' + raddress)
    console.log('Receipient Phone' + rphone)
    console.log('Recipient City' + this.state.dcit)



  }







  render() {



    return (
      <View style={[container.container]}>
        <StatusBar
          barStyle="light-content"
        />
        <Spinner
          visible={this.state.spinners}
          textStyle={{ color: '#FFF' }}
          cancelable={false}
          textContent={'Searching for Rider...'}
          overlayColor={'rgba(0, 0, 0, 0.8)'}

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
                  Order Summary
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
            <Text style={styles.centralize}> Below is a summary of your order details.</Text></View>
          <View style={styles.regForm}>




            <Card>
              <Card.Title>Ride Details</Card.Title>
              <Card.Divider />
              <View style={{ flexDirection: "row" }}>
                <Text style={{ marginBottom: 10, fontWeight: "bold" }}>
                  Ride Chosen:
  </Text>
                <Text style={{ marginBottom: 10, marginHorizontal: 30 }}>
                  {this.state.rides}
                </Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                <Text style={{ marginBottom: 10, fontWeight: "bold" }}>
                  Price:  </Text>
                <Text style={{ marginBottom: 10 }}>
                  ₦{this.state.price}
                </Text>
              </View>


              <View style={{ flexDirection: "row" }}>
                <Text style={{ marginBottom: 10, fontWeight: "bold" }}>
                  Mode of Payment:  </Text>
                <Text style={{ marginBottom: 10 }}>
                  ₦{this.state.paymentype}
                </Text>
              </View>


              <View style={{ flexDirection: "row" }}>
                <Text style={{ marginBottom: 10, fontWeight: "bold" }}>
                  Track Code:  </Text>
                <Text style={{ marginBottom: 10 }}>
                  {this.state.trackcode}
                </Text>
              </View>





            </Card>



            <Card>
              <Card.Title>Pick-up Details</Card.Title>
              <Card.Divider />
              <View style={{ flexDirection: "row" }}>
                <Text style={{ marginBottom: 10, fontWeight: "bold" }}>
                  Full Name:
  </Text>
                <Text style={{ marginBottom: 10, marginHorizontal: 30 }}>
                  {this.state.ppfullname}
                </Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                <Text style={{ marginBottom: 10, fontWeight: "bold" }}>
                  Address:  </Text>
                <Text style={{ marginBottom: 10 }}>
                  {this.state.ppaddress}
                </Text>
              </View>


              <View style={{ flexDirection: "row" }}>
                <Text style={{ marginBottom: 10, fontWeight: "bold" }}>
                  Phone No:  </Text>
                <Text style={{ marginBottom: 10 }}>
                  {this.state.ppphone}
                </Text>
              </View>


              <View style={{ flexDirection: "row" }}>
                <Text style={{ marginBottom: 10, fontWeight: "bold" }}>
                  Pickup City:  </Text>
                <Text style={{ marginBottom: 10 }}>
                  {this.state.city}
                </Text>
              </View>



            </Card>




            <Card>
              <Card.Title>Destination Details</Card.Title>
              <Card.Divider />
              <View style={{ flexDirection: "row" }}>
                <Text style={{ marginBottom: 10, fontWeight: "bold" }}>
                  Full Name:
  </Text>
                <Text style={{ marginBottom: 10, marginHorizontal: 30 }}>
                  {this.state.ddfullname}
                </Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                <Text style={{ marginBottom: 10, fontWeight: "bold" }}>
                  Address:  </Text>
                <Text style={{ marginBottom: 10 }}>
                  {this.state.ddaddress}
                </Text>
              </View>


              <View style={{ flexDirection: "row" }}>
                <Text style={{ marginBottom: 10, fontWeight: "bold" }}>
                  Phone No:  </Text>
                <Text style={{ marginBottom: 10 }}>
                  {this.state.dddphone}
                </Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                <Text style={{ marginBottom: 10, fontWeight: "bold" }}>
                  Destination City:  </Text>
                <Text style={{ marginBottom: 10 }}>
                  {this.state.dcit}
                </Text>
              </View>


            </Card>






            <Card>
              <Card.Title>Items Ordered</Card.Title>
              <Card.Divider />
              <View style={{ flexDirection: "row" }}>
                <Text style={{ marginBottom: 10, fontWeight: "bold" }}>
                  Item Name:
  </Text>
                <Text style={{ marginBottom: 10, marginHorizontal: 30 }}>
                  {this.state.itemNames}
                </Text>
              </View>

              <View style={{ flexDirection: "row" }}>
                <Text style={{ marginBottom: 10, fontWeight: "bold" }}>
                  Description:  </Text>
                <Text style={{ marginBottom: 10 }}>
                  {this.state.descriptions}
                </Text>
              </View>


              <View style={{ flexDirection: "row" }}>
                <Text style={{ marginBottom: 10, fontWeight: "bold" }}>
                  Quantity:  </Text>
                <Text style={{ marginBottom: 10 }}>
                  {this.state.quantities}
                </Text>
              </View>






              <View style={{ flexDirection: "row" }}>
                <Text style={{ marginBottom: 10, fontWeight: "bold" }}>
                  Items:  </Text>
                <Text style={{ marginBottom: 10 }}>
                  {this.state.item}
                </Text>
              </View>



            </Card>
          </View>
        </ScrollView>
        <Button
          Text="Find Rider"
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
          onPress={() => this.getPrice()}
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




