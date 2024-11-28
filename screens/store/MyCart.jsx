import React from 'react'
import { FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { StackHeader } from '../reusables'
import { COLORS, Fonts, width } from '../../assets/Theme'
import CustomStatusBar from '../reusables/StatusBar'
import Icon from 'react-native-vector-icons/Ionicons';
import { IconButton, Button, Divider } from 'react-native-paper'

const MyCart = ({ navigation }) => {
    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#E3E3E3' }}>
                <CustomStatusBar backgroundColor={COLORS.dark2} translucent={false} barStyle={'light-content'} />
                <StackHeader title="My Cart" goBack={() => navigation.goBack()} />
                <ScrollView showsVerticalScrollIndicator={false} style={styles.sideContainer}>
                    <View style={styles.section(20)}>
                        <FlatList
                            data={[1, 2, 3]}
                            keyExtractor={(item, index) => index}
                            renderItem={({ item }) => (
                                <View style={styles.cartcard}>
                                    <Image source={require('../../assets/img/book_cover.png')} resizeMode='contain' style={styles.productImage} />
                                    <View style={styles.flexwrapper}>
                                        <View style={styles.innercontent}>
                                            <Text style={styles.producttitletext}>A Journey Through Grief, Losafa aefe aefe qaef</Text>
                                            <Text><Icon name={"trash"} color={'#DA444499'} size={20} /></Text>
                                        </View>
                                        <View style={[styles.innercontent, styles.section(10), { alignItems: 'center' }]}>
                                            <Text style={styles.productprice}>15,000</Text>
                                            <View style={styles.actionbuttons}>
                                                <IconButton
                                                    mode='contained'
                                                    icon="plus"
                                                    size={20}
                                                    style={styles.iconbutton}
                                                    containerColor={COLORS.primary}
                                                    iconColor={COLORS.white}
                                                    onPress={() => console.log('Pressed')}
                                                />
                                                <Text style={styles.numberofitems}>1</Text>
                                                <IconButton
                                                    mode='contained'
                                                    icon="minus"
                                                    size={20}
                                                    style={styles.iconbutton}
                                                    containerColor={COLORS.primary}
                                                    iconColor={COLORS.white}
                                                    onPress={() => console.log('Pressed')}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )}
                            numColumns={1}
                            contentContainerStyle={{ rowGap: 10 }}
                        // columnWrapperStyle={{ flex: 1, justifyContent: 'space-between' }}
                        />
                        <View style={[styles.section(20), { marginBottom: 30 }]}>
                            <View style={styles.totalwrapper}>
                                <Text style={styles.calculationtext}>Total number of items</Text>
                                <Text style={styles.calculationtext}>3</Text>
                            </View>
                            <View style={styles.totalwrapper}>
                                <Text style={styles.calculationtext}>Sub total</Text>
                                <Text style={styles.calculationtext}>NGN 45,000</Text>
                            </View>
                            <View style={styles.totalwrapper}>
                                <Text style={styles.calculationtext}>Shipping fee</Text>
                                <Text style={styles.calculationtext}>NGN 1,200</Text>
                            </View>
                            <View style={styles.section(10)}>
                            <Divider style={{ backgroundColor: '#00000033'}} />
                            </View>
                            <View style={styles.totalwrapper}>
                                <Text style={styles.totaltext}>Shipping fee</Text>
                                <Text style={styles.totaltext}>NGN 46,000</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
            <View style={{ backgroundColor: COLORS.white }}>
                <Button textColor="#FFFFFF" buttonColor={COLORS.primary} style={{ marginVertical: 20, marginHorizontal: 20, borderRadius: 5 }} contentStyle={{ paddingVertical: 8 }} mode="contained" onPress={() => navigation.navigate("MyCart")}>
                    <Text style={{ fontSize: 15, fontFamily: Fonts.semibold, marginVertical: 20 }}>Checkout</Text>
                </Button>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    sideContainer: {
        paddingHorizontal: 20
    },
    cartcard: {
        flexDirection: 'row',
        backgroundColor: '#F5F5F5',
        padding: 15,
        gap: 10
    },
    productImage: {
        width: 80,
        height: 80
    },
    innercontent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    flexwrapper: {
        width: width - 160,
        justifyContent: 'space-between',
    },
    producttitletext: {
        fontFamily: Fonts.semibold,
        fontSize: 15,
        color: '#000000B2',
        width: width - 180
    },
    productprice: {
        fontFamily: Fonts.semibold,
        color: '#312177',
        fontSize: 15
    },
    iconbutton: {
        borderRadius: 5
    },
    actionbuttons: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    numberofitems: {
        fontFamily: Fonts.semibold,
        fontSize: 15,
        color: '#00000099'
    },
    section: (val) => ({
        marginTop: val
    }),
    totalwrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
    },
    calculationtext: {
        fontFamily: Fonts.medium,
        fontSize: 15,
        color: '#000000B2',
        marginTop: 10
    },
    totaltext: {
        fontFamily: Fonts.bold,
        fontSize: 17,
        color: COLORS.primary,
        marginTop: 10
    }
})

export default MyCart