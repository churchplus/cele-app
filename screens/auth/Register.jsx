import { ActivityIndicator, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, StatusBar, ImageBackground, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Onboard, RegisterUser } from '../../services/service';
import { useSelector } from 'react-redux';
import { COLORS, Fonts, height } from '../../assets/Theme';
import { Snackbar, TouchableRipple } from 'react-native-paper';
import Input from '../reusables/Input';
import { setUserAuthToken } from '../../backendapi/index';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch } from 'react-redux'
import { login } from '../../redux/userSlice'
import LinearGradient from 'react-native-linear-gradient';
import { Button } from "react-native-paper";

const Register = ({ navigation }) => {
    const dispatch = useDispatch();
    const info = useSelector((state) => state.user.churchInfo);
    const [name, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [loading, setLoading] = useState(false)
    const [displaySnack, setDisplaySnack] = useState(false)
    const [responseMessage, setResponseMessage] = useState("")
    const [successInfo, setSuccessInfo] = useState(false)
    const [passwordVisibility, setpasswordVisibility] = useState(true)
    const first = require("../../assets/img/imgbg3.png");


    const handleSubmit = async () => {
        const model = {
            name,
            // userId: "00000000-0000-0000-0000-000000000000",
            email,
            tenantID: info?.tenantId,
            password,
            phoneNumber
        }

        if (!name || !email || !password) {
            setDisplaySnack(true)
            setResponseMessage("Kindly fill in all fields")
            return;
        }
        setLoading(true)
        await RegisterUser(model).then((response) => {
            setLoading(false);
            if (!response?.data?.returnObject) {
                setDisplaySnack(true)
                setResponseMessage("🙂  This email already exist, instead login with it");
                return;
            }
            if (response.data.status) {
                AsyncStorage.setItem("user", JSON.stringify(response.data.returnObject.value.returnObject))
                dispatch(login(response.data.returnObject.value.returnObject))
                setUserAuthToken(response.data.returnObject.value.returnObject.token)
                setSuccessInfo(true)
                setDisplaySnack(true)
                setResponseMessage("🎉   Your registration is successful.")
                setTimeout(() => {
                    navigation.navigate("MainHeaderTabs")
                }, 1000);
            }
        }).catch(err => console.log(err))
            .finally(() => setLoading(false))
    }
    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
                <ScrollView showsVerticalScrollIndicator={false}>
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
                                    <Text style={styles.loginheader}>Get started</Text>
                                    <Text style={styles.welcome}>Welcome to Celestial family</Text>
                                </View>
                                <Image source={require("../../assets/img/splash_image.png")} style={{ width: 150, height: 100 }} resizeMode='contain' />
                            </View>
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <View style={styles.formControl}>
                                <Text style={{ color: COLORS.dark, fontFamily: Fonts.semibold, fontSize: 16, marginBottom: 5 }}>Name</Text>
                                <Input placeholder="Full Name" onChangeText={setFullName} outlineStyle={{ borderWidth: 0 }} style={{ backgroundColor: '#DCDCDC' }} value={name} />
                            </View>
                            <View style={styles.formControl}>
                                <Text style={{ color: COLORS.dark, fontFamily: Fonts.semibold, fontSize: 16, marginBottom: 5 }}>Email</Text>
                                <Input placeholder="Your Email" onChangeText={setEmail} value={email} outlineStyle={{ borderWidth: 0 }} style={{ backgroundColor: '#DCDCDC' }} />
                            </View>
                            <View style={styles.formControl}>
                                <Text style={{ color: COLORS.dark, fontFamily: Fonts.semibold, fontSize: 16, marginBottom: 5 }}>Password</Text>
                                <Input placeholder="Password" onChangeText={setPassword} value={password} outlineStyle={{ borderWidth: 0 }} style={{ backgroundColor: '#DCDCDC' }} iconRight={'eye'} secureTextEntry={passwordVisibility} setpasswordVisibility={() => setpasswordVisibility(!passwordVisibility)} />
                            </View>
                            <Button textColor="#FFFFFF" loading={loading} buttonColor={COLORS.primary} style={{ marginTop: 50, marginHorizontal: 20, borderRadius: 50 }} contentStyle={{ paddingVertical: 8 }} onPress={handleSubmit} mode="contained">
                                <Text style={{ fontSize: 14, fontFamily: Fonts.semibold, marginVertical: 20 }}>Register</Text>
                            </Button>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                                <Text style={{ fontFamily: Fonts.medium, color: COLORS.black }}>Already a member?</Text>
                                <Button mode="text" textColor={COLORS.primary} onPress={() => navigation.navigate("Login")}>
                                    <Text style={{ fontFamily: Fonts.bold }}>Login</Text>
                                </Button>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
            <Snackbar
                visible={displaySnack}
                duration={4000}
                style={{ backgroundColor: successInfo ? "#3CBF98" : "#000000" }}
                onDismiss={() => setDisplaySnack(false)}
            >
                <Text style={{ color: "#FFFFFF" }}>{responseMessage}</Text>
            </Snackbar>
        </>
    )
}

export default Register

const styles = StyleSheet.create({
    formControl: {
        marginHorizontal: 20,
        marginTop: 20
    },
    container: {
        elevation: 2,
        height: 170,
        width: 170,
        backgroundColor: '#efefef',
        position: 'relative',
        borderRadius: 999,
        overflow: 'hidden',
    },
    uploadBtnContainer: {
        opacity: 0.7,
        position: 'absolute',
        right: 0,
        bottom: 0,
        backgroundColor: 'lightgrey',
        width: '100%',
        height: '25%',
    },
    uploadBtn: {
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center'
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