import React, { Component } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import MapView, { Marker } from 'react-native-maps';
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
import Back from "../../Component/Back/index";
import container from "../../Styles/Container/style";
import style from "./style";
import Button from "../../Component/Button/index";
import PolylineDirection from '@react-native-maps/polyline-direction';
import { withOrientation } from "react-navigation";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getDistance, getPreciseDistance } from 'geolib';
import Spinner from 'react-native-loading-spinner-overlay';


var plats = 0, plongs = 0

var daddress = null

// import { Container } from './styles';
export default class index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            address: null,
            plat: 0,
            plong: 0,
            lat: 0,
            lng: 0,
            city: null,
            pickupCity: null,
            pickupState: null,
            stateName: null,
            spinner: true,

            region: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            }

        }




    }


    componentDidMount() {
        this._loadData();

    }

    getAdd(datas) {
        console.log("add", datas);



        this.setState({
            address: datas.formatted_address, // selected address
            plat: datas.geometry.location.lat,//  selected coordinates latitude
            plong: datas.geometry.location.lng, //  selected coordinates longitute
            // city: data.address_components.filter(x => x.types.filter(t => t == 'administrative_area_level_1').length > 0)[0].short_name
            stateName: datas.address_components.filter(x => x.types.filter(t => t == 'administrative_area_level_1').length > 0)[0].long_name,
            city: datas.address_components[1].long_name,
        }, () => {

        })







        this._storeData()

        this._loadData()


    }


    _loadData = () => {

        const pplat = this.props.navigation.state.params.platitude
        const pplongs = this.props.navigation.state.params.plongitude
        const pstreet = this.props.navigation.state.params.pstreet


        plats = this.state.plat ? this.state.plat : pplat
        plongs = this.state.plong ? this.state.plong : pplongs

        daddress = this.state.address ? this.state.address : pstreet



        // const origin = { latitude: plats, longitude: plongs };
        //const destination = { latitude: dlat, longitude: dlong };
        /*
                const origin = {
                    latitude: this.state.plat ? this.state.plat : pplat, longitude: this.state.plong ? this.state.plong : pplongs, latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                };
        */

        this.setState({
            spinner: false,
            origin: {
                latitude: this.state.plat ? this.state.plat : pplat,
                longitude: this.state.plong ? this.state.plong : pplongs,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            }

        }, () => {

        })
    }


    _storeData = async () => {
        try {
            await AsyncStorage.setItem(
                '@PickUpAddress',
                this.state.address
            );


        }
        catch (error) {
            // Error saving data
            console.log("Error saving Data")
        }

        try {
            await AsyncStorage.setItem(
                '@PickUpState',
                this.state.stateName
            );


        }
        catch (error) {
            // Error saving data
            console.log("Error saving Data")
        }



        try {
            await AsyncStorage.setItem(
                '@CityName',
                this.state.city
            );


        }
        catch (error) {
            // Error saving data
            console.log("Error saving Data")
        }


    };








    render() {






        return (

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
                    zoomEnabled={true}
                    initialRegion={this.state.origin}
                    onMapReady={this.onMapReady}
                    onRegionChangeComplete={this.onRegionChange}
                    region={this.state.origin}
                >


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


                </MapView>





                <GooglePlacesAutocomplete
                    placeholder="Enter New Pick up Location"
                    placeholderTextColor="#333"
                    onPress={(datas, details) => {
                        console.log(datas, details);

                        var datas = details;
                        this.getAdd(datas);
                        moveToUserLocation: true
                    }}
                    query={{
                        key: "AIzaSyDLPAO7vS1AUtpwNwi1wQjXgTWmYUVsxP4",
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
                            borderBottomWidth: 0,

                        },
                        textInput: {
                            height: 54,
                            margin: 0,
                            borderRadius: 0,
                            paddingTop: 0,
                            paddingBottom: 0,
                            paddingLeft: 50,
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
                            fontSize: 18,

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
                            height: 65
                        }
                    }}
                />

                <Back onPress={() => this.props.navigation.goBack()} />
                <View style={style.subContainerView}>
                    <Button
                        onPress={() => this.props.navigation.navigate('HomeLetsGo', { platitude: plats, plongitude: plongs })}

                        Text="Set Destination Location"
                        viewStyle={{ margin: 0, borderRadius: 0, width: width }}
                    />
                </View>

            </View>
        );
    }
}