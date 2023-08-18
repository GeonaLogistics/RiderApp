import React, { Component } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView from 'react-native-maps';
let width = Dimensions.get("window").width;
import {
  Image,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import container from "../../Styles/Container/style";
import style from "./style";
import Button from "../../Component/Button/index";
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "1003, Abhishree Adroit, India" };
  }
  render() {
    return (
      <View style={container.container}>
        <StatusBar barStyle="dark-content" />
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: 23.032068,
            longitude: 72.525192,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          }}
        />
        <View
          style={[
            style.container,
            {
              ...Platform.select({
                ios: {
                  zIndex: 9
                }
              })
            }
          ]}
        >
          <View style={{ margin: 15, flexDirection: "row" }}>
            <View style={style.imageView}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("HomeUp")}
              >
                <Image
                  source={require("../../Image/back.png")}
                  style={style.image}
                />
              </TouchableOpacity>
            </View>
            {/*
            <View style={[this.props.viewText, { flex: 1 }]}>


            */}




            <GooglePlacesAutocomplete
              placeholder="Search Places"
              placeholderTextColor="#333"
              onPress={(data, details) => {
                console.log(data, details);
              }}
              query={{
                key: "AIzaSyD-n60W2PvXoXg4tTJhDy6JrhuLgIQMOYY",
                language: "en"
              }}
              textInputProps={{
                autoCapitalize: "none",
                autoCorrect: false
              }}
              fetchDetails={true}
              enablePoweredByContainer={false}
              styles={{
                container: {
                  position: "absolute",
                  top: Platform.select({ ios: 60, android: 40 }),
                  width: "100%"
                },
                textInputContainer: {
                  flex: 1,
                  backgroundColor: "transparent",
                  height: 54,
                  marginHorizontal: 20,
                  borderTopWidth: 0,
                  borderBottomWidth: 0
                },
                textInput: {
                  height: 54,
                  margin: 0,
                  borderRadius: 0,
                  paddingTop: 0,
                  paddingBottom: 0,
                  paddingLeft: 20,
                  paddingRight: 20,
                  marginTop: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  elevation: 5,
                  shadowColor: "#000",
                  shadowOpacity: 0.1,
                  shadowOffset: { x: 0, y: 0 },
                  shadowRadius: 15,
                  borderWidth: 1,
                  borderColor: "#ddd",
                  fontSize: 18
                },
                listView: {
                  borderWidth: 1,
                  borderColor: "#ddd",
                  backgroundColor: "#fff",
                  marginHorizontal: 20,
                  elevation: 5,
                  shadowColor: "#000",
                  shadowOpacity: 0.1,
                  shadowOffset: { x: 0, y: 0 },
                  shadowRadius: 15,
                  marginTop: 10
                },
                description: {
                  fontSize: 16
                },
                row: {
                  padding: 20,
                  height: 58
                }
              }}
            />

            {/*
              <TextInput
                style={{ height: 30 }}
                onChangeText={text => this.setState({ text })}
                value={this.state.text}
              />
              
            </View>
            */}
            <View style={style.imageView2}>
              <TouchableOpacity>
                <Image
                  source={require("../../Image/cancel-icon.png")}
                  style={style.image2}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={style.subContainerView}>
          <Button
            onPress={() => this.props.navigation.navigate("BookingReq")}
            Text="Let's Go"
            viewStyle={{ margin: 0, borderRadius: 0, width: width }}
          />
        </View>
      </View>
    );
  }
}
