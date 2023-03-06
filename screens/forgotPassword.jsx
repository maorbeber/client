import React from "react";
import {
    StyleSheet,
    ImageBackground,
    TouchableWithoutFeedback,
    Text,
    View,
    ScrollView,
    KeyboardAvoidingView
} from "react-native";
import {Button, Paragraph, TextInput, useTheme} from "react-native-paper";
import validator from "validator/es";
import globalStyles from "../styles";
import {Keyboard} from 'react-native'

import Toast from 'react-native-toast-message';
import Loading from "../component/modal-loading";
import HttpService from "../services/http-service";

function ForgotPassword({navigation}) {
    const [email, setEmail] = React.useState('');
    const [visibleLoading, setVisibleLoading] = React.useState(false);
    const [isValidEmail, setIsValidEmail] = React.useState(true);
    const [error, setError] = React.useState({hasError: false, errorMessage: ''});

    const theme = useTheme();

    // React.useEffect(() => {
    //         setEmail(route.params.email)
    //     }, [navigation]
    // );
    // React.useEffect(() => {
    //     return navigation.addListener("focus", () => {
    //         setError({errorMessage: '', hasError: false});
    //         setIsValidEmail(true);
    //     });
    // }, [navigation]);

    function sendCode() {
        navigation.navigate('VerifyMail', {type: 'forgotPassword', email: email})

    }


    return (
        <ImageBackground style={globalStyles.imageBackground}>

            <View>
                <KeyboardAvoidingView behavior={"padding"}>
                    <ScrollView style={{height: '100%'}}>
                        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>
                            <View>
                                <Text style={[styles.titleQuestion, {color: theme.colors.generalText}]}>
                                    שכחת את הסיסמה?
                                </Text>
                                <Text style={[styles.enterEmailText, {color: theme.colors.generalText}]}>
                                    יש להזין את כתובת המייל לשחזור הסיסמה
                                </Text>
                                <View style={styles.mainContainer}>
                                    <TextInput
                                        outlineColor={"gray"}
                                        activeOutlineColor={"gray"}
                                        style={styles.container}
                                        label={<Text>מייל</Text>}
                                        value={email}
                                        mode={"outlined"}
                                        onChangeText={email => {
                                            setEmail(email)
                                            setError({hasError: false, errorMessage: ''})
                                            if (validator.isEmail(email)) {
                                                setIsValidEmail(true);
                                            }
                                        }}
                                        onBlur={() => {
                                            if (!validator.isEmail(email)) {
                                                setIsValidEmail(false);
                                            }
                                        }}
                                    />
                                    {
                                        (!isValidEmail ? <Text
                                                style={[styles.validationFail, globalStyles.leftText, globalStyles.errorColor]}
                                                color={theme.colors.error}
                                            >יש להזין מייל תקין</Text> :
                                            (error.hasError ? <Paragraph
                                                    style={[styles.validationFail, globalStyles.errorColor]}
                                                    color={theme.colors.error}
                                                >{error.errorMessage}</Paragraph> :
                                                <Paragraph
                                                    style={[styles.validationFail, globalStyles.errorColor]}> </Paragraph>))
                                    }


                                    <Button
                                        color={theme.colors.buttonText}
                                        mode={"outlined"}
                                        style={[globalStyles.buttonBackground, styles.generalButton, styles.enterButton]}
                                        onPress={() => {
                                            if (validator.isEmail(email)) {
                                                sendCode()
                                            }
                                        }
                                        }>
                                        <Text>קבל קוד</Text>
                                    </Button>
                                </View>
                                <Loading visibleLoading={visibleLoading} setVisibleLoading={setVisibleLoading}
                                         message={'שולח קוד למייל'}/>
                            </View>
                        </TouchableWithoutFeedback>

                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        marginTop: 100
    },
    validationFail: {
        marginLeft: 22,
        direction: "rtl",
        outlineWidth: 50,
    },
    titleQuestion: {
        marginTop: 100,
        fontWeight: "bold",
        fontSize: 30,
        textAlign: "center"
    },
    enterEmailText: {
        marginTop: 20,
        fontWeight: "bold",
        fontSize: 15,
        textAlign: "center"
    },
    container: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        outlineWidth: 50,
    },
    generalButton: {
        marginTop: 10,
        marginLeft: 100,
        marginRight: 100,
    },
    enterButton: {
        marginTop: 40,
        marginRight: "25%",
        marginLeft: "25%",
    }
});

export default ForgotPassword;
