import React from 'react'
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import CustomStatusBar from '../reusables/StatusBar'
import { COLORS, Fonts } from '../../assets/Theme'
import { StackHeader } from '../reusables'
import { Button } from 'react-native-paper'

const SingleProductDetails = ({ navigation }) => {
    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
                <CustomStatusBar backgroundColor={COLORS.dark2} translucent={false} barStyle={'light-content'} />
                <StackHeader title="Product Details" goBack={() => navigation.goBack()} headerGradient />
                <ScrollView showsVerticalScrollIndicator={false} style={styles.sideContainer}>
                    <View style={styles.section(20)}>
                        <Image source={require('../../assets/img/book_cover.png')} resizeMode='contain' style={styles.productImage} />
                    </View>
                    <View style={styles.section(20)}>
                        <Text style={styles.categorytext}>Book</Text>
                        <Text style={styles.producttext}>CCC Contitution</Text>
                        <View style={[styles.flexitem, styles.section(5)]}>
                            <Text style={styles.ratingtext}>Rating 4.5</Text>
                            <Text style={styles.pricingtext}>NGN 7,000</Text>
                        </View>
                    </View>
                    <View style={styles.section(20)}>
                        <Text style={styles.descriptiontext}>Description</Text>
                        <Text style={styles.descriptionbody}>
                            Lorem ipsum dolor sit amet consectetur. Integer phasellus aenean senectus neque. Amet libero posuere pellentesque consectetur orci in. Lorem ipsum dolor sit amet consectetur. Integer phasellus aenean senectus neque. Amet libero blandit posuepellentesque consectetur orci in.{'\n'}
                        </Text>
                        <Text style={styles.descriptionbody}>
                            Lorem ipsum dolor sit amet consectetur. Integer phasellus aenean senectus neque. Amet libero posuere pellentesque consectetur orci in. Lorem ipsum dolor sit amet consectetur. Integer phasellus aenean senectus neque. Amet libero blandit posuepellentesque consectetur orci in.{'\n'}
                        </Text>
                        <Text style={styles.descriptionbody}>
                            Lorem ipsum dolor sit amet consectetur. Integer phasellus aenean senectus neque. Amet libero posuere pellentesque consectetur orci in. Lorem ipsum dolor sit amet consectetur. Integer phasellus aenean senectus neque. Amet libero blandit posuepellentesque consectetur orci in.{'\n'}
                        </Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
            <View style={{ backgroundColor: COLORS.white }}>
                <Button textColor="#FFFFFF" buttonColor={COLORS.primary} style={{ marginVertical: 20, marginHorizontal: 20, borderRadius: 5 }} contentStyle={{ paddingVertical: 8 }} mode="contained" onPress={() => navigation.navigate("MyCart")}>
                    <Text style={{ fontSize: 15, fontFamily: Fonts.semibold, marginVertical: 20 }}>Add to Cart</Text>
                </Button>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    sideContainer: {
        paddingHorizontal: 15
    },
    productImage: {
        alignSelf: 'center'
    },
    section: (val) => ({
        marginTop: val
    }),
    categorytext: {
        fontFamily: Fonts.medium,
        fontSize: 16,
        color: '#00000066'
    },
    producttext: {
        fontFamily: Fonts.bold,
        fontSize: 18,
        color: '#000000B2',
    },
    ratingtext: {
        fontFamily: Fonts.medium,
        fontSize: 13,
        color: '#00000099',
    },
    pricingtext: {
        fontFamily: Fonts.bold,
        fontSize: 15,
        color: '#124191',
    },
    descriptiontext: {
        fontFamily: Fonts.medium,
        fontSize: 16,
        color: '#434343C9',
        marginBottom: 10
    },
    descriptionbody: {
        fontFamily: Fonts.regular,
        fontSize: 14,
        color: '#000000CC',
    },
    flexitem: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

export default SingleProductDetails