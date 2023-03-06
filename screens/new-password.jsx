import React from "react";
import {
    View,
    StyleSheet,
    ImageBackground,
    KeyboardAvoidingView,
    ScrollView,
    TouchableWithoutFeedback, Text
} from "react-native";
import {Button, Paragraph, TextInput} from "react-native-paper";
import {useTheme} from 'react-native-paper';
import globalStyles from "../styles";
import {Keyboard} from 'react-native'
import Toast from 'react-native-toast-message';
import Loading from "../component/modal-loading";

function NewPasswordScreen({navigation}) {
    const theme = useTheme();
    const [password, setPassword] = React.useState("");
    const [passwordValidation, setPasswordValidation] = React.useState("");
    const [passwordVisible, setPasswordVisible] = React.useState(true);
    const [passwordValidationVisible, setPasswordValidationVisible] = React.useState(true);
    const [paragraphDisable, setParagraphDisable] = React.useState(false);
    const [onBlurPass, setOnBlurPass] = React.useState(false);
    const [visibleLoading, setVisibleLoading] = React.useState(false);

    function updatePassword() {
        if (password.length >= 8 && password === passwordValidation) {
            navigation.navigate('HomePage')

            Toast.show({
                    type: 'success',
                    text1: 'סיסמה עומדת בתנאים'
                }
            );
        } else {
            Toast.show({
                type: 'error',
                    text1: 'סיסמה לא עומדת בתנאים'
                }
            );
        }
    }

    return (
        <ImageBackground style={globalStyles.imageBackground}>
            <View>
                <KeyboardAvoidingView behavior={"padding"}>
                    <ScrollView style={{height: '100%'}}>
                        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>
                            <View>
                                <View><Text>אימות ססמה</Text></View>

                                <View style={[styles.mainContainer]}>
                                    <TextInput
                                        secureTextEntry={passwordVisible}
                                        selectionColor={undefined}
                                        outlineColor={"gray"}
                                        activeOutlineColor={"gray"}
                                        style={styles.container}
                                        label={<Text>ססמא</Text>}
                                        value={password}
                                        mode={"outlined"}
                                        onBlur={() => setOnBlurPass(true)}
                                        onChangeText={password => setPassword(password)}
                                        right={<TextInput.Icon name={passwordVisible ? "eye" : "eye-off"}
                                                               onPress={() => setPasswordVisible(!passwordVisible)}/>}
                                    />
                                    {
                                        (onBlurPass && password.length <= 7 ? <Text
                                            style={[styles.validationFail, globalStyles.errorColor]}
                                            color={theme.colors.error}
                                        > סיסמה חלשה (8 תווים ומעלה)</Text> : <Paragraph> </Paragraph>)
                                    }

                                    <TextInput
                                        secureTextEntry={passwordValidationVisible}
                                        selectionColor={undefined}
                                        outlineColor={"gray"}
                                        activeOutlineColor={"gray"}
                                        style={styles.container}
                                        label={<Text>אימות סיסמה</Text>}
                                        value={passwordValidation}
                                        mode={"outlined"}
                                        onBlur={() => {
                                            if (passwordValidation !== password) {
                                                setParagraphDisable(true)
                                            }
                                        }}
                                        onChangeText={password => {
                                            setPasswordValidation(password);
                                            setParagraphDisable(false)
                                        }}
                                        right={
                                            <TextInput.Icon name={passwordValidationVisible ? "eye" : "eye-off"}
                                                            onPress={() => setPasswordValidationVisible(!passwordValidationVisible)}/>
                                        }
                                    />
                                    {
                                        (paragraphDisable ? <Text
                                            style={[styles.validationFail, globalStyles.errorColor]}
                                            color={theme.colors.error}
                                        >הסיסמה אינה זהה לסיסמה הקודמת</Text> : <Paragraph> </Paragraph>)
                                    }
                                    <Button
                                        color={theme.colors.buttonText}
                                        mode={"outlined"}
                                        style={[globalStyles.buttonBackground, styles.generalButton, styles.enterButton]}
                                        onPress={() => updatePassword()}>
                                        <Text>עדכון סיסמה</Text>
                                    </Button>
                                </View>
                                <Loading visibleLoading={visibleLoading} setVisibleLoading={setVisibleLoading}
                                         message={'מעדכן סיסמה  '}/>
                            </View>
                        </TouchableWithoutFeedback>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </ImageBackground>
    );
}


const styles = StyleSheet.create({
    generalButton: {
        marginTop: 15,
        marginLeft: 100,
        marginRight: 100,
    },
    validationFail: {
        marginLeft: 22,
        direction: "rtl",
        outlineWidth: 50,
    },
    mainContainer: {
        marginTop: 180,
        color: 'black'
    },
    container: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
    },
    enterButton: {
        marginTop: 150
    }
});

export default NewPasswordScreen;





