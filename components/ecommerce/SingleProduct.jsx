import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Fonts, width } from '../../assets/Theme'
import { useNavigation } from '@react-navigation/native'

const SingleProduct = () => {

    const navigation = useNavigation()
    return (
        <TouchableOpacity onPress={() => navigation.navigate('SingleProductDetails')}>
        <View style={styles.productwrapper}>
            <Image source={require('../../assets/img/book_cover.png')} resizeMode='cover' style={styles.productImage} />
            <Text style={styles.productnametext}>A Journey Through Grief, Loss, Hope And Recovery</Text>
            <View style={styles.flexitem}>
                <Text style={styles.productprice}>NGN 15,000</Text>
                <Text style={styles.productrating}>4.5 rating</Text>
            </View>
        </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    productwrapper: {
        width: (width / 2) - 30,
    },
    productImage: {
        width: (width / 2) - 30,
        height: 200,
        borderRadius: 5
    },
    flexitem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        flexWrap: 'wrap'
    },
    productnametext: {
        color: '#000000B2',
        fontFamily: Fonts.semibold,
        fontSize: 14
    },
    productprice: {
        color: '#124191',
        fontFamily: Fonts.semibold,
        fontSize: 12
    },
    productrating: {
        color: '#000000',
        fontFamily: Fonts.medium,
        fontSize: 12
    },
})

export default SingleProduct