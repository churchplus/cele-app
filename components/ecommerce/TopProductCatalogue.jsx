import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Fonts } from '../../assets/Theme'
import SingleProduct from './SingleProduct'
import { useNavigation } from '@react-navigation/native'

const TopProductCatalogue = ({ type }) => {
    const navigation = useNavigation();
    return (
        <View>
            <Text style={styles.categoryheader}>Top in {type}</Text>
            <View style={styles.productwrapper}>
                <FlatList
                    data={[1, 2, 3, 4, 5]}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item }) => (
                        <SingleProduct />
                    )}
                    numColumns={2}
                    contentContainerStyle={{ rowGap: 20 }}
                    columnWrapperStyle={{ flex: 1, justifyContent: 'space-between' }}
                />
            </View>
            <TouchableOpacity style={styles.viewall} onPress={() => navigation.navigate('MinistryProduct', { data: `All ${type}`})}>
                <Text style={styles.viewalltext}>View all {type}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    categoryheader: {
        fontFamily: Fonts.semibold,
        marginTop: 20,
        color: "#000000"
    },
    productwrapper: {
        marginTop: 10
    },
    viewall: {
        borderWidth: 1,
        borderColor: '#000000B2',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        marginVertical: 20
    },
    viewalltext: {
        fontFamily: Fonts.medium,
        color: '#000000B2',
        fontSize: 15
    }
})

export default TopProductCatalogue;