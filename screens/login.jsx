import React from "react";
import {
    View,
    StyleSheet,
    TouchableWithoutFeedback,
    ImageBackground,
    KeyboardAvoidingView,
    ScrollView, Text
} from "react-native";
import {TextInput, Button, Paragraph} from "react-native-paper";
import validator from "validator/es";
import {useTheme} from 'react-native-paper';
import globalStyles from "../styles";
import {Keyboard} from 'react-native'
import Loading from "../component/modal-loading";
import HttpService from "../services/http-service";
import Toast from 'react-native-toast-message';

function LoginScreen({navigation}) {
    const theme = useTheme();
    const [passwordVisible, setPasswordVisible] = React.useState(true);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [visibleLoading, setVisibleLoading] = React.useState(false);
    const [isValidMail, setIsValidMail] = React.useState(true);
    const [isValidPassword, setIsValidPassword] = React.useState(true);

    // React.useEffect(() => {
    //     return navigation.addListener("focus", () => {
    //         setEmail('');
    //         setPassword('');
    //         setIsValidMail(true);
    //         setIsValidPassword(true);
    //     });
    // }, [navigation]);


    return (
            <View>
                <KeyboardAvoidingView behavior={"padding"}>
                    <ScrollView>
                        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>
                            <View>
                                <View style={styles.mainContainer}>
                                    <TextInput
                                        outlineColor={"gray"}
                                        activeOutlineColor={"gray"}
                                        style={styles.container}
                                        label={<Text>מייל</Text>}
                                        value={email}
                                        mode={"outlined"}
                                        onBlur={() => {
                                            if (!validator.isEmail(email)) {
                                                setIsValidMail(false);
                                            }
                                        }}
                                        onChangeText={email => {
                                            setEmail(email)
                                            if (validator.isEmail(email)) {
                                                setIsValidMail(true);
                                            }
                                        }}
                                    />
                                    {
                                        (!isValidMail ? <Text
                                                style={[styles.validationFail, globalStyles.leftText, globalStyles.errorColor]}
                                                color={theme.colors.error}
                                            >יש להזין מייל תקין</Text> :
                                            <Paragraph style={[styles.validationFail, globalStyles.errorColor]}> </Paragraph>)
                                    }
                                    <TextInput
                                        secureTextEntry={passwordVisible}
                                        selectionColor={undefined}
                                        outlineColor={"gray"}
                                        activeOutlineColor={"gray"}
                                        style={styles.container}
                                        label={<Text>ססמא</Text>}
                                        value={password}
                                        mode={"outlined"}
                                        onBlur={() => {
                                            if (password.trim() === '') {
                                                setIsValidPassword(false);
                                            }
                                        }}
                                        onChangeText={password => {
                                            setPassword(password)
                                            if (password.trim() !== '') {
                                                setIsValidPassword(true);
                                            }
                                        }}
                                        right={<TextInput.Icon name={passwordVisible ? "eye" : "eye-off"}
                                                               onPress={() => setPasswordVisible(!passwordVisible)}/>}
                                    />
                                    {
                                        (!isValidPassword ? <Text
                                                style={[styles.validationFail, globalStyles.leftText, globalStyles.errorColor]}
                                                color={theme.colors.error}
                                            >יש להזין סיסמא</Text> :
                                            <Paragraph style={[styles.validationFail, globalStyles.errorColor]}> </Paragraph>)
                                    }
                                    <Button
                                        color={theme.colors.buttonText}
                                        mode={"outlined"}
                                        style={[styles.generalButton, globalStyles.buttonBackground, styles.forgotPasswordButton]}
                                        onPress={() => navigation.navigate('ForgotPassword', {email})}>
                                        <Text> שכחתי סיסמא</Text>
                                    </Button>
                                    <Button
                                        color={theme.colors.buttonText}
                                        mode={"outlined"}
                                        style={[globalStyles.buttonBackground, styles.generalButton, styles.enterButton]}
                                        onPress={login}>
                                        <Text>כניסה</Text>
                                    </Button>
                                {/*</View>*/}
                                {/*<View style={styles.extraButtons}>*/}
                                    <Button
                                        color={theme.colors.buttonText}
                                        mode={"contained"}
                                        style={[styles.generalButton, styles.createUserButton]}
                                        onPress={() => navigation.navigate('Registration', {isUpdateScreen: false})}>
                                        <Text>יצירת משתמש</Text>
                                    </Button>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </ScrollView>
                </KeyboardAvoidingView>

                <Loading visibleLoading={visibleLoading} setVisibleLoading={setVisibleLoading}
                         message={'אנא המתן'}/>
            </View>


    );


    function login() {
        if (isValidData()) {
            navigation.navigate('HomePage')
            setVisibleLoading(true);
            HttpService.login({mail: email, password: password})
                .then((user) => {
                    navigation.navigate('HomePage')
                }).catch(err => {
                Toast.show({
                    type: 'error',
                    text1: err.message
                });
            }).finally(() => {
                setVisibleLoading(false)
            }
            )
        }
    }


    function isValidData() {
        let isValidInput = true;
        setInputAsValid();

        if (!validator.isEmail(email)) {
            setIsValidMail(false);
            isValidInput = false;
        }
        if (password.trim() === '') {
            setIsValidPassword(false);
            isValidInput = false;
        }

        return isValidInput;
    }

    function setInputAsValid() {
        setIsValidPassword(true);
        setIsValidMail(true);
    }
}


const styles = StyleSheet.create({
    mainContainer: {
        marginTop: 210
    },
    container: {
        marginLeft: 20,
        marginRight: 20,
        outlineWidth: 50,
        fontFamily: 'Inter-Heebo',
    },
    generalButton: {
        marginTop: 10,
        marginLeft: 100,
        marginRight: 100,
    },
    loginAssSoldierButton: {
        marginTop: 50,
        marginRight: 20,
        marginLeft: 200
    },
    enterButton: {
        marginRight: "25%",
        marginLeft: "25%",
        marginTop: 40,
    },
    createUserButton: {
        marginRight: "25%",
        marginLeft: "25%",
        marginTop: 20
    },
    validationFail: {
        direction: "rtl",
        marginLeft: 20,
        marginTop: 0
    },
    forgotPasswordButton: {
        marginRight: 20,
        marginLeft: 230,
        marginTop: 0
    },
    extraButtons: {
        marginTop: 150
    }
});

export default LoginScreen;
