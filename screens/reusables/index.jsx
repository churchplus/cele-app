import { View, Text, TouchableOpacity } from "react-native";
import { COLORS } from "../../assets/Theme";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Fonts } from "../../assets/Theme";
import LinearGradient from "react-native-linear-gradient";

export const StackHeader = ({ goBack, title, newStack, headerRight, headerGradient }) => {
    return (
        <View style={{ backgroundColor: COLORS.dark2 }}>
            <View style={{ paddingTop: 15, paddingHorizontal: newStack ? 15 : 0 }}>
                <Text style={{ fontFamily: Fonts.medium, color: COLORS.white, textAlign: newStack ? 'left' : 'center', fontSize: 15, fontFamily: Fonts.semibold, color: "#FFFFFF" }}>{title}</Text>
                {
                    !newStack ? (
                        <TouchableOpacity onPress={goBack} style={{ position: 'relative', bottom: 20, left: 20, width: 40 }}>
                            <Icon name={"arrow-back-ios"} color={COLORS.white} size={20} />
                        </TouchableOpacity>
                    ) : null
                }
                {
                    headerRight ? (
                        <View style={{ position: "absolute", right: 20, top: 17 }} >
                            {headerRight}
                        </View>
                    ) : null
                }
                {
                    headerGradient && (
                        <LinearGradient
                            colors={[COLORS.green, '#ffffff']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{ top: 0, left: 0, right: 0, bottom: 0, height: 10 }}
                        />
                    )
                }
            </View>
        </View>
    );
}