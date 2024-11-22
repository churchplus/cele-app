import { Dimensions } from "react-native";
import { ChurchProfile } from "../services/dashboard";
import { tenantId } from "../utils/config";

export const width = Dimensions.get('window').width;
export const height = Dimensions.get('window').height;
export const COLORS = {
     primary: '#312177',
    white: '#fff',
    black: '#000',
    dark: '#2D2D2E',
    dark2: '#222222',
    gray: '#D9D9D980',
    accent: "#F76800",
    green: "#8FFA08",
    async setPrimary() {
        
        try {
            let { data } = await ChurchProfile(tenantId);
            if (!data) return;
            if (!data.returnObject.churchAppBackgroundColor || data.returnObject.churchAppBackgroundColor == 'null') {
                console.log('no color set')
            } else {
                console.log('color set')
                this.primary = data.returnObject.churchAppBackgroundColor
            }
        } catch (error) {
            console.log(error);
        }
    }
}
// COLORS.setPrimary();

export const Light = {
    selectedColor: '#d0ebc5',
    textColor: '#000',
    backColor: '#fff',
    grey: '#333'
}
export const Dack = {
    textColor: '#fff',
    backColor: '#000'
}

export const Fonts = {
    black: "Inter-Black",
    extrabold: "Inter-ExtraBold",
    bold: "Inter-Bold",
    semibold: "Inter-SemiBold",
    medium: "Inter-Medium",
    light: "Inter-Light",
    regular: "Inter-Regular",
    aclonica: "Aclonica-Regular",
}



// const getChurchProfile = async () => {
//     const tenantId = "b1ca6f51-be6c-45ad-b8c0-3bd7291803e7"
//     try {
//         let { data } = await ChurchProfile(tenantId);
//         console.log(data.returnObject.churchAppBackgroundColor, 'prfile')
//         if (!data) return;
//     } catch (error) {
//         console.log(error);
//     }
// }
// getChurchProfile()
