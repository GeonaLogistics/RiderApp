import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native'
import Swiper from 'react-native-swiper';
import styles from './style';
import Button from '../../Component/Button/index'
import Color from '../../Config/Color'
export default class index extends Component {
  render() {
    return (
      <Swiper style={styles.wrapper}
        showsButtons={false} dot={
          <View
            style={styles.deActiveDot}
          />
        }
        activeDot={
          <View
            style={styles.activeDot}
          />
        } >
        <View style={styles.slide1}>
          <ImageBackground style={styles.image} source={require('../../Image/slide1.png')}>
            <Text style={styles.text}>Ride With Geona </Text>
            <Text style={styles.contentText}>Become a Rider and Earn money with Geona Logistics App.</Text>
          </ImageBackground>
        </View>
        <View style={styles.slide2}>
          <ImageBackground style={styles.image} source={require('../../Image/slide2.png')}>
            <Text style={styles.text}>Deliver Customer Goods</Text>
            <Text style={styles.contentText}>Pickup and Deliver goods for customers with ease</Text>
          </ImageBackground>
        </View>
        <View style={styles.slide3}>
          <ImageBackground style={styles.image} source={require('../../Image/slide3.png')}>
            <Text style={styles.text}>Extra Bonsues</Text>
            <Text style={styles.contentText}>Get extra cash bonuses by completing more deliveries.</Text>

            <Button Text='GET STARTED!' viewStyle={{ marginTop: 30, backgroundColor: Color.white, marginHorizontal: 50 }}
              textStyle={{ color: Color.black }}
              onPress={() => this.props.navigation.navigate('SignIn')}
            />

          </ImageBackground>
        </View>
      </Swiper>
    )
  }
}
