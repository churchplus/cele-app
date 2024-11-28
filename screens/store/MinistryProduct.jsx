import React, { useState } from 'react'
import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import CustomStatusBar from '../reusables/StatusBar'
import { COLORS } from '../../assets/Theme'
import { StackHeader } from '../reusables'
import Input from '../reusables/Input'
import SingleProduct from '../../components/ecommerce/SingleProduct'

const MinistryProduct = ({ route }) => {
    const { data } = route.params;
    const [searchText, setSearchText] = useState("");

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
            <CustomStatusBar backgroundColor={COLORS.dark2} translucent={false} barStyle={'light-content'} />
            <StackHeader title={data} goBack={() => navigation.goBack()} headerGradient />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    <View style={styles.searchForm}>
                        <Input
                            placeholder="Search"
                            icon={'search'}
                            onChangeText={setSearchText}
                            value={searchText}
                            style={{
                                backgroundColor: '#F5F5F5'
                            }}
                        />
                    </View>
                    <View style={styles.sideContainer}>
                        <FlatList
                            data={[1, 2, 3, 4, 5]}
                            keyExtractor={(item, index) => index}
                            renderItem={({ item }) => (
                                <SingleProduct />
                            )}
                            numColumns={2}
                            scrollEnabled={false}
                            contentContainerStyle={{ rowGap: 20 }}
                            columnWrapperStyle={{ flex: 1, justifyContent: 'space-between' }}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    searchForm: {
        marginHorizontal: 15,
        borderRadius: 10,
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center'
    },
    sideContainer: {
        paddingHorizontal: 15,
        marginTop: 20,
        marginBottom: 30
    }
})

export default MinistryProduct