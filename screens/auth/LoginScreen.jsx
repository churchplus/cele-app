import { ActivityIndicator, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, StatusBar, ImageBackground, Platform, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { LoginUser } from '../../services/service'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/userSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { COLORS, Fonts, height, width } from '../../assets/Theme'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Snackbar, Checkbox } from 'react-native-paper';
import Input from '../reusables/Input'
import { setUserAuthToken } from '../../backendapi/index';
import { Button } from "react-native-paper";
import { clearUserEmail, getCheckStatus, getUserEmail, storeCheckStatus, storeUserEmail } from '../../utils/storeAndGetRememberMe'
import CustomStatusBar from '../reusables/StatusBar'
import LinearGradient from 'react-native-linear-gradient';


const LoginScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [displaySnack, setDisplaySnack] = useState(false)
    const [passwordVisibility, setpasswordVisibility] = useState(true)
    const [responseMessage, setResponseMessage] = useState("")
    const [rememberMe, setrememberMe] = useState(false);
    // const [emailLoaded, setEmailLoaded] = useState(false);
    const first = require("../../assets/img/imgbg3.png");


    useEffect(() => {
        const fetchValuesFormStorage = async () => {
            try {
                const { emailValue } = await getUserEmail();
                const { checkValue } = await getCheckStatus();
                setrememberMe(checkValue);
                setEmail(emailValue);
                if (!checkValue) {
                    clearUserEmail();
                }
            } catch (error) {
                console.error('Error fetching checkValue or email:', error);
            }
        };
        fetchValuesFormStorage();
    }, []);


    const handleSubmit = async () => {

        const model = {
            email,
            password
        }

        if (!email || !password) {
            setDisplaySnack(true)
            setResponseMessage("Kindly fill in your email and pasword")
            return;
        }
        setLoading(true)
        await LoginUser(model).then((response) => {
            if (response.data.status) {
                AsyncStorage.setItem("user", JSON.stringify(response.data.returnObject))
                dispatch(login(response.data.returnObject))
                setUserAuthToken(response.data.returnObject.token)
                storeUserEmail(email);
                navigation.navigate("MainHeaderTabs")
            } else {
                setDisplaySnack(true)
                setResponseMessage(response?.data?.response)
            }
        }).catch(err => {
            console.log(err)
            setDisplaySnack(true)
            setResponseMessage("Something went wrong while login in, please check your credentials")
        }).finally(() => setLoading(false))
    }

    if (loading) {
        return (
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", height: height }}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        )
    }

    const handleCheckboxPress = async () => {
        setrememberMe(!rememberMe);
        await storeCheckStatus(!rememberMe);
    };


    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
                <ScrollView>
                    <View>
                        <View>
                            <LinearGradient
                                colors={['#8FFA08', '#ffffff']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 200 }}
                            />

                            <View style={styles.headerwrapper}>
                                <View>
                                    <Text style={styles.loginheader}>Login</Text>
                                    <Text style={styles.welcome}>Welcome to Celestial family</Text>
                                </View>
                                <Image source={require("../../assets/img/splash_image.png")} style={{ width: 150, height: 100 }} resizeMode='contain' />
                            </View>
                        </View>
                        <View style={{ marginTop: 70 }}>
                            <View style={styles.formControl}>
                                <Text style={{ color: COLORS.dark, fontFamily: Fonts.semibold, fontSize: 16, marginBottom: 5 }}>Email</Text>
                                <Input placeholder="Email address" onChangeText={setEmail} value={email} outlineStyle={{ borderWidth: 0 }} style={{ backgroundColor: '#DCDCDC' }} />
                            </View>
                            <View style={{ ...styles.formControl, marginTop: 20 }}>
                                <Text style={{ color: COLORS.dark, fontFamily: Fonts.semibold, fontSize: 16, marginBottom: 5 }}>Password</Text>
                                <Input placeholder="Password" onChangeText={setPassword} value={password} outlineStyle={{ borderWidth: 0 }} style={{ backgroundColor: '#DCDCDC' }} iconRight={'eye'} secureTextEntry={passwordVisibility} setpasswordVisibility={() => setpasswordVisibility(!passwordVisibility)} />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginRight: 15, marginTop: 10 }}>
                                <View style={{ ...styles.formControl, flexDirection: "row", alignItems: 'center', gap: 1 }}>
                                    {
                                        Platform.OS === 'ios' ? (
                                            <View style={{ borderRadius: 50, borderWidth: 1, borderColor: COLORS.primary, width: 40, height: 40, transform: [{ scale: 0.65 }], flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                <Checkbox
                                                    status={rememberMe ? 'checked' : 'unchecked'}
                                                    color={COLORS.primary}
                                                    onPress={handleCheckboxPress}
                                                    style={{ padding: 0, margin: 0 }}
                                                />
                                            </View>
                                        ) : (
                                            <Checkbox
                                                status={rememberMe ? 'checked' : 'unchecked'}
                                                color={COLORS.primary}
                                                onPress={handleCheckboxPress}
                                            />
                                        )
                                    }
                                    <Text style={{ fontFamily: Fonts.medium, fontSize: 13, color: COLORS.black }}>Remember me?</Text>
                                </View>
                                {/* Check ForgotPassword.jsx to know what type params means :) */}
                                <Button mode="text" textColor={COLORS.black} onPress={() => navigation.navigate("ForgotPassword", { type: 1 })}>
                                    <Text style={{ fontFamily: Fonts.medium, fontSize: 13 }}>Forgot password</Text>
                                </Button>
                            </View>

                            <Button textColor="#FFFFFF" buttonColor={COLORS.primary} style={{ marginTop: 50, marginHorizontal: 20, borderRadius: 50 }} contentStyle={{ paddingVertical: 8 }} onPress={handleSubmit} mode="contained">
                                <Text style={{ fontSize: 14, fontFamily: Fonts.semibold, marginVertical: 20 }}>Login to my account</Text>
                            </Button>

                            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: 'center', marginHorizontal: 20, marginTop: 20, marginBottom: 20 }}>
                                <Text style={{ fontFamily: Fonts.medium, color: COLORS.black, fontSize: 13 }}>New here?</Text>
                                <Button mode="text" textColor={COLORS.primary} onPress={() => navigation.navigate("Register")}>
                                    <Text style={{ fontFamily: Fonts.bold }}>Sign Up</Text>
                                </Button>
                                {/* <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity onPress={() => navigation.navigate("MainHeaderTabs")}>
                                    <Text style={{ fontFamily: Fonts.medium, color: COLORS.black, fontSize: 13 }}>Skip to feeds</Text>
                                </TouchableOpacity>
                            </View> */}
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
            <TouchableOpacity style={{ backgroundColor: COLORS.white, paddingVertical: 20, flexDirection: "row", justifyContent: "center", alignItems: "center", borderTopColor: Platform.OS === 'ios' ? '#eee' : "transparent", borderWidth: Platform.OS === "ios" ? 1 : 0 }} onPress={() => navigation.navigate("MainHeaderTabs")}>
                <Text style={{ textAlign: 'center', fontFamily: Fonts.regular, fontWeight: "700", color: COLORS.black, marginRight: 5 }}>Skip to feeds</Text>
                <Icon name={"arrow-forward-ios"} size={10} />
                <Icon name={"arrow-forward-ios"} size={10} />
                <Icon name={"arrow-forward-ios"} size={10} />
            </TouchableOpacity>
            <Snackbar
                visible={displaySnack}
                duration={4000}
                style={{ backgroundColor: "#000000" }}
                onDismiss={() => setDisplaySnack(false)}
            >
                <Text style={{ color: "#FFFFFF" }}>{responseMessage}</Text>
            </Snackbar>
        </>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    formControl: {
        marginHorizontal: 20,
    },
    headerwrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 30,
        paddingBottom: 10,
        alignItems: 'flex-end',
        paddingHorizontal: 20
    },
    loginheader: {
        color: COLORS.black,
        fontSize: 20,
        fontFamily: Fonts.bold,
    },
    welcome: {
        color: COLORS.black,
        fontFamily: Fonts.regular,
        fontSize: 13,
        marginBottom: 10
    }
})