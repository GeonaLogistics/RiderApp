import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Spinner from 'react-native-loading-spinner-overlay';

import { useTheme } from 'react-native-paper';

import { AuthContext } from '../../Component/context';



const SignInScreen = ({ navigation }) => {

    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
        spinner: false,
    });

    const { colors } = useTheme();

    // const { signIn } = React.useContext(AuthContext);

    const textInputChange = (val) => {
        if (val.trim().length == 11) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if (val.trim().length >= 8) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidUser = (val) => {
        if (val.trim().length == 11) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });
        }
        else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

    const loginHandle = async (userName, password) => {
        /*
        const foundUser = Users.filter(item => {
            return userName == item.username && password == item.password;
        });
*/
        if (data.username.length == 0 || data.password.length == 0) {
            Alert.alert('Wrong Input!', 'Phone or password cannot be empty.', [
                { text: 'Okay' }
            ]);
            return;
        }
        else {

            setData({
                ...data,
                spinner: true,
            });


            try {

                //api connection to login users

                fetch('https://expressalllogistics.com/logistics/hybridloginagent.php', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({

                        mobile: userName,
                        password: password

                    })

                }).then((response) => response.json())
                    .then((responseJson) => {

                        setData({
                            ...data,
                            spinner: false,
                        });


                        var user_id = responseJson.Tripcode;

                        //var success = responseJson.Success;





                        console.log(user_id)
                        //console.log(this.state.firstname)

                        // If server response message same as Data Matched
                        if (user_id === 1) {





                            console.log("boom la ka boom")

                            _realData()

                            //if successfully logged in navigate them to home page

                            navigation.navigate("Home")

                        }
                        else if (user_id === 10) {
                            alert("Account not yet Activated")
                        }
                        else {

                            alert("Invalid account details")

                        }


                    }).catch((error) => {
                        console.error(error);
                        throw error;
                    });


            }
            catch (err) {
                Alert.alert('Application Error');
            }



        }
        /*
                if (foundUser.length == 0) {
                    Alert.alert('Invalid User!', 'Username or password is incorrect.', [
                        { text: 'Okay' }
                    ]);
                    return;
                }
                */
        //signIn(foundUser);
    }


    const _realData = async () => {
        try {
            await AsyncStorage.setItem(
                '@setMobile',
                data.username
            );
        } catch (error) {
            // Error saving data
            console.log("Error saving mobile Data")
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content" />
            <Spinner
                visible={data.spinner}
                textContent={'Signing you in...'}
                overlayColor={'rgba(0, 0, 0, 0.8)'}
                textStyle={{ color: '#FFF' }}
                cancelable={false}

            />
            <View style={styles.header}>
                <Text style={styles.text_header}>Welcome!</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
            >
                <Text style={[styles.text_footer, {
                    color: colors.text
                }]}>Phone No</Text>
                <View style={styles.action}>
                    <FontAwesome
                        name="phone"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder="e.g 080xxxxxxxx"
                        placeholderTextColor="#666666"
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        keyboardType="phone-pad"
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange(val)}
                        onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                    />
                    {data.check_textInputChange ?
                        <Animatable.View
                            animation="bounceIn"
                        >
                            <Feather
                                name="check-circle"
                                color="green"
                                size={20}
                            />
                        </Animatable.View>
                        : null}
                </View>
                {data.isValidUser ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Invalid Phone No.</Text>
                    </Animatable.View>
                }


                <Text style={[styles.text_footer, {
                    color: colors.text,
                    marginTop: 35
                }]}>Password</Text>
                <View style={styles.action}>
                    <Feather
                        name="lock"
                        color={colors.text}
                        size={20}
                    />
                    <TextInput
                        placeholder="Your Password"
                        placeholderTextColor="#666666"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => handlePasswordChange(val)}
                    />
                    <TouchableOpacity
                        onPress={updateSecureTextEntry}
                    >
                        {data.secureTextEntry ?
                            <Feather
                                name="eye-off"
                                color="grey"
                                size={20}
                            />
                            :
                            <Feather
                                name="eye"
                                color="grey"
                                size={20}
                            />
                        }
                    </TouchableOpacity>
                </View>
                {data.isValidPassword ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
                    </Animatable.View>
                }


                <TouchableOpacity onPress={() => { navigation.navigate("InviteFriends") }}>
                    <Text style={{ color: '#009387', marginTop: 15 }}>Forgot password?</Text>
                </TouchableOpacity>
                <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.signIn}
                        onPress={() => { loginHandle(data.username, data.password) }}
                    >
                        <LinearGradient
                            colors={['#08d4c4', '#01ab9d']}
                            style={styles.signIn}
                        >
                            <Text style={[styles.textSign, {
                                color: '#fff'
                            }]}>Sign In</Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignUp')}
                        style={[styles.signIn, {
                            borderColor: '#009387',
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                    >
                        <Text style={[styles.textSign, {
                            color: '#009387'
                        }]}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -10,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});