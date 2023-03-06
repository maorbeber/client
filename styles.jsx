import {Dimensions, StyleSheet} from "react-native";

const globalStyles = StyleSheet.create({
    title: {
        fontFamily: 'Inter-Heebo',
        paddingTop: 50,
        alignItems:'center',
        justifyContent:'center',
        textAlign: 'center',
        color: '#9fba9a',
        fontSize: 30,
    },
    imageBackground: {
        resizeMode: 'cover',
        height: Dimensions.get("screen").height,
    },
    containerY: {
        flex: 1,
    },
    buttonBackground: {
        backgroundColor: "#e9e2ec"
    },
    errorColor: {
        color: "#ff5252"
    },
    p7 : {
        padding: 7,
        fontFamily: 'Inter-Heebo',
    },
    p2: {
        padding: 2,
        fontFamily: 'Inter-Heebo',
    },
    underline: {
        textDecorationLine: 'underline'
    },
    centerText : {
        fontFamily: 'Inter-Heebo',
        textAlign: 'center'
    },
    outline: {
        outline: '2px solid #579802'
    },
    leftText : {
        fontFamily: 'Inter-Heebo',
        textAlign: 'left'
    },
    rightText : {
        fontFamily: 'Inter-Heebo',
        textAlign: 'right'
    },
    rtlDirection: {
        fontFamily: 'Inter-Heebo',
        direction: 'rtl'
    },
    ltrDirection : {
        fontFamily: 'Inter-Heebo',
        direction: 'ltr'
    },
    fontFamilyApp : {
        fontFamily: 'Inter-Heebo'
    },
    rtlDirectionII: {
        fontFamily: 'Inter-Heebo',
        direction: 'rtl',
        textAlign: "right"
    },
});

export default globalStyles;
