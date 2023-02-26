import React from "react";
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TouchableWithoutFeedback,
    ScrollView,
    KeyboardAvoidingView
} from "react-native";
import {Button, Paragraph, TextInput, useTheme} from "react-native-paper";
import globalStyles from "../styles";
import {Keyboard} from 'react-native'

import Toast from 'react-native-toast-message';
import Loading from "../component/modal-loading";
import HttpService from "../services/http-service";
import {useRoute} from "@react-navigation/native";


function VerifyMail({navigation}) {
    const route = useRoute();

    const [code, setCode] = React.useState("");
    const theme = useTheme();
    const [visibleResendLoading, setVisibleResendLoading] = React.useState(false);
    const [visibleCreateUserLoading, setVisibleCreateUserLoading] = React.useState(false);
    const [isUnauthorizedUserModal, setUnauthorizedUserModal] = React.useState(false);
    const [visibleLoading, setVisibleLoading] = React.useState(false);
    const [isCodeValid, setIsCodeValid] = React.useState(true);
    //
    // React.useEffect(() => {
    //     return navigation.addListener("focus", () => {
    //         setCode('');
    //         setIsCodeValid(true);
    //     });
    // }, [navigation]);

    function checkCodeOfVerifyMail() {
        setVisibleLoading(true);
        HttpService.checkCodeOfVerifyMail({mail: route.params.email, code}).then(res => {
            setVisibleLoading(false);
            if (route.params.type === 'createUser') {
                createUser();

            } else {
                navigation.navigate('NewPassword', {email: route.params.email});

            }
        }).catch((err) => {

            setIsCodeValid(false);
            setVisibleLoading(false);
        }).finally(() => {

            setVisibleLoading(false);
        })
    }

    function resendMail() {
        setVisibleResendLoading(true);
        HttpService.sendCode({email: route.params.email}).then(user => {
            setVisibleResendLoading(false);
        }).catch((err) => {
            Toast.show({
                    type: 'error',
                    message: 'שליחת קוד נכשלה'
                }
            );
        }).finally(() => {
            setVisibleResendLoading(false);
        })
    }

    function createUser() {
        setVisibleCreateUserLoading(false);
        HttpService.registration(route.params.user)
            .then(() => {
                navigation.navigate('HomePage')
            })
            .catch((err) => {
                navigation.navigate('HomePage')

                Toast.show({
                    type: "error",
                    text1: err.response.data || "קיימת בעיית תקשורת עם השרת",
                });
                setVisibleCreateUserLoading(false);
            });
    }

    return (
        <ImageBackground style={globalStyles.imageBackground}>
            <View style={styles.textComponent}>
                <KeyboardAvoidingView behavior={"padding"}>
                    <ScrollView style={{height: '100%'}}>
                        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>
                            <View>
                                <Text style={[styles.mailSentMessage, {color: theme.colors.generalText}]}>
                                    ברגעים אלה נשלח אליך קוד אימות למייל
                                </Text>
                                <Text style={[styles.mailSentMessage, {color: theme.colors.generalText}]}>
                                </Text>
                                <View style={styles.mainContainer}>
                                    <TextInput
                                        underlineColor={"gray"}
                                        activeUnderlineColor={"gray"}
                                        style={styles.container}
                                        label={"קוד אימות"}
                                        value={code}
                                        onChangeText={code => {
                                            setIsCodeValid(true);
                                            setCode(code)
                                        }}
                                    />
                                    {(!isCodeValid ? <Paragraph
                                            style={[styles.validationFail, globalStyles.errorColor]}
                                            color={theme.colors.error}
                                        >הקוד שגוי</Paragraph> :
                                        <Paragraph
                                            style={[styles.validationFail, globalStyles.errorColor]}> </Paragraph>)
                                    }
                                    <Button
                                        color={theme.colors.buttonText}
                                        style={[styles.generalButton, styles.forgotPasswordButton]}
                                        onPress={() => resendMail()}>
                                        לא קיבלתי קוד למייל
                                    </Button>
                                    <Button
                                        color={theme.colors.buttonText}
                                        style={[globalStyles.buttonBackground, styles.generalButton, styles.enterButton]}
                                        onPress={() => checkCodeOfVerifyMail()}>
                                        אישור
                                    </Button>
                                </View>
                                <Loading visibleLoading={visibleLoading} setVisibleLoading={setVisibleLoading}
                                         message={'בודק קוד'}/>
                                <Loading visibleLoading={visibleResendLoading}
                                         setVisibleLoading={setVisibleResendLoading}
                                         message={'שולח קוד חדש'}/>
                                <Loading visibleLoading={visibleCreateUserLoading}
                                         setVisibleLoading={setVisibleCreateUserLoading}
                                         message={'משתמש חדש נוצר ברגעים אלו'}/>
                            </View>
                        </TouchableWithoutFeedback>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </ImageBackground>
    );
}


const styles = StyleSheet.create({
    textComponent: {
        paddingTop: 100,
    },
    mainContainer: {
        marginTop: 100
    },
    validationFail: {
        marginLeft: 22,
        direction: "rtl",
        outlineWidth: 50,
    },
    mailSentMessage: {
        fontWeight: "bold",
        fontSize: 18,
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
        marginTop: 100,
    },
    textRight: {
        textAlign: "right",
    },
});

export default VerifyMail;
