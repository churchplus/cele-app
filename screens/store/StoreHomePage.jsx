import { ScrollView, StyleSheet, Text, View, SafeAreaView, Image, FlatList } from "react-native";
import { COLORS, Fonts } from "../../assets/Theme";
import { useState } from "react";
import Input from "../reusables/Input";
import { StoreAudioIcon, StoreBookIcon, StoreVideoIcon } from "../../assets/img/icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import TopProductCatalogue from "../../components/ecommerce/TopProductCatalogue";

const StoreHomePage = () => {
    const [searchText, setSearchText] = useState("")
    const list = [1, 2, 3, 4, 5, 6]
    const categorybutton = [
        { name: 'Video', icon: 'video' },
        { name: 'Audio', icon: 'audio' },
        { name: 'Book', icon: 'book' },
        { name: 'Podcast', icon: 'audio' },
    ]
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <View style={[styles.sideContainer, { backgroundColor: COLORS.white }]}>
                    <View style={styles.searchForm}>
                        <Input placeholder="Search for videos, audios, books..." icon={'search'} onChangeText={setSearchText} value={searchText} />
                    </View>
                    <View style={styles.herocontainer}>
                        <FlatList
                            data={list}
                            renderItem={({ item, index }) => (
                                <Image source={require("../../assets/img/storehero.png")} resizeMode="contain" />
                            )}
                            keyExtractor={(item, index) => index}
                            contentContainerStyle={{ columnGap: 7 }}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                    <View>
                        <Text style={styles.categoryheader}>Category</Text>
                        <View style={styles.categorycontainer}>
                            <FlatList
                                data={categorybutton}
                                renderItem={({ item, index }) => (
                                    <TouchableOpacity >
                                        <View style={styles.categorybutton}>
                                            {
                                                item.icon === 'video' ?
                                                    <StoreVideoIcon /> :
                                                    item.icon === 'audio' ?
                                                        <StoreAudioIcon /> :
                                                        <StoreBookIcon />

                                            }
                                            <Text style={styles.categorybuttontext}>{item.name}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )}
                                keyExtractor={(item, index) => index}
                                contentContainerStyle={{ columnGap: 7 }}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            />

                        </View>
                    </View>
                </View>
                <View style={styles.bestsellersection}>
                    <Text style={styles.categoryheader}>Best Sellers</Text>
                    <FlatList
                        data={categorybutton}
                        renderItem={({ item, index }) => (
                            <View style={styles.bestsellercard}>
                                <Image source={require('../../assets/img/book_cover.png')} style={styles.productImage} resizeMode="cover" />
                                <Text style={styles.productcategorytext}>Book</Text>
                                <Text style={styles.productnametext}>A Journey Through Grief, Loss, Hope And Recovery</Text>
                                <View style={styles.flexitem}>
                                    <Text style={styles.productprice}>NGN 15,000</Text>
                                    <Text style={styles.productrating}>4.5 rating</Text>
                                </View>
                            </View>
                        )}
                        keyExtractor={(item, index) => index}
                        contentContainerStyle={{ columnGap: 10 }}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
                <View style={styles.topproducts}>
                    <TopProductCatalogue type="Books"/>
                    <TopProductCatalogue type="Audio"/>
                    <TopProductCatalogue type="Video"/>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    sideContainer: {
        padding: 15,
        paddingBottom: 20
    },
    searchForm: {
        borderRadius: 10,
        flexDirection: 'row',
    },
    herocontainer: {
        marginTop: 15
    },
    categoryheader: {
        fontFamily: Fonts.semibold,
        marginTop: 20,
        color: "#000000"
    },
    categorycontainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
        gap: 10
    },
    categorybutton: {
        borderWidth: 1,
        borderColor: "#0000001A",
        borderRadius: 10,
        flexDirection: "row",
        paddingHorizontal: 15,
        paddingVertical: 8,
        gap: 8,
        alignItems: "center"
    },
    categorybuttontext: {
        color: "#51618C",
        fontFamily: Fonts.medium
    },
    bestsellersection: {
        backgroundColor: '#f3f3f3',
        paddingHorizontal: 15,
        paddingBottom: 20
    },
    bestsellercard: {
        backgroundColor: COLORS.white,
        padding: 10,
        marginTop: 10,
        width: 160,
        borderRadius: 10
    },
    productcategorytext: {
        fontFamily: Fonts.medium,
        color: '#0000004D',
        marginTop: 10,
        fontSize: 14
    },
    productnametext: {
        color: '#000000B2',
        fontFamily: Fonts.semibold,
        fontSize: 14
    },
    flexitem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        flexWrap: 'wrap'
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
    productImage: {
        width: 140,
        height: 150,
        borderWidth: 1,
        borderRadius: 5
    },
    topproducts: {
        backgroundColor: COLORS.white,
        paddingHorizontal: 15
    }
})

export default StoreHomePage;