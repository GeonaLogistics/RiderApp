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
  StyleSheet
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
import * as Linking from 'expo-linking';



export default class index extends Component {
  constructor(props) {
    super(props)







  }


  async componentDidMount() {




  }



  _handleOpenWithLinking = () => {
    Linking.openURL('https://expressallservices.com/abuja');
  };


  _handleOpenWithLinkingenugu = () => {
    Linking.openURL('https://expressallservices.com/enugu');
  };

  /*
    getData = async () => {
      try {
        const value = await AsyncStorage.getItem('@storage_Key')
        if (value !== null) {
          // value previously stored
          alert(value)
        }
      } catch (e) {
        // error reading value
        alert("Could not read value")
      }
    }
  
  */



  render() {






    return (
      <View style={[container.container]}>
        <StatusBar
          barStyle="light-content"
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
                  Grocery Stores
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
          <TouchableOpacity onPress={() => this._handleOpenWithLinking()}>
            <View style={{
              flex: 1, borderRadius: 20, height: 150, width: '95%',
              marginBottom: 5,
              marginTop: 5,
              alignSelf: 'center',
              borderRadius: 8,
              borderWidth: 0.5,
              borderColor: '#d6d7da',
              overflow: 'hidden',
              elevation: 4
            }}>
              <Image source={require('../../Image/abujastore.png')} style={{ flex: 1, height: null, width: null, resizeMode: 'cover' }} />
              <View style={{ position: 'absolute', bottom: 0, zIndex: 2 }}>
                <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', margin: 10, textAlign: 'center' }}>ABUJA STORE</Text>
              </View>
              <View style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, opacity: 0.3, backgroundColor: '#000' }}>

              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this._handleOpenWithLinkingenugu()}>
            <View style={{
              flex: 1, borderRadius: 20, height: 150, width: '95%',
              marginBottom: 5,
              marginTop: 5,
              alignSelf: 'center',
              borderRadius: 8,
              borderWidth: 0.5,
              borderColor: '#d6d7da',
              overflow: 'hidden',
              elevation: 4
            }}>
              <Image source={require('../../Image/enugu.png')} style={{ flex: 1, height: null, width: null, resizeMode: 'cover' }} />
              <View style={{ position: 'absolute', bottom: 0, zIndex: 2 }}>
                <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', margin: 10, textAlign: 'center' }}>ENUGU STORE</Text>
              </View>
              <View style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, opacity: 0.3, backgroundColor: '#000' }}>

              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>


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




