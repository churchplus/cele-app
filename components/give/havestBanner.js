import React from 'react'
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS, Fonts } from '../../assets/Theme'
import LinearGradient from 'react-native-linear-gradient'

const HarvestBanner = ({ showButton, onPress, cardStyle }) => {
    return (
        <View style={[styles.harvestcard, cardStyle]}>
            <ImageBackground source={require("../../assets/img/harvest.png")} resizeMode='contain' style={[styles.harvestimage]}>
                <LinearGradient
                    colors={['rgba(79, 87, 101, 0)', '#0B3680']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
                />
            </ImageBackground>
            <View >
                <Text style={styles.harvestheader}>Harvest and Donations</Text>
                {
                    showButton && (
                        <View style={styles.harvestcontainer}>
                            <TouchableOpacity style={styles.harvestbutton} onPress={onPress}>
                                <Text style={styles.harvestbuttontext}>Give now</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    harvestcard: {
        backgroundColor: "#7CADFF",
        padding: 10,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    harvestbutton: {
        backgroundColor: COLORS.black,
        paddingHorizontal: 20,
        paddingVertical: 7,
        marginTop: 8,
    },
    harvestbuttontext: {
        fontFamily: Fonts.semibold,
        color: COLORS.white
    },
    harvestheader: {
        fontFamily: Fonts.bold,
        color: "#1E1E1E"
    },
    harvestcontainer: {
        flexDirection: "row",
        alignSelf: "center"
    },
    harvestimage: {
        width: 150,
        height: 90,
    }
})

export default HarvestBanner