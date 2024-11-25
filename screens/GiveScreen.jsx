import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, Fonts, height } from '../assets/Theme'
import { ChurchProfile } from '../services/dashboard';
import { useSelector } from 'react-redux';
import { NoNetworkView } from './reusables/NetworkConnectivity';
import HarvestBanner from '../components/give/havestBanner';

const GiveScreen = ({ navigation }) => {
    useEffect(() => {
        getChurchProfile()
    }, [])
    const networkStatus = useSelector((state) => state.user.networkStatus);
    const [onlineContribution, setonlineContribution] = useState([])
    const [banks, setBanks] = useState([])
    const [makePledgeUrl, setMakePledgeUrl] = useState("")
    const [pledgeUrl, setPledgeUrl] = useState("")
    const churchInfo = useSelector((state) => state.user.churchInfo);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!networkStatus) {
            setLoading(false)
        } else {
            getChurchProfile();
            setLoading(true);
        }
    }, [networkStatus])

    const getChurchProfile = async () => {
        if (!networkStatus) return;
        setLoading(true);
        try {
            let { data } = await ChurchProfile(churchInfo.tenantId);
            if (!data) return;
            setMakePledgeUrl(data.returnObject.pledgePromiseUrl)
            setPledgeUrl(data.returnObject.pledgeDueUrl)
            setonlineContribution(data.returnObject.onlineDonations)
            setBanks(data.returnObject.banks)
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error, 'reaching');
        }
    }

    const [giveCards, setGiveCards] = useState([
        {
            header: "Online Giving",
            subText: "Pay with Secure payment gateways",
            icon: require('../assets/img/card.png'),
        },
        {
            header: "Bank Account",
            subText: "Pay to bank account number",
            icon: require('../assets/img/bank.png'),
        },
        {
            header: "Pledges & Donations",
            subText: "Make and Redeem your pledges and donations",
            icon: require('../assets/img/donation.png'),
        },
    ])

    const cardClicked = (index) => {
        let copy = [...giveCards]
        let mapped = copy.map((item, i) => {
            index == i ? item.selected = true : item.selected = false
            return item
        })
        setGiveCards(mapped)

        setTimeout(() => {
            if (index == 0) {
                navigation.navigate("Onlingive", {
                    data: onlineContribution
                })
            } else if (index == 1) {
                navigation.navigate("BankAccount", {
                    data: banks
                })
            } else {
                navigation.navigate("PledgesAndDonation", { makePledgeUrl, pledgeUrl })
            }
        }, 500)

    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
            {/* <StackHeader goBack={() => navigation.goBack()} title="Giving" newStack /> */}
            <ScrollView style={{ flex: 1 }}>
                {
                    !networkStatus && !loading && pledgeUrl.length === 0 ? (
                        <View style={{ flexDirection: "row", height: height - 250, alignItems: "center", justifyContent: "center" }}>
                            <NoNetworkView triggerRequest={getChurchProfile} />
                        </View>
                    ) : null
                }
                {
                    loading ? (
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", height: height - 200 }}>
                            <ActivityIndicator color={COLORS.primary} size={25} />
                        </View>
                    ) : (
                        <>
                        {/* <View>
                            <HarvestBanner showButton={false} cardStyle={{ justifyContent: 'space-between', paddingRight: 20}} />
                        </View> */}
                        <View style={{ marginVertical: 30, marginHorizontal: 20 }}>
                            {/* <Text style={{ color: COLORS.black, fontFamily: Fonts.medium }}>Other ways to give</Text> */}
                            <View>
                                {
                                    giveCards.length > 0 ?
                                        giveCards.map((item, index) => (
                                            // item.selected ?
                                            //  (
                                            //     <TouchableOpacity key={index} onPress={() => cardClicked(index)}>
                                            //         <LinearGradient
                                            //             colors={index == 0 ? ['rgba(8, 137, 255, 1)', 'rgba(18, 65, 145, 1)'] : index == 1 ? ['rgba(77, 13, 60, 1)', 'rgba(132, 28, 47, 1)', 'rgba(154, 24, 48, 1)'] : ['rgba(124, 234, 73, 1)', 'rgba(3, 41, 7, 1)']}
                                            //             start={{ x: 0, y: 0 }}
                                            //             end={{ x: 0, y: 1 }}
                                            //             style={{ borderRadius: 20, padding: 15, marginTop: 15 }}
                                            //         >
                                            //             <Image source={index == 0 ? require('../assets/img/givingballs.png') : index == 2 ? require('../assets/img/pledgeballs.png') : require('../assets/img/give_bg.png')} style={{ zIndex: 99, position: 'absolute', right: 50, top: 20 }} />
                                            //             <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            //                 <Image source={item.icon} />
                                            //                 <Icon name={'check-circle-outline'} color={"#fff"} size={24} />
                                            //             </View>
                                            //             <View style={{ marginTop: 15 }}>
                                            //                 <Text style={{ fontFamily: Fonts.bold, marginTop: 40, fontSize: 18, color: COLORS.white }}>{item.header}</Text>
                                            //                 <Text style={{ fontFamily: Fonts.medium, color: COLORS.white, fontSize: 13 }}>{item.subText}</Text>
                                            //             </View>
                                            //         </LinearGradient>
                                            //     </TouchableOpacity>
                                            // ) 
                                            // :
                                            (
                                                <TouchableOpacity style={styles.card} key={index} onPress={() => cardClicked(index)}>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        <Image source={item.icon} />
                                                        {/* <Icon name={'radio-button-unchecked'} size={23} /> */}
                                                    </View>
                                                    <View style={{ marginTop: 20 }}>
                                                        <Text style={{ fontFamily: Fonts.bold, color: COLORS.black, fontSize: 18 }}>{item.header}</Text>
                                                        <Text style={{ fontFamily: Fonts.medium, fontSize: 13, color: "rgba(57, 57, 57, 0.7)" }}>{item.subText}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        )
                                        ) : null
                                }

                            </View>
                        </View>
                        </>
                    )
                }
            </ScrollView>
        </SafeAreaView>
    )
}

export default GiveScreen

const styles = StyleSheet.create({
    card: {
        shadowColor: '#000', // Shadow color
        shadowOffset: {
          width: 0, // Horizontal offset
          height: 4, // Vertical offset
        },
        shadowOpacity: 0.09, // Opacity (0.17 in hex is approximately 0.09)
        shadowRadius: 4, // Blur radius
        elevation: 3, // Elevation for Android (adjust as needed)
        marginTop: 15, 
        padding: 15, 
        borderRadius: 15, 
        backgroundColor: COLORS.white
      }
})