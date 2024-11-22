import React, { useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { StackHeader } from '../reusables'
import { COLORS, Fonts } from '../../assets/Theme'
import { HandIcon } from '../../assets/img/icons'
import { Button, Snackbar } from 'react-native-paper'
import { BlockUser } from '../../services/social'
import { useSelector } from 'react-redux'

const PostFlagged = ({ navigation, route }) => {
     /**
     * @params postedBy
     */ 

     const { postedBy } = route.params;
     const [blockLoading, setblockLoading] = useState(false)
     const userInfo = useSelector((state) => state.user.userInfo);
     const [displaySnack, setDisplaySnack] = useState(false)

     
     const blockUser = async () => {
        setblockLoading(true);
         const payload = {FriendApproverID: userInfo?.userId, FriendRequesterID: postedBy}
        try {
            const { data } = await BlockUser(payload);
            setblockLoading(false)
            setDisplaySnack(true)
        }
        catch (error) {
            console.log(error)
            setblockLoading(false)
        }
     }

    return (
        <SafeAreaView style={styles.contentContainer}>
            <StackHeader title="Submitted" goBack={() => navigation.goBack()} />
            <ScrollView>
                <View style={styles.subContainer}>
                    <Text style={styles.header}>Thanks for helping make our App better for everyone</Text>
                    <Text style={styles.message}>We have received your report. We’ll hide the reported post/comment from your timelines in the meantime.</Text>
                    <Text style={[styles.header, styles.section(30)]}>Other things you can do while we
                        make decision</Text>
                    <View style={styles.section(20)}>
                        <TouchableOpacity style={styles.block_btn}  onPress={blockUser}>
                            <HandIcon />
                            <Text style={styles.block_btn_text}>Block this user</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.section(60)}>
                    <Button
                            textColor="#FFFFFF" 
                            buttonColor={COLORS.primary}
                            mode="contained" 
                            style={{ borderRadius: 15, paddingVertical: 3 }}
                            onPress={() => navigation.navigate('MainHeaderTabs')}
                            loading={blockLoading}
                        >
                            <Text style={{ fontFamily: Fonts.semibold, fontSize: 15 }}>Done</Text>
                        </Button>
                    </View>
                </View>
            </ScrollView>
            <Snackbar
                visible={displaySnack}
                duration={4000}
                style={{ backgroundColor: "#3CBF98", marginBottom: 20 }}
                onDismiss={() => setDisplaySnack(false)}
            >
                <Text style={{ color: "#FFFFFF" }}>User blocked successfully!</Text>
            </Snackbar>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    subContainer: {
        padding: 20
    },
    header: {
        color: COLORS.black,
        fontFamily: Fonts.semibold,
        fontSize: 16,
        marginBottom: 10,
        marginTop: 10
    },
    message: {
        fontFamily: Fonts.regular,
        fontSize: 12,
        marginTop: 20,
        color: COLORS.black
    },
    section: (value) => ({
        marginTop: value
    }),
    block_btn: {
        borderWidth: 1,
        borderColor: '#544F4F',
        padding: 10,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        columnGap: 3
    },
    block_btn_text: {
        fontFamily: Fonts.medium,
    }
})

export default PostFlagged