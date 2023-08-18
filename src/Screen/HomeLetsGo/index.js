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
import container from "../../Styles/Container/style";
import style from "./style";
import Button from "../../Component/Button/index";
import Back from "../../Component/Back/index";
import PolylineDirection from '@react-native-maps/polyline-direction';
import { withOrientation } from "react-navigation";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getDistance, getPreciseDistance } from 'geolib';
import Spinner from 'react-native-loading-spinner-overlay';

var plat = 0, plong = 0, dlat = 0, dlong = 0
var daddress = null, pstreet = null

var origin = null, destination = null

// import { Container } from './styles';
export default class index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            address: null,
            lat: 0,
            lng: 0,
            city: null,
            pickupCity: null,
            pickupState: null,
            stateName: null,
            price: null,
            duration: "",
            distance: "",
            spinner: true
        }




    }




    async componentDidMount() {
        this._retrieveData()
        this._loadData()

    }

    /*

    getPrice = async () => {
        fetch('https://expressalllogistics.com/logistics/getpric.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({

                ddeliveryCity: this.state.city,
                ddeliveryState: this.state.stateName,
                ppickupCity: this.state.pickupCity,
                ppickupState: this.state.pickupState

            })


        }).then((response) => response.json())
            .then((responseJson) => {




                // If server response message same as Data Matched


                //Then open Profile activity and send user email to profile activity.
                //this.props.navigation.navigate('Second', { Email: UserEmail });

                var pprice = responseJson.Tripcode;

                if (pprice > 1) {
                    // alert(price)



                    this.setState({
                        price: pprice
                    }, () => {

                        this._storePrice()

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


    getAdds(data) {
        console.log("add", data);
        this.setState(
            {
                address: data.formatted_address, // selected address
                lat: data.geometry.location.lat,//  selected coordinates latitude
                lng: data.geometry.location.lng, //  selected coordinates longitute
                // city: data.address_components.filter(x => x.types.filter(t => t == 'administrative_area_level_1').length > 0)[0].short_name
                stateName: data.address_components.filter(x => x.types.filter(t => t == 'administrative_area_level_1').length > 0)[0].long_name,
                city: data.address_components[1].long_name,


            }




        );

        this._storelocation()

        this._storeData()

        //this.getPrice();

        // this._loadData()

        this._loadDatad()

        console.log("this.state.address", this.state.address); ///to console address
        console.log("this.state.coordinates", this.state.lat, this.state.lng); /// to console coordinates
        console.log("Destination City Name" + " " + this.state.city)
        console.log("Destination State Name" + " " + this.state.stateName)
        console.log("Pick up City Name" + " " + this.state.pickupCity)
        console.log("Pick up State Name" + " " + this.state.pickupState)


        this._getPreciseDistance()

    }

    _retrieveData = async () => {
        try {
            //const value = await AsyncStorage.getItem('@CityNameDestination');
            const pickup = await AsyncStorage.getItem('@CityName');
            //const valuemobile = await AsyncStorage.getItem('@setMobile');
            const pickupstate = await AsyncStorage.getItem('@PickUpState');

            if (pickup !== null) {
                // We have data!!
                // console.log("City Destination name is " + value);
                //console.log("City name is " + valuemobile);
                console.log("Pick up State " + pickupstate);
                console.log("Pick up City " + pickup);

                this.setState({ pickupCity: pickup })
                this.setState({ pickupState: pickupstate })
            }


        } catch (error) {
            // Error retrieving data
            console.log("City bame us null");
        }
    };


    processColor = async () => {

        if (this.state.lat === 0) {
            alert("Please enter Drop Off Location")
        }

        else {

            try {


                this.props.navigation.navigate('BookingReqUp', { platitude: plat, plongitude: plong, dlatitude: dlat, dlongitude: dlong, deaddress: daddress, pestreet: pstreet })

            }
            catch (error) {
                console.log("Error saving data")
            }


        }
    }

    _storeData = async () => {
        try {
            await AsyncStorage.setItem(
                '@CityNameDestination',
                this.state.city
            );


        }
        catch (error) {
            // Error saving data
            console.log("Error saving Data")
        }


        try {
            await AsyncStorage.setItem(
                '@addressDestination',
                this.state.address
            );


        }
        catch (error) {
            // Error saving data
            console.log("Error saving Data")
        }


    };





    _storelocation = async () => {



        try {
            await AsyncStorage.setItem(
                '@dstatename',
                this.state.stateName
            );


        }
        catch (error) {
            // Error saving data
            console.log("Error saving Data")
        }
    };





    _storeDistance = async () => {
        try {

            await AsyncStorage.setItem(
                '@distance',
                this.state.distance
            );


        }
        catch (error) {
            // Error saving data
            console.log("Distance is null")
        }
    };




    _storeDuration = async () => {
        try {

            await AsyncStorage.setItem(
                '@duration',
                this.state.duration
            );


        }
        catch (error) {
            // Error saving data
            console.log("Duration is null")
        }
    };



    getDistanceOneToOne(lat1, lng1, lat2, lng2) {
        const Location1Str = lat1 + "," + lng1;
        const Location2Str = lat2 + "," + lng2;

        let ApiURL = "https://maps.googleapis.com/maps/api/distancematrix/json?";

        let params = `origins=${Location1Str}&destinations=${Location2Str}&key=AIzaSyDLPAO7vS1AUtpwNwi1wQjXgTWmYUVsxP4`; // you need to get a key
        let finalApiURL = `${ApiURL}${encodeURI(params)}`;


        if (this.state.lat === 0) {


        }
        else {

            (async () => {

                let fetchResult = await fetch(finalApiURL); // call API
                let Result = await fetchResult.json(); // extract json


                // console.log(Result.rows["0"].elements["0"].duration.text)

                this.setState({ distance: Result.rows["0"].elements["0"].distance.text })

                this._storeDistance()

                this.setState({ duration: Result.rows["0"].elements["0"].duration.text })

                this._storeDuration()

                console.log("The Duration" + this.state.duration)

                console.log("The Distance" + this.state.distance)

                return Result.rows["0"].elements["0"].duration.text;

            })();

        }

    }


    _loadData = () => {

        plat = this.props.navigation.state.params.platitude
        plong = this.props.navigation.state.params.plongitude

        daddress = this.state.address ? this.state.address : null
        pstreet = this.props.navigation.state.params.pstreet

        origin = { latitude: plat, longitude: plong };
        this.setState({
            spinner: false
        }, () => {
        })

    }

    _loadDatad = () => {

        dlat = this.state.lat
        dlong = this.state.lng

        destination = { latitude: dlat, longitude: dlong };
    }

    _getPreciseDistance = () => {

        const plat = this.props.navigation.state.params.platitude
        const plong = this.props.navigation.state.params.plongitude
        /*
       

        var pdis = getPreciseDistance(
            { latitude: plat, longitude: plong },
            { latitude: this.state.lat, longitude: this.state.lng }
        );
        alert(`Precise Distance\n${pdis} Meter\nor\n${pdis / 1000} KM`);

        */

        if (this.state.lat === 0) {


        }
        else {
            this.getDistanceOneToOne(plat, plong, this.state.lat, this.state.lng)
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
                    initialRegion={{
                        latitude: plat,
                        longitude: plong,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}>



                    <Marker
                        coordinate={{
                            latitude: plat,
                            longitude: plong
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
                            latitude: dlat,
                            longitude: dlong
                        }}
                        title="Drop Off"
                    >
                        <Text style={{ backgroundColor: '#008000', fontWeight: 'bold', padding: 25, color: '#fff', borderRadius: 150, marginVertical: 10 }}>{this.state.duration}</Text>
                        <Text style={{ backgroundColor: '#fff', fontWeight: 'bold', padding: 7, textAlign: "center" }}>Drop Off</Text>
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





                <GooglePlacesAutocomplete
                    placeholder="Enter Drop Off Location"
                    placeholderTextColor="#333"
                    onPress={(data, details) => {
                        console.log(data, details);

                        var data = details;
                        this.getAdds(data);
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
                            height: 50,
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

                <Back onPress={() => this.props.navigation.goBack()} style={{ marginVertical: -90 }} />
                <View style={style.subContainerView}>

                    <Button
                        onPress={() => this.props.navigation.navigate('BookingReqUp', { platitude: plat, plongitude: plong, dlatitude: dlat, dlongitude: dlong, deaddress: daddress, pestreet: pstreet })}
                        onPress={() => this.processColor()}
                        Text="Let's Go"
                        viewStyle={{ margin: 0, borderRadius: 0, width: width }}
                    />
                </View>

            </View>
        );
    }
}