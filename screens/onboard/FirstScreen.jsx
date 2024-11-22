import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native'
import React from 'react'
import { COLORS, Fonts, height } from '../../assets/Theme';
import LinearGradient from 'react-native-linear-gradient';

const first = require("../../assets/img/imgbg1.png");

const FirstScreen = () => {

    return (
        <SafeAreaView>
            <View>
                <Image source={first} style={{ flexDirection: 'row', width: "100%", height: '100%', alignItems: 'flex-end' }} />
                    <LinearGradient
                        colors={['#F5F5F50A', '#ffffff']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1.3 }}
                        style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 200 }}
                    />
            </View>
        </SafeAreaView>
    )
}

export default FirstScreen

const styles = StyleSheet.create({})