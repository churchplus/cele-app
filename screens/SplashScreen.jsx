import { StyleSheet, Text, View, SafeAreaView, Image, ActivityIndicator, ImageBackground, Animated, Easing, Alert, Linking, BackHandler, StatusBar } from 'react-native'
import React, { useEffect, useRef } from 'react'
// import Icon from 'react-native-vector-icons/FontAwesom e';
import { COLORS, width, height, Fonts } from '../assets/Theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setChurch } from '../redux/userSlice';
import { login } from '../redux/userSlice'
import { setUserAuthToken } from '../backendapi/index';
import { useIsFocused } from "@react-navigation/native";
import usePushNotification from '../utils/usePushNotification';
import VersionCheck from 'react-native-version-check';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import CustomStatusBar from './reusables/StatusBar';

const logo = require("../assets/img/cct_logo.png");

const SplashScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const rotationValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (isFocused) {
            checkVersion()
        }
    }, [isFocused])
    const { subscribeTopic } = usePushNotification();

    const fetchData = async () => {
        try {
            // await COLORS.setPrimary();
            const value = await AsyncStorage.getItem("church")
            if (value) {
                const parsedChurchInfo = JSON.parse(value)

                // Subscribe to push notification topics
                const mediaTopic = `media${parsedChurchInfo.tenantId}`
                const feedTopic = `feed${parsedChurchInfo.tenantId}`
                subscribeTopic(mediaTopic);
                subscribeTopic(feedTopic);

                // Save churchInfo to redux state
                dispatch(setChurch(parsedChurchInfo))

                const user = await AsyncStorage.getItem("user")
                if (user) {
                    const userInfo = JSON.parse(user)
                    dispatch(login(userInfo))
                    setUserAuthToken(userInfo.token)
                    setTimeout(() => {
                        navigation.navigate("MainHeaderTabs")
                    }, 3000);
                } else {
                    setTimeout(() => {
                        navigation.navigate("Login")
                    }, 3000);
                }
            } else {
                setTimeout(() => {
                    navigation.navigate("First")
                }, 3000);
            }
            // setData(JSON.parse(value) || initialValue)
        } catch (error) {
            console.error(`useAsyncStorage getItem} error:`, error)
        }
    }




    const checkVersion = async () => {
        try {
            let updateNeeded = await VersionCheck.needUpdate();
            if (updateNeeded && updateNeeded.isNeeded) {
                Alert.alert(
                    'Update Available',
                    'You will have to update your app to the latest version to continue using it 🙂',
                    [
                        {
                            text: 'Update',
                            onPress: () => {
                                BackHandler.exitApp();
                                Linking.openURL(updateNeeded.storeUrl)
                                    .catch(err => {
                                        console.error('Error opening the App Store: ', err);
                                    });
                            }
                        }
                    ],
                    { cancelable: false })
            } else {
                fetchData()
            }
        } catch (error) {
            console.log('error')
        }
    }

    return (
        <>
            {/* <StatusBar backgroundColor={'white'} translucent={true}  /> */}
            <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
                <CustomStatusBar backgroundColor={'transparent'} translucent={true} barStyle={'light-content'}  />
                    <View style={{ alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                        <Image source={require("../assets/img/splash_image.png")} style={{ width: 200, height: 200 }} resizeMode='contain' />
                    </View>
            </SafeAreaView>
        </>
    )
}

export default SplashScreen

const styles = StyleSheet.create({})