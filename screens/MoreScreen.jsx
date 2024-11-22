import { StyleSheet, Text, View, SafeAreaView, Image, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, Fonts } from '../assets/Theme'
import { TouchableRipple, Divider, Badge } from "react-native-paper"
import { BagIcon, BibleIcon, GivingMoney, LocationPin, LogoutIcon, PlayIcon, PledgeIcon, PowerSwitch, ShoppingCart } from '../assets/img/icons'
import { SwipeModal } from './reusables/Modal'
import UpcomingEvent from './event/UpcomingEvent'
import { ChurchProfile, YouTubeChannelVideoDetails, YouTubeChannelVideoIds } from '../services/dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { clearChurch } from '../redux/userSlice';
import { logout } from '../redux/userSlice';
import usePushNotification from '../utils/usePushNotification'


const MoreScreen = ({ closeNav }) => {
    const dispatch = useDispatch();
    const [eventModal, setEventModal] = useState(false)
    const churchInfo = useSelector((state) => state.user.churchInfo);
    const userInfo = useSelector((state) => state.user.userInfo);
    const churchMedia = useSelector((state) => state.user.churchMedia);
    const navigation = useNavigation();
    useEffect(() => {
        // getChurchProfile();
    }, [])
    const { unsubscribeFromTopic } = usePushNotification();

    const routeToliveStream = () => {
        closeNav();
        setTimeout(() => {
            navigation.navigate("ViewVideoDetails", { data: churchMedia[0], videoDetails: churchMedia })
        }, 500);
    }

    const routeToProfile = () => {
        closeNav();
        setTimeout(() => {
            navigation.navigate("ProfileScreen")
        }, 500);
    }

    const routeToGiving = () => {
        closeNav();
        setTimeout(() => {
            navigation.navigate("Give")
        }, 500);
    }

    const routeToDevotional = () => {
        closeNav();
        setTimeout(() => {
            navigation.navigate("DevotionalLibrary")
        }, 500);
    }
    const routeToMyPledges = () => {
        closeNav();
        setTimeout(() => {
            navigation.navigate("MyPledges")
        }, 500);
    }

    const logOut = async () => {
        closeNav();
        await AsyncStorage.removeItem("user");
        dispatch(logout());
        setTimeout(() => {
            navigation.navigate("Login");
        }, 500);
    }


    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
                <View style={styles.sideContainer}>
                    <Text style={{ fontFamily: Fonts.extrabold, fontSize: 20, color: COLORS.black }}>Do more</Text>
                </View>
                {/* {
                    videoDetails?.length > 0 ? ( */}
                <View style={{ marginTop: 20 }}>
                    <TouchableRipple rippleColor={"rgba(223, 239, 255, 0.74)"} onPress={routeToliveStream}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 8, paddingVertical: 10, paddingLeft: 20 }}>
                            <PlayIcon size={25} />
                            <Text style={{ color: COLORS.black, fontSize: 14 }}>Live Stream</Text>
                        </View>
                    </TouchableRipple>
                </View>
                {/* ) : null
                } */}
                <View>
                    <TouchableRipple rippleColor={"rgba(223, 239, 255, 0.74)"} onPress={() => setEventModal(true)}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 8, paddingVertical: 10, paddingLeft: 20 }}>
                            <LocationPin size={25} />
                            <Text style={{ color: COLORS.black, fontSize: 14 }}>Check-in</Text>
                        </View>
                    </TouchableRipple>
                </View>
                {/* <View>
                    <TouchableRipple rippleColor={"rgba(223, 239, 255, 0.74)"} onPress={() => {}}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 8, paddingVertical: 10, paddingLeft: 20 }}>
                            <BibleIcon size={25} />
                            <Text style={{ color: COLORS.black, fontSize: 14 }}>Bible</Text>
                        </View>
                    </TouchableRipple>
                </View> */}
                <View>
                    <TouchableRipple rippleColor={"rgba(223, 239, 255, 0.74)"} onPress={routeToGiving}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 8, paddingVertical: 10, paddingLeft: 20 }}>
                            <GivingMoney size={25} />
                            <Text style={{ color: COLORS.black, fontSize: 14 }}>Giving</Text>
                        </View>
                    </TouchableRipple>
                </View>
                <Divider style={{ backgroundColor: 'rgba(2, 2, 2, 0.1)', marginVertical: 10 }} bold />
                <View>
                    <TouchableRipple rippleColor={"rgba(223, 239, 255, 0.74)"} onPress={routeToDevotional}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 10, paddingLeft: 20 }}>
                            <BagIcon size={22} />
                            <Text style={{ color: COLORS.black, fontSize: 14 }}>Devotional</Text>
                        </View>
                    </TouchableRipple>
                </View>
                {
                    userInfo?.personID ? (
                        <View>
                            <TouchableRipple rippleColor={"rgba(223, 239, 255, 0.74)"} onPress={routeToMyPledges}>
                                <View style={{ flexDirection: "row", alignItems: "center", gap: 8, paddingVertical: 10, paddingLeft: 20 }}>
                                    <PledgeIcon size={25} />
                                    <Text style={{ color: COLORS.black, fontSize: 14 }}>My pledges</Text>
                                </View>
                            </TouchableRipple>
                        </View>

                    ) : null
                }
                {/* <View>
                    <TouchableRipple rippleColor={"rgba(223, 239, 255, 0.74)"} onPress={() => {}}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 8, paddingVertical: 10, paddingLeft: 20 }}>
                            <BagIcon size={25} />
                            <Text style={{ color: COLORS.black, fontSize: 14 }}>Jobs & Offers</Text>
                            <Badge style={{ paddingHorizontal: 5}}>New</Badge>
                        </View> 
                    </TouchableRipple>
                </View> */}
                {/*  <View>
                    <TouchableRipple rippleColor={"rgba(223, 239, 255, 0.74)"} onPress={() => {}}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 8, paddingVertical: 10, paddingLeft: 20 }}>
                            <ShoppingCart size={25} />
                            <Text style={{ color: COLORS.black, fontSize: 14 }}>Media Purchase</Text>
                        </View>
                    </TouchableRipple>
                </View>
                <Divider style={{ backgroundColor: 'rgba(2, 2, 2, 0.1)', marginVertical: 10}} bold /> */}
                <View>
                    <TouchableRipple rippleColor={"rgba(223, 239, 255, 0.74)"} onPress={routeToProfile}>
                        <View style={{ flexDirection: "row", alignItems: "center", gap: 8, paddingVertical: 10, paddingLeft: 20 }}>
                            {
                                userInfo?.pictureUrl ? (
                                    <Image source={{ uri: userInfo.pictureUrl }} style={{ width: 25, height: 25, borderRadius: 50 }} />
                                ) : (
                                    <Image source={require("../assets/img/avatar.png")} style={{ width: 25, height: 25 }} />
                                )
                            }
                            <Text style={{ color: COLORS.black, fontSize: 14 }}>{userInfo?.fullname ? userInfo?.fullname : "My Profile"}</Text>
                        </View>
                    </TouchableRipple>
                </View>
                <SwipeModal visible={eventModal} closeModal={() => setEventModal(false)} direction="swipeInUp" height="80%">
                    <UpcomingEvent closeModal={() => setEventModal(false)} />
                </SwipeModal>
            </SafeAreaView>
            <View>
                <TouchableRipple rippleColor={"rgba(223, 239, 255, 0.74)"} onPress={logOut} style={{ marginBottom: 50 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 8, paddingVertical: 10, paddingLeft: 20 }}>
                        <LogoutIcon size={20} />
                        <Text style={{ color: "#FE2034", fontSize: 14 }}>{userInfo ? 'Logout' : 'Login'}</Text>
                    </View>
                </TouchableRipple>
            </View>

        </>
    )
}



export default MoreScreen

const styles = StyleSheet.create({
    sideContainer: {
        paddingTop: 20,
        paddingLeft: 20
    }
})