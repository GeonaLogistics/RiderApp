import React, { Component } from "react";
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
  StatusBar
} from "react-native";
import container from "../../Styles/Container/style";
let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;
import Color from "../../Config/Color";
import Icon from "react-native-vector-icons/Ionicons";
import IconText from "../../Component/IconText/index";
import HistoryList from "../../Component/HistoryList/indx";
import style from "./style";
import AsyncStorage from '@react-native-async-storage/async-storage'



var mobile = ""


export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {

      responses: []
    }
  };

  async componentDidMount() {
    //this.getLocationAsync();
    //this.getCurrentLocation();

    mobile = await AsyncStorage.getItem('@setMobile')

    this.updaterider()



  }

  async updaterider() {

    console.log('Interval retriggered');

    console.log("Mobile" + mobile)





    //this._storeData()

    try {



      fetch('https://expressalllogistics.com/logistics/historyagent.php', {
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



          this.setState({ responses: responseJson });

          console.log(this.state.responses)




          //  console.log("Longitudes:" + longitudes + "Latitude" + latitudes + "PLAT " + plat + "PLONG " + plong + "DLAT" + dlat)




        })
    }
    catch (error) {
      console.log("Saved Data")
    }
  }





  render() {
    return (
      <View style={[container.container]}>
        <StatusBar barStyle="light-content" />
        <View style={{ flex: 1 }}>
          <View style={{ width: width, height: height / 2.7 }}>
            <ImageBackground
              source={require("../../Image/halfbg.png")}
              style={{ flex: 1 }}
            >
              <View
                style={{
                  marginHorizontal: 15,
                  marginTop: 45,
                  marginBottom: 40
                }}
              >
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("Home")}
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
                <View style={{ flexDirection: "row", marginTop: 15 }}>
                  <View style={{ flex: 0.5, justifyContent: "center" }}>
                    <Text
                      style={{
                        fontSize: 28,
                        fontFamily: "uber-b",
                        color: Color.white,
                        marginVertical: 10
                      }}
                    >
                      History
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 0.5,
                      justifyContent: "center"
                    }}
                  >
                    <ImageBackground
                      source={require("../../Image/Transpernt.png")}
                      style={{
                        borderRadius: 80
                        //  borderColor: Color.steel,
                        //  borderWidth: 2
                      }}
                    >
                      <View style={{ flexDirection: "row" }}>
                        {/*
                        <View style={{ flex: 0.8 }}>
                          <Text
                            style={{
                              fontSize: 16,
                              fontFamily: "uber",
                              color: Color.whiteSmoke,
                              marginHorizontal: 10,
                              marginVertical: 5,
                              alignSelf: "flex-start"
                            }}
                          >
                            Jan 9,2019
                          </Text>
                        </View>
                        <View style={{ flex: 0.1, justifyContent: "center" }}>
                          <TouchableOpacity>
                            <Icon
                              name="ios-arrow-down"
                              size={25}
                              style={[
                                {
                                  color: Color.whiteSmoke,
                                  alignSelf: "center"
                                  //marginTop:40
                                },
                                this.props.iconStyle
                              ]}
                            />
                          </TouchableOpacity>
                        </View>
                            */}
                      </View>
                    </ImageBackground>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
        </View>
        {/* <ScrollView
          style={{ top: 0, bottom: 0, position: "absolute", flex: 1 }}
        > */}
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            marginTop: width / 2.3,
            marginBottom: 10,
            marginHorizontal: 10,
            backgroundColor: "Transparent",
            flex: 1
            //  justifyContent: "center"
            // borderRadius: 10,
            // borderColor: Color.steel,
            // borderWidth: 2
          }}
        >
          <ScrollView
            style={{ height: height, }}

          >



            {this.state.responses.length > 0 &&
              this.state.responses.map((myValue, myIndex) => {
                return (
                  <View style={style.historyListView} key={myIndex} >
                    <HistoryList
                      source={require("../../Image/destination-icon.png")}
                      pickupAddress={myValue.pickup_address}
                      destinationAddress={myValue.receiver_address}
                      price={myValue.price}
                      status={myValue.day + ' ' + myValue.month + ', ' + myValue.year}
                      statusText={{ color: Color.purple, fontFamily: "uber-b" }}
                    />
                  </View>
                );


              })
            }

          </ScrollView>
          {/* </View> */}
        </View>
      </View>
    );
  }
}
