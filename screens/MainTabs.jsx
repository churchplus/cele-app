import { TabsProvider, Tabs, TabScreen, useTabIndex, useTabNavigation } from 'react-native-paper-tabs';
import { AppTabs, SocTab } from '../navigation/AppTabs';
import { View, StyleSheet, StatusBar, Image } from "react-native";
import { Button, Text } from "react-native-paper";
import { COLORS, height, width } from '../assets/Theme';
import { StackHeader } from './reusables/index';
import { SocialTabs } from '../navigation/SocialTabs';
import { useEffect, useState } from 'react';
import { GetConnectedFriends } from '../services/social';
import { useSelector, useDispatch } from 'react-redux';
import ConnectionList from './socials/Connections';
import { userConnectedFriends } from '../redux/userSlice';
import NetworkConectivityStatus from './reusables/NetworkConnectivity';
import WelcomeScreen from './finance/WelcomeScreen';
import CustomStatusBar from './reusables/StatusBar';
import usePushNotification from '../utils/usePushNotification';
import LinearGradient from 'react-native-linear-gradient';

function HeaderTabs({ navigation }) {
    const userInfo = useSelector((state) => state.user.userInfo);
    const churchInfo = useSelector((state) => state.user.churchInfo);
    const { newNotification, messages, isSocialsNotification } = useSelector((state) => state.notification);
    const [displayApp, setDisplayApp] = useState(true)
    const [displaySoc, setDisplaySoc] = useState(false)
    const [friends, setFriends] = useState([])
    const dispatch = useDispatch();
    const { subscribeTopic } = usePushNotification();
    const [defaultTab, setdefaultTab] = useState(0);
    const goTo = useTabNavigation()
    const ind = useTabIndex();

    const getConnectedFriends = async () => {
        try {
            let { data } = await GetConnectedFriends(userInfo.userId, churchInfo.tenantId)
            // console.log(data, 'friend')
            setFriends(data)
            dispatch(userConnectedFriends(data))
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getConnectedFriends();
    }, [churchInfo, userInfo])

    useEffect(() => {
        subscribeToConnectionRequestTopicOfMe()
    }, [])

    useEffect(() => {
        if (isSocialsNotification) {
            // setDisplaySoc(true)
            // setDisplayApp(false)
            goTo(1)
        
        } else {
            setDisplaySoc(false)
            setDisplayApp(true)
            setdefaultTab(0)
        }
    }, [isSocialsNotification])

    const subscribeToConnectionRequestTopicOfMe = () => {
        if (userInfo?.userId) {
            // Subscribe to push notification topics
            const connectionRequestTopic = `ConnectionRequest${userInfo?.userId}`
            const approveRequestTopic = `ApproveRequest${userInfo?.userId}`
            const declineRequestTopic = `DeclineRequest${userInfo?.userId}`
            const userChatTopic = `UserChat${userInfo?.userId}`
            subscribeTopic(connectionRequestTopic);
            subscribeTopic(approveRequestTopic);
            subscribeTopic(declineRequestTopic);
            subscribeTopic(userChatTopic);
            console.log('subscription complete')
        }
    }


    return (
        <>
            <NetworkConectivityStatus />
            <CustomStatusBar backgroundColor={'transparent'} translucent={true} barStyle={'dark-content'} />
            {/* <StackHeader title={'Our Lady of The Holy Rosary Chaplaincy'} newStack /> */}
           <View>
           <LinearGradient
                    colors={['#8FFA08', '#ffffff']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 200 }}
                />
                <View style={{height: 110 }}>
                    <Image source={require('../assets/img/splash_image.png')} style={{ width: 100, height: 100, position: 'absolute', alignSelf: 'center' }} resizeMode="contain" />
                    </View>
           </View>
            <View style={{ position: 'absolute', marginTop: 50, height, width}}>
            <TabsProvider
                defaultIndex={defaultTab}
            // onChangeIndex={handleChangeIndex} optional
            >
                <Tabs
                    // uppercase={false} // true/false | default=true (on material v2) | labels are uppercase
                    // showTextLabel={false} // true/false | default=false (KEEP PROVIDING LABEL WE USE IT AS KEY INTERNALLY + SCREEN READERS)
                    // iconPosition // leading, top | default=leading
                    //   style={{ backgroundColor: COLORS.primary }} // works the same as AppBar in react-native-paper
                    // dark={false} // works the same as AppBar in react-native-paper
                    theme={{ colors: { surface: 'transparent', onSurface: '#073609', onSurfaceVariant: '#073609', primary: '#073609' } }} // works the same as AppBar in react-native-paper
                    // mode="scrollable" // fixed, scrollable | default=fixed
                    // showLeadingSpace={true} //  (default=true) show leading space in scrollable tabs inside the header
                    disableSwipe={true} // (default=false) disable swipe to left/right gestures
                >
                    <TabScreen
                        label="Parish"
                        onPress={() => {
                            setDisplaySoc(false)
                            setDisplayApp(true)
                        }}
                    >
                        <View style={{ flex: 1 }}>
                            {
                                displayApp ? (
                                    <AppTabs />
                                ) : null
                            }
                        </View>
                    </TabScreen>
                    <TabScreen
                        label="Socials"
                        // style={{ borderColor: 'red', borderWidth: 1 }}
                        // icon="bag-suitcase"
                        // optional props
                        // badge={false} // only show indicator
                        // badge="text"
                        badge={newNotification ? messages.length : undefined}
                        // onPressIn={() => {
                        //   console.log('onPressIn explore');
                        // }}
                        onPress={() => {
                            setDisplaySoc(true)
                            setDisplayApp(false)
                        }}
                    >
                        <View style={{ flex: 1 }}>
                            {
                                displaySoc ?
                                    !userInfo?.userId ? (
                                        <NoUserLoggedIn navigation={navigation} />
                                    ) : friends.length > 0 ?
                                        <SocialTabs />
                                        : <ConnectionList isNew={true} />
                                    : null
                            }
                        </View>
                    </TabScreen>
                    {/* <TabScreen
                        label="Finance"
                        onPress={() => {
                            // setDisplaySoc(false)
                            // setDisplayApp(true)
                        }}
                    >
                        <View style={{ flex: 1 }}>
                            <WelcomeScreen />
                        </View>
                    </TabScreen> */}
                </Tabs>
            </TabsProvider>
            </View>
        </>
    )
}

const NoUserLoggedIn = ({ navigation }) => (
    <View style={styles.parent}>
        <Button
            icon="login"
            mode="contained"
            buttonColor={COLORS.primary}
            textColor="#FFFFFF"
            style={{ width: (width / 2) - 30 }}
            onPress={() => navigation.navigate("Login")}>
            Login
        </Button>
        <Button
            icon="logout"
            mode="outlined"
            textColor={COLORS.primary}
            style={{ width: (width / 2) - 30 }}
            onPress={() => navigation.navigate("Register")}>
            Signup
        </Button>
    </View>
)

const styles = StyleSheet.create({
    parent: {
        flexDirection: "row",
        gap: 10,
        height: height - 200,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default HeaderTabs;

