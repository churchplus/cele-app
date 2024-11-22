import * as React from 'react';
import { Text, TouchableOpacity, View, useWindowDimensions, StatusBar, Image, Platform } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import FirstScreen from './FirstScreen';
import SecondScreen from './SecondScreen';
import ThirdScreen from './ThirdScreen';
import { COLORS, Fonts, height, width } from '../../assets/Theme';
import { Checkbox, Snackbar, TouchableRipple } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setChurch } from '../../redux/userSlice';
import usePushNotification from '../../utils/usePushNotification';
import CustomStatusBar from '../reusables/StatusBar';
import { tenantId } from '../../utils/config';
import ArrowBendLeftIcon from '../../assets/img/ArrowBendUpRight.png'


const renderScene = SceneMap({
    first: FirstScreen,
    second: SecondScreen,
    third: ThirdScreen,
});

export default function OnboardTabs({ navigation }) {
    const layout = useWindowDimensions();
    const dispatch = useDispatch()
    const { subscribeTopic } = usePushNotification();
    const [intervalId, setIntervalId] = React.useState(null);
    const [displaySnack, setDisplaySnack] = React.useState(false)

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'First' },
        { key: 'second', title: 'Second' },
        { key: 'third', title: 'Third' },
    ]);


    React.useEffect(() => {
        // Start auto-swiping tabs
        // const id = setInterval(() => {
        //     // Calculate next index, looping back to 0 if at the end
        //     const nextIndex = (index + 1) % routes.length;
        //     setIndex(nextIndex);
        // }, 3000); // Change 5000 to the desired interval in milliseconds

        // Save the interval ID for cleanup
        // setIntervalId(id);

        // Clear the interval when the component unmounts
        // return () => 
        //clearInterval(id);
    }, [index]); // Include index in the dependencies to trigger effect on index change


    const proceed = async (type) => {
        // clearInterval(intervalId);

        // Subscribe to push notification topics
        const mediaTopic = `media${tenantId}`
        const feedTopic = `feed${tenantId}`
        subscribeTopic(mediaTopic);
        subscribeTopic(feedTopic);

        try {
            await AsyncStorage.setItem("church", JSON.stringify({ tenantId }))
        } catch (error) {
            console.error(`useAsyncStorage setItem error:`, error)
        }

        // Save church details to state
        dispatch(setChurch({ tenantId }))
        type === 1 ? navigation.navigate("Login") : navigation.navigate("Register")
    }

    return (
        <View style={{}}>
            {/* <StatusBar translucent={true}  barStyle="light-content" /> */}
            <CustomStatusBar backgroundColor={'transparent'} translucent={true} barStyle={'dark-content'} />
            <View style={{ height: '65%' }}>
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    tabBarPosition='none'
                    initialLayout={{ width: layout.width }}
                />
            </View>
            <View style={{ backgroundColor: COLORS.green, borderTopLeftRadius: 38, height: '35%' }}>
                {
                    index !== 2 ? (
                        <View style={{ top: -20, backgroundColor: COLORS.dark, marginHorizontal: 20, borderRadius: 24 }}>
                        <Text style={{ fontFamily: Fonts.semibold, fontSize: 18, color: COLORS.white, lineHeight: 30, padding: 20 }}>
                            {
                                index === 0 ? (
                                    'Nourishing and Connecting Members of Celestial Church of Christ World Wide'
                                ) : index === 1 ? (
                                    'Forum, News and Updates across all Celestial Church of Christ World Wide'
                                ) : ''
                            }
                        </Text>
                    <View style={{ alignSelf: 'center', marginBottom: 20, flexDirection: 'row', gap: 5 }}>
                        <View style={{ height: 10, width: 10, backgroundColor: index == 0 ? '#E9FFCE' : '#9B9C99', borderRadius: 8 }}></View>
                        <View style={{ height: 10, width: 10, backgroundColor: index === 0 ? '#9B9C99' : '#E9FFCE', borderRadius: 8 }}></View>
                    </View>
                </View>
                    ) : (
                        <View>
                            <Text style={{ color: COLORS.dark, textAlign: 'center', marginTop: 30, fontFamily: Fonts.bold, fontSize: 18 }}>Get Started</Text>
                            <TouchableRipple rippleColor="rgba(0, 0, 0, 0.1)" borderLess={true} style={{ backgroundColor: COLORS.dark, borderRadius: 50, marginTop: 20, paddingVertical: 20, marginHorizontal: 20 }} onPress={() => proceed(1)}>
                                <Text style={{ textAlign: 'center', fontFamily: Fonts.semibold, color: COLORS.white }}>Login to my account</Text>
                            </TouchableRipple>

                            <TouchableRipple rippleColor="rgba(0, 0, 0, 0.1)" borderLess={true} style={{ backgroundColor: COLORS.primary, borderRadius: 50, marginTop: 15, paddingVertical: 20, marginHorizontal: 20 }} onPress={() => proceed(2)}>
                                <Text style={{ textAlign: 'center', fontFamily: Fonts.semibold, color: COLORS.white }}>Create new account</Text>
                            </TouchableRipple>
                        </View>
                    )
                }
                {/* <View style={{ flexDirection: "row", paddingHorizontal: 20, justifyContent: "space-between", width: width - 30 }}>
                    {
                        Platform.OS == 'ios' ? (
                            <View style={{ borderRadius: 50, borderColor: COLORS.white, borderWidth: 2, width: 40, height: 40, transform: [{ scale: 0.65 }], flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Checkbox
                                    status={checked ? 'checked' : 'unchecked'}
                                    color={'#ffffff'}
                                    onPress={() => {
                                        setChecked(!checked);
                                    }}
                                    style={{ padding: 0, margin: 0 }}
                                />
                            </View>

                        ) : (
                            <Checkbox
                                status={checked ? 'checked' : 'unchecked'}
                                color={'#FFFFFF'}
                                uncheckedColor='#FFFFFF'
                                onPress={() => {
                                    setChecked(!checked);
                                }}
                                style={{ padding: 0, margin: 0 }}
                            />
                        )
                    }
                    <Text style={{ fontFamily: Fonts.regular, color: "white", fontSize: 10, marginBottom: 10 }}>
                        By Creating account, you are giving OLHRC CIWA Right to use your information Lawfully and also Agree to our Terms and Conditions.
                    </Text>
                </View> */}
                {/* <TouchableRipple rippleColor="rgba(0, 0, 0, 0.1)" borderLess={true} style={{ backgroundColor: COLORS.accent, borderRadius: 15, marginTop: 10, paddingVertical: 15, marginHorizontal: 20 }} onPress={proceed}>
                    <Text style={{ textAlign: 'center', fontFamily: Fonts.semibold, color: COLORS.white }}>Get Started</Text>
                </TouchableRipple> */}
                {
                    index !== 2 && (
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 20, marginTop: 20 }}>
                            <TouchableOpacity onPress={() => setIndex(2)}>
                            <Text style={{ fontSize: 20, fontFamily: Fonts.regular, color: '#2D2D2E' }}>Skip</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setIndex(index + 1)} style={{ borderRadius: 50, backgroundColor: '#312177', width: 74, height: 74, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={ArrowBendLeftIcon} style={{ width: 30 }} resizeMode='contain' />
                            </TouchableOpacity>
                        </View>
                    )
                }
            </View>
        </View>
    );
}