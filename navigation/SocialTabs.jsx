import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, StatusBar, View } from 'react-native';
import { COLORS, Fonts } from '../assets/Theme';
import SocialFeeds from '../screens/socials/Feeds';
import { TouchableRipple } from "react-native-paper";
import { BellIcon, GroupUsersIcon, House } from '../assets/img/icons';
import ConnectionList from '../screens/socials/Connections';
import SocialMessages from '../screens/socials/Messages';
import Notifications from '../screens/socials/Notifications';
import { Comment } from '../assets/img/comment';
import { store } from '../redux/store';
import { clearNotificationMessages, updateNewNoticationStatus, updateNotificationMessages } from '../redux/notificationSlice';
import { useSelector } from 'react-redux';


const FeedTab = createBottomTabNavigator();

export const SocialTabs = () => {
    const { newNotification, messages } = useSelector((state) => state.notification)

    return (
        <>

            <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
            <FeedTab.Navigator
                screenOptions={({ focused, route }) => ({
                    headerShown: false,
                    tabBarShowLabel: true,
                    tabBarStyle: {
                        backgroundColor: '#FFFFFF',
                        elevation: 0
                    },
                    tabBarActiveTintColor: COLORS.primary,
                    tabBarLabelStyle: {
                        // marginBottom: 8,
                        fontSize: 12,
                        fontFamily: Fonts.medium,
                    },
                    tabBarButton: (props) => <TouchableRipple rippleColor="rgba(0, 0, 0, .07)" {...props} />,
                    tabBarIconStyle: {
                        marginTop: 11
                    },
                    tabBarIcon: ({ focused }) => {
                        let colo = "";
                        if (route.name === 'Home') {
                            colo = focused ? COLORS.primary : "#808080";
                        } else if (route.name === 'Connect') {
                            colo = focused ? COLORS.primary : "#808080";
                        } else if (route.name === 'Messages') {
                            colo = focused ? COLORS.primary : "#808080";
                        } else if (route.name === 'Alerts') {
                            colo = focused ? COLORS.primary : "#808080";
                        }

                        return (
                            <View>
                                {
                                    route.name === "Home" ? (
                                        <House width={26} height={26} color={colo} />
                                    ) : route.name === "Connect" ? (
                                        <GroupUsersIcon size="30" color={colo} />
                                    ) : route.name === "Alerts" ? (
                                        <BellIcon size="24" color={colo} />
                                    ) : route.name === "Messages" ? (
                                        <Comment color={colo} size="28" />
                                    ) : null
                                }
                            </View>
                        )
                    }
                })}
            >
                <FeedTab.Screen name="Home" component={SocialFeeds} />
                <FeedTab.Screen name="Messages" component={SocialMessages} />
                <FeedTab.Screen name="Connect" component={ConnectionList} />
                <FeedTab.Screen 
                    name="Alerts" 
                    component={Notifications} 
                    options={{
                        tabBarBadge: newNotification ? messages.length : undefined
                    }}
                    listeners={{
                        tabPress: (e) => {
                            store.dispatch(updateNewNoticationStatus(false))
                            store.dispatch(clearNotificationMessages())
                        },
                    }} 
                />
            </FeedTab.Navigator>
        </>
    );
}