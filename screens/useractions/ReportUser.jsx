import React, { useState } from 'react'
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { StackHeader } from '../reusables'
import { COLORS, Fonts } from '../../assets/Theme'
import TextArea from '../reusables/TextArea'
import { Button } from 'react-native-paper'
import { FlagPost } from '../../services/social'
import { useSelector } from 'react-redux'

const ReportUser = ({ navigation, route }) => {
    /**
     * @params postId 
     * @params postedBy
     */ 

    const userInfo = useSelector((state) => state.user.userInfo);
    const { data } = route.params;
    const { postId, postedBy } = data;
    const [flagLoading, setflagLoading] = useState(false)
    const [flagReasons, setflagReasons] = useState([
        {
            text: 'Abuse and Harrassment',
            isSelected: false
        },
        {
            text: 'Spam',
            isSelected: false
        },
        {
            text: 'Sensitive or disturbing Media',
            isSelected: false
        },
        {
            text: 'Impersonation',
            isSelected: false
        },
    ])
    const [commentMessage, setcommentMessage] = useState("");

    const chooseReason = (index) => {
        const copy = [...flagReasons];
        copy[index].isSelected = !copy[index].isSelected;
        setflagReasons(copy);
    }

    const renderItem = ({ item, index }) => (
        <TouchableOpacity onPress={() => chooseReason(index)}>
            <View style={styles.issues(item.isSelected)}>
                <Text style={styles.issues_text(item.isSelected)}>{item.text}</Text>
                <View style={styles.check} />
            </View>
        </TouchableOpacity>
    )

    const flaggedPostContent = async () => {
        setflagLoading(true)
        let flagreasons = []
        if (commentMessage) {
            flagreasons = flagReasons.map(i => i.text)
            flagReasons.push(commentMessage)
        } else {
            flagreasons = flagReasons.map(i => i.text)
        }
        let payload = {
            postId,
            reasons: flagreasons,
            reportedBy: userInfo?.userId,
            postedBy,
            date: new Date().toISOString()
        }
        try {
            await FlagPost(payload);
            navigation.navigate('PostFlagged', { postedBy: postedBy })
            setflagLoading(false)
        }
        catch (error) {
            console.log(error)
            setflagLoading(false)
        }
    }
    return (
        <SafeAreaView style={styles.contentContainer}>
            <StackHeader title="Make a report" goBack={() => navigation.goBack()} />
            <ScrollView>
                <View style={styles.subContainer}>
                    <Text style={styles.header}>What type of issue are you reporting</Text>
                    <FlatList
                        data={flagReasons}
                        keyExtractor={(item, index) => index}
                        renderItem={renderItem}
                        scrollEnabled={false}
                    />

                    <View style={styles.section(30)}>
                        <Text style={styles.not_listed_text}>Issue not listed</Text>
                        <TextArea
                            placeholder="Type report here..."
                            onChangeText={setcommentMessage}
                            value={commentMessage}
                            multiline={true}
                            numberOfLines={8}
                            style={{ backgroundColor: '#EBEBEB' }}
                        />
                    </View>
                    <View style={styles.section(40)}>
                        <Button
                            textColor="#FFFFFF"
                            buttonColor={COLORS.primary}
                            mode="contained"
                            style={{ borderRadius: 15, paddingVertical: 3 }}
                            onPress={flaggedPostContent}
                            loading={flagLoading}
                        >
                            <Text style={{ fontFamily: Fonts.semibold, fontSize: 15 }}>Submit</Text>
                        </Button>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    subContainer: {
        padding: 10
    },
    header: {
        color: COLORS.black,
        fontFamily: Fonts.semibold,
        textAlign: 'center',
        fontSize: 16,
        marginBottom: 10,
        marginTop: 10
    },
    issues: (value) => ({
        backgroundColor: value ? '#000000' : '#EBEBEB',
        borderRadius: 4,
        padding: 10,
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }),
    issues_text: (value) => ({
        color: value ? COLORS.white : COLORS.black,
        fontFamily: Fonts.regular
    }),
    check: {
        backgroundColor: '#EBEBEB',
        borderWidth: 1,
        borderColor: '#000000',
        width: 12,
        height: 12,
        borderRadius: 50
    },
    section: (value) => ({
        marginTop: value
    }),
    not_listed_text: {
        fontFamily: Fonts.bold,
        color: COLORS.black,
        marginBottom: 10
    }
})

export default ReportUser