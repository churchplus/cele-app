
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Image, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { BookIcon } from "../../assets/img/icons";
import { COLORS, Fonts, height, width } from "../../assets/Theme";
import { ChurchFeeds, GetAllDevotionals, GetDevotionalsByDate } from "../../services/dashboard";
import { StackHeader } from "../reusables/index";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import moment from "moment";
import AutoHeightImage from 'react-native-auto-height-image';
import { NoNetworkView } from "../reusables/NetworkConnectivity";
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import { SwipeModal } from "../reusables/Modal";
import { Button } from "react-native-paper";
import dateFormatter from "../../utils/dateFormatter";
import { catholicdevotionaltenantid } from "../../utils/config";

const DevotionLibrary = ({ navigation }) => {
    const [devotionLibrary, setDevotionLibrary] = useState([])
    const [loading, setLoading] = useState(false)
    const [dateDevotionalloading, setdateDevotionalloading] = useState(false)
    const churchInfo = useSelector((state) => state.user.churchInfo);
    const [date, setDate] = useState(dayjs());
    const [displayDateDialog, setDisplayDateDialog] = useState(false);
    const devotionTopics = [
        { topics: "Faith", url: require("../../assets/img/devotionaltopics.png") },
        { topics: "Fruitfulness", url: require("../../assets/img/devotionaltopics2.png") },
        { topics: "Baptism", url: require("../../assets/img/devotionaltopics3.png") },
    ]
    const networkStatus = useSelector((state) => state.user.networkStatus);
    const [devotionState, setDevotionalState] = useState(1);

    const getChurchFeed = async () => {
        if (!networkStatus) return;
        setLoading(true);
        try {
            let { data } = await GetAllDevotionals(catholicdevotionaltenantid);
            if (!data) return;
            setDevotionLibrary(data)
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getChurchFeed();
    }, [])

    useEffect(() => {
        if (!networkStatus) {
            setLoading(false)
        } else {
            getChurchFeed();
            setLoading(true)
        }
    }, [networkStatus])

    const goToDevotional = async (params) => {
        setDate(params.date.toISOString());
        setdateDevotionalloading(true)
        setDisplayDateDialog(false)
        const formatted = dateFormatter.getISOStringGMT(params.date.toISOString())
        try {
            let { data } = await GetDevotionalsByDate(catholicdevotionaltenantid, formatted);
            setDevotionalState(2)
            setDevotionLibrary(data)
            setdateDevotionalloading(false)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
            <SafeAreaView>
                <StackHeader title="Devotional Library" goBack={() => navigation.goBack()} />
                {
                    !networkStatus && !loading && devotionLibrary.length === 0 ? (
                        <View style={{ flexDirection: "row", height: height - 250, alignItems: "center", justifyContent: "center" }}>
                            <NoNetworkView triggerRequest={getChurchFeed} />
                        </View>
                    ) : null
                }
                {
                    loading ? (
                        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", height: height - 200 }}>
                            <ActivityIndicator color={COLORS.primary} size={25} />
                        </View>
                    ) : devotionLibrary.length > 0 ? (
                        <>
                            <View>
                            {
                                    devotionLibrary[0]?.mediaUrl ? (
                                        <AutoHeightImage width={width} source={{ uri: devotionLibrary[0]?.mediaUrl || 'https://placeholder.com/68x68' }} />
                                    ) : (
                                        <AutoHeightImage width={width} source={require("../../assets/img/familydevotion.png")} />
                                    )
                                }
                                {/* <AutoHeightImage width={width} source={{ uri: devotionLibrary[0]?.mediaUrl || 'https://placeholder.com/68x68' }} /> */}
                                <Image source={require("../../assets/img/librarybanner.png")} resizeMode="cover" style={{ width: "100%", position: "relative", bottom: 40, width: width - 40, marginLeft: 20 }} />
                                <View style={{ marginTop: -100, marginLeft: 150 }}>
                                    <Text style={{ color: "rgba(246, 246, 246, 1)", fontFamily: Fonts.regular, fontSize: 13 }}>{moment(devotionLibrary[0]?._OrderDate).format('dddd, MMMM Do YYYY')}</Text>
                                    <Text style={{ color: "rgba(246, 246, 246, 1)", fontFamily: Fonts.semibold, fontSize: 15 }}>Read today’s Devotion</Text>
                                </View>
                                <View style={{ backgroundColor: 'rgba(25, 186, 255, 0.1)', paddingVertical: 25, zIndex: -1 }}>
                                    <View style={{ alignItems: 'center' }}>
                                        <Text style={{ fontFamily: Fonts.extrabold, fontSize: 20, textAlign: "center", color: "rgba(47, 46, 65, 1)", width: width, marginTop: 10, paddingHorizontal: 10 }}>{devotionLibrary[0]?.title}</Text>
                                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                                            <BookIcon color="rgba(0, 0, 0, 0.92)" />
                                            <Text style={{ color: "rgba(0, 0, 0, 0.92)", marginLeft: 5 }}>{devotionLibrary[0]?.bibleVerse}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{ borderTopWidth: 6, borderTopColor: "rgba(0, 0, 0, 0.05)", marginVertical: 20 }}></View>
                            <View style={{ paddingHorizontal: 15 }}>
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                                    <Text style={{ color: "rgba(0, 0, 0, 1)", fontSize: 15, fontFamily: Fonts.semibold, }}>Previous devotions</Text>
                                    {
                                        devotionLibrary.length > 0 ? (
                                            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                                                <Button loading={dateDevotionalloading} icon="bookmark" mode="contained" buttonColor="rgba(20, 121, 193, 0.1)" textColor="rgba(0, 0, 0, 0.8)" labelStyle={{ fontWeight: 500 }} style={{ borderRadius: 10, paddingVertical: 4, borderWidth: 1, borderColor: "rgba(0, 0, 0, 0.2)" }} onPress={() => devotionState === 1 ? setDisplayDateDialog(true) : (getChurchFeed(), setDevotionalState(1))}>
                                                    {devotionState === 1 ? 'Go to devotional' : 'View all'}
                                                </Button>
                                            </View>
                                        ) : null
                                    }
                                </View>
                                <FlatList
                                    data={devotionLibrary}
                                    keyExtractor={(item, index) => index}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity onPress={() => navigation.navigate('TodayDevotional', { data: item })}>
                                            <View style={{ marginTop: 10 }}>
                                                {
                                                    item.mediaUrl ? (
                                                        <Image source={{ uri: item.mediaUrl }} style={{ width: 121, height: 121, borderRadius: 10 }} />
                                                    ) : (
                                                        <Image source={require('../../assets/img/familydevotion.png')} style={{ width: 121, height: 121, borderRadius: 10 }} />
                                                    )
                                                }
                                                <Text style={{ marginTop: 5, color: "rgba(0, 0, 0, 0.6)", fontSize: 10, fontFamily: Fonts.regular }}>{moment(item._OrderDate.split("T")[0].replaceAll("-", ""), "YYYYMMDD").fromNow()}</Text>
                                                <Text style={{ color: "rgba(0, 0, 0, 1)", fontFamily: Fonts.semibold, fontSize: 13, marginTop: 3, width: 121 }}>{item?.title}</Text>
                                                <Text style={{ color: "rgba(0, 0, 0, 0.6)", fontSize: 10, fontFamily: Fonts.regular }}>{item?.posterDetails?.posterName}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                    contentContainerStyle={{ columnGap: 15 }}
                                    showsHorizontalScrollIndicator={false}
                                    horizontal
                                />
                            </View>
                        </>
                    ) : (
                        <View style={{ height: height - 200, justifyContent: "center" }}>
                            <Text style={{ fontFamily: Fonts.black, fontSize: 20, textAlign: "center", color: COLORS.black }}>No devotional</Text>
                            <Text style={{ color: COLORS.black, textAlign: "center" }}>Check back later to see your devotionals.</Text>
                        </View>
                    )
                }
                {/* <View style={{ backgroundColor: "rgba(217, 217, 217, 0.2)", padding: 15, marginTop: 20 }}>
                    <Text style={{ color: "rgba(0, 0, 0, 1)", fontSize: 15, fontWeight: 600, marginTop: 5 }}>Topics</Text>
                    <View style={{ paddingBottom: 10 }}>
                        {
                            devotionTopics.length > 0 ? (
                                devotionTopics.map((item, index) => (
                                    <TouchableOpacity rippleColor="rgba(0, 0, 0, .1)" key={index} style={{ marginTop: 20 }}>
                                        <View>
                                            <Image source={item.url} style={{ width: "100%", borderRadius: 5 }} />
                                            <Text style={{ color: "rgba(255, 255, 255, 1)", fontWeight: 500, marginTop: -30, marginLeft: 10 }}>{item.topics}</Text>
                                        </View>
                                    </TouchableOpacity>
                                ))
                            ) : null
                        }
                    </View>
                    <TouchableOpacity>
                        <Text style={{ paddingVertical: 20, color: "rgba(0, 0, 0, 0.7)", fontSize: 14, fontWeight: 500, textAlign: "center" }}>See all topics</Text>
                    </TouchableOpacity>
                </View> */}
                {/* <View style={{ paddingBottom: 60 }}>
                    <Text style={{ color: "rgba(0, 0, 0, 1)", fontSize: 15, fontWeight: 600, marginTop: 5, paddingHorizontal: 15, marginTop: 50, marginBottom: 5 }}>Saved Devotions</Text>
                    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10, paddingHorizontal: 15 }}>
                        {
                            devotionLibrary.length > 0 ? (
                                devotionLibrary.map((item, index) => (
                                    <TouchableOpacity style={{ marginTop: 20, width: (width - 40) / 2 }} key={index}>
                                        <Image source={require("../../assets/img/trending1.jpg")} style={{ width: "100%", height: 130, borderRadius: 10 }} />
                                        <Text style={{ marginTop: 10, color: "rgba(0, 0, 0, 0.6)", fontSize: 12, width: "100%" }}>Yesterday</Text>
                                        <Text style={{ color: "rgba(0, 0, 0, 1)", fontWeight: 500, fontSize: 14, marginTop: 3, width: "100%" }}>Pattern for obedience in christian community</Text>
                                        <Text style={{ color: "rgba(0, 0, 0, 0.6)", fontSize: 12, fontStyle: 'italic' }}>Sam Adeyemi</Text>
                                    </TouchableOpacity>
                                    // </View>
                                ))
                            ) : null
                        }
                    </View>
                </View> */}
                <SwipeModal visible={displayDateDialog} closeModal={() => setDisplayDateDialog(false)} height="50%">
                    <DateTimePicker
                        mode="single"
                        date={date}
                        onChange={goToDevotional}
                    />
                </SwipeModal>
            </SafeAreaView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({

})

export default DevotionLibrary;