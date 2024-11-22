import { View, Text, SafeAreaView, Image, ScrollView, ActivityIndicator, TouchableOpacity, StatusBar, Platform } from "react-native";
import { COLORS, Fonts, height, width } from "../../assets/Theme";
import { StackHeader } from "../reusables/index";
import AutoHeightImage from 'react-native-auto-height-image';
import { GetSingleMedia } from "../../services/media";
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Button } from "react-native-paper";
import { CenteredModal, SwipeModal } from "../reusables/Modal";
import { CloseIcon, ForwardIcon, PlayIcon, RewindIcon } from "../../assets/img/icons";
import { TouchableRipple, Snackbar } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialIcons';
import Slider from '@react-native-community/slider';
import LinearGradient from 'react-native-linear-gradient';
import TrackPlayer, { useProgress } from 'react-native-track-player';
import { setupPlayer, addTracks } from '../../utils/trackPlayerServices';

const AudioDetails = ({ navigation, route }) => {
    const { id } = route.params;
    const churchInfo = useSelector((state) => state.user.churchInfo);
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState({});
    const [playAudioDialog, setPlayAudioDialog] = useState(false)
    const [play, setPlay] = useState(false)

    useEffect(() => {
        getSingleMedia();
    }, [])

    const getSingleMedia = async () => {
        setIsLoading(true)
        try {
            let { data } = await GetSingleMedia(id, churchInfo.tenantId);
            setData(data)
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.log(error);
        }
    }

    const openAudioPlayer = async () => {
        setPlayAudioDialog(true);
        if (Platform.OS === 'android') {
            StatusBar.setBackgroundColor("#ffffff", true)
            StatusBar.setBarStyle("dark-content", true)
        }


        const queue = await TrackPlayer.getQueue();
        if (queue.length > 0) {
            await TrackPlayer.remove([0]);
            await addTracks(data);
        } else {
            await addTracks(data);
        }

        // Play track
        setPlay(true)
        TrackPlayer.play()

        // play another song
        // Seek to time
    }

    const closeAudioPlayer = () => {
        setPlayAudioDialog(false)
        if (Platform.OS === 'android') {
            StatusBar.setBackgroundColor(COLORS.primary, true)
            StatusBar.setBarStyle("light-content", true)
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <StackHeader title="Media Details" goBack={() => navigation.goBack()} />
            {
                isLoading ? (
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", height: height }}>
                        <ActivityIndicator size={25} color={COLORS.primary} />
                    </View>
                ) : (
                    <>
                        <ScrollView>
                            <View style={{ backgroundColor: COLORS.white, paddingBottom: 20 }}>
                                <View style={{ margin: 15, marginTop: 20 }}>
                                    <AutoHeightImage width={width - 30} source={{ uri: data.imagePath || "https://placeholder.com/68x68" }} style={{ borderRadius: 10 }} />
                                    <Text style={{ fontFamily: Fonts.bold, fontSize: 16, color: COLORS.black, marginTop: 20 }}>{data.name}</Text>
                                    <Text style={{ fontSize: 12, color: "#000000B2", marginTop: 5 }}>{data.viewCount == 0 ? 'No views yet' : data.viewCount == 1 ? '1 View' : `${data.viewCount} view`}</Text>
                                    {
                                        data.isFree ? (
                                            <Text style={{ fontSize: 16, color: "#E27F06", marginTop: 5, fontWeight: 600 }}>FREE</Text>
                                        ) : (
                                            <Text style={{ fontSize: 16, color: "#124191", marginTop: 5, fontWeight: 600 }}>{data.price}</Text>
                                        )
                                    }
                                    <Text style={{ fontSize: 13, color: "#000000CC", marginTop: 15, lineHeight: 20 }}>
                                        {data.description}
                                    </Text>
                                </View>
                            </View>
                        </ScrollView>
                        {
                            data?.filePath?.includes(".mp3") ? (
                                <>
                                    <Button textColor="#FFFFFF" style={{ marginTop: 20, marginBottom: 15, marginHorizontal: 15, padding: 3, borderRadius: 15, backgroundColor: COLORS.black }} mode="contained" onPress={openAudioPlayer}>
                                        <Text>Play now</Text>
                                    </Button>
                                    <AudioPlayerMedia playAudioDialog={playAudioDialog} setPlayAudioDialog={closeAudioPlayer} data={data} play={play} setPlay={setPlay} />
                                </>
                            ) : null
                        }
                    </>
                )
            }
        </SafeAreaView>
    );
}

const AudioPlayerMedia = ({ playAudioDialog, setPlayAudioDialog, data, play, setPlay }) => {
    const [progressValue, setProgressValue] = useState(0)
    const min = 0
    const [max, setMax] = useState(0)

    const [isPlayerReady, setIsPlayerReady] = useState(false);
    const [displaySnack, setDisplaySnack] = useState(false);
    const [displaySnack2, setDisplaySnack2] = useState(false);
    // const [isPlayerReady, setIsPlayerReady] = useState(false);

    useEffect(() => {
        setup(data);
    }, []);

    const setup = async (file) => {
        let isSetup = await setupPlayer();
        setIsPlayerReady(isSetup);
    }

    if (!isPlayerReady) {
        return (
            <SafeAreaView>
                <ActivityIndicator size="large" color="#bbb" />
            </SafeAreaView>
        );
    }

    const pauseTrack = () => {
        setPlay(false)
        TrackPlayer.pause()
    }

    const playTrack = () => {
        setPlay(true)
        TrackPlayer.play()
    }

    const seekForward = () => {
        TrackPlayer.seekTo(progressValue + 10)
        setDisplaySnack(true)
    }

    const seekBackward = () => {
        TrackPlayer.seekTo(progressValue - 10)
        setDisplaySnack2(true)
    }

    const dragSlider = (value) => {
        TrackPlayer.seekTo(value)
    }

    const setPosition = ({ position, duration }) => {
        setMax(duration)
        setProgressValue(position)
    }

    return (
        <CenteredModal visible={playAudioDialog} closeModal={setPlayAudioDialog} height="80%">
            <View style={{ backgroundColor: "#FFF", height: Platform.OS === 'android' ? "100%" : "95%" }}>

                <View>
                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <TouchableRipple rippleColor={"#DDD"} onPress={() => setPlayAudioDialog()} style={{ paddingLeft: 10, height: 40, flexDirection: "row", alignItems: "center" }}>
                            <Icon name={"expand-more"} color={"#201818"} size={40} />
                        </TouchableRipple>
                        <Text style={{ fontFamily: Fonts.bold, fontSize: 20, color: "#201818" }}>Audio Player</Text>
                        <TouchableRipple rippleColor={"#DDD"} onPress={() => { }} style={{ width: 50, height: 40, flexDirection: "row", alignItems: "center", justifyContent: "flex-end" }}>
                            {/* <Icon name={"more-vert"} color={"#201818"} size={30} /> */}
                            <View />
                        </TouchableRipple>
                    </View>
                    <View style={{ paddingHorizontal: 15 }}>
                        <Image source={{ uri: data.imagePath || "https://placeholder.com/68x68" }} style={{ borderRadius: 10, marginTop: 30, width: width - 30, height: 350 }} resizeMode="cover" />
                        <Text style={{ fontFamily: Fonts.bold, fontSize: 16, color: COLORS.black, marginTop: 30 }}>{data.name}</Text>
                        <Text style={{ fontSize: 12, color: "#000000B2", marginTop: 5 }}>{data.viewCount == 0 ? 'No views yet' : data.viewCount == 1 ? '1 View' : `${data.viewCount} view`}</Text>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Slider
                            style={{ width: width, height: 40 }}
                            value={progressValue}
                            onValueChange={dragSlider}
                            minimumValue={min}
                            maximumValue={max}
                            thumbTintColor="#0889FF"
                            minimumTrackTintColor="#0889FF"
                            maximumTrackTintColor="#00000066"
                        />
                    </View>
                    <View style={{ paddingHorizontal: 15 }}>
                        <TrackProgress setPosition={setPosition} />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: 'center', gap: 30 }}>
                        <View>
                            <Snackbar
                                visible={displaySnack2}
                                duration={500}
                                style={{ backgroundColor: "#eee", width: 50, borderRadius: 50, position: 'relative', top: -15, right: 50 }}
                                onDismiss={() => setDisplaySnack2(false)}
                            >
                                <Text style={{ color: "#000" }}>10</Text>
                            </Snackbar>
                            <TouchableOpacity onPress={seekBackward}>
                                <RewindIcon />
                            </TouchableOpacity>
                        </View>
                        {
                            play ? (
                                <TouchableOpacity onPress={pauseTrack} style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Icon name={"pause-circle"} color={"#FF1082B0"} size={90} />
                                </TouchableOpacity>

                            ) : (
                                <TouchableOpacity onPress={playTrack} style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Icon name={"play-circle"} color={"#FF1082B0"} size={90} />
                                </TouchableOpacity>
                            )
                        }
                        <View>
                            <Snackbar
                                visible={displaySnack}
                                duration={500}
                                style={{ backgroundColor: "#eee", width: 50, borderRadius: 50, position: 'relative', top: -15 }}
                                onDismiss={() => setDisplaySnack(false)}
                            >
                                <Text style={{ color: "#000" }}>10</Text>
                            </Snackbar>
                            <TouchableOpacity onPress={seekForward}>
                                <ForwardIcon />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ paddingHorizontal: 15, marginTop: 20, backgroundColor: "#D9D9D966", paddingTop: 20, paddingBottom: 40 }}>
                        <View style={{ flexDirection: 'row', width: width - 40, justifyContent: 'space-around' }}>
                            <LinearGradient
                                colors={['#0889FF', COLORS.primary]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 0, y: 1 }}
                                style={{ borderTopLeftRadius: 20, borderBottomLeftRadius: 20, flexDirection: 'row', justifyContent: "center", alignItems: 'center', width: '33%' }}
                            >
                                <TouchableOpacity style={{ flexDirection: 'row' }}>
                                    <Icon name={"thumb-up"} color={COLORS.white} size={20} />
                                    <Text style={{ color: COLORS.white, fontFamily: Fonts.medium }}>&nbsp;0</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                            <LinearGradient
                                colors={['#0889FF', COLORS.primary]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 0, y: 1 }}
                                style={{ padding: 10, flexDirection: 'row', width: '33%', justifyContent: "center", alignItems: 'center' }}
                            >
                                <TouchableOpacity style={{ flexDirection: 'row' }}>
                                    <Icon name={"comment"} color={COLORS.white} size={20} />
                                    <Text style={{ color: COLORS.white, fontFamily: Fonts.medium }}>&nbsp;0</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                            <LinearGradient
                                colors={['#0889FF', COLORS.primary]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 0, y: 1 }}
                                style={{ borderTopRightRadius: 20, borderBottomRightRadius: 20, padding: 10, flexDirection: 'row', width: '33%', justifyContent: "center", alignItems: 'center' }}
                            >
                                <TouchableOpacity style={{ flexDirection: 'row' }}>
                                    <Icon name={"share"} color={COLORS.white} size={20} />
                                    <Text style={{ color: COLORS.white, fontFamily: Fonts.medium }}>&nbsp;0</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                        </View>
                    </View>
                </View>
            </View>
        </CenteredModal>
    );
}

const TrackProgress = ({ setPosition }) => {
    const { position, duration } = useProgress(0);
    useEffect(() => {
        setPosition({ position, duration });
    }, [position, duration]);

    const format = (seconds) => {
        let mins = (parseInt(seconds / 60)).toString().padStart(2, '0');
        let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    }

    return (
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ fontSize: 13, fontFamily: Fonts.medium }}>{format(position)}</Text>
            <Text style={{ fontSize: 13, fontFamily: Fonts.medium }}>{format(duration)}</Text>
        </View>
    );
}

export default AudioDetails;