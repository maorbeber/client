import React from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView, Text,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";
import { TextInput, Button, Paragraph } from "react-native-paper";
import validator from "validator/es";
import { useTheme } from "react-native-paper";
import globalStyles from "../styles";
import { Keyboard } from "react-native";

import Toast from 'react-native-toast-message';
import Loading from "../component/modal-loading";
import HttpService from "../services/http-service";

function RegistrationScreen({navigation}) {
  const theme = useTheme();

  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordValidation, setPasswordValidation] = React.useState("");
  const [passwordVisible, setPasswordVisible] = React.useState(true);
  const [passwordValidationVisible, setPasswordValidationVisible] =
    React.useState(true);
  const [isValidVerificationPassword, setIsValidVerificationPassword] =
    React.useState(true);
  const [isValidPassword, setIsValidPassword] = React.useState(true);
  const [visibleLoading, setVisibleLoading] = React.useState(false);
  const [visibleSendMailLoading, setVisibleSendMailLoading] = React.useState(false);
  const [isUserRegistered, setIsUserRegistered] = React.useState(false);
  const [userId, setUserId] = React.useState("");
  const [isValidUserName, setIsValidUserName] = React.useState(true);
  const [isUpdateScreen, setIsUpdateScreen] = React.useState(false);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = React.useState(true);
  const [isValidMail, setIsValidMail] = React.useState(true);
  const regexUserName = new RegExp("^.*[a-zA-Z\u0590-\u05FF\u200f\u200e ]+.*$");
  const regexPhoneNumber = new RegExp("05[0-9]{8}$");

  // React.useEffect(() => {
  //   return navigation.addListener("focus", () => {
  //     setInputAsValid();
  //     setDefaultValues();
  //   });
  // }, [navigation]);

  return (
    <ImageBackground style={globalStyles.imageBackground}>
      <KeyboardAvoidingView behavior={"padding"} >
        <ScrollView>
          <TouchableWithoutFeedback
            onPress={() => Keyboard.dismiss()}
            accessible={false}
          >
            <View>
              <ScrollView>
                <View style={styles.mainContainer}>

                  <TextInput
                    outlineColor={"gray"}
                    activeOutlineColor={"gray"}
                    style={[
                      styles.container,
                      styles.textRight,
                      isUpdateScreen ? { marginTop: 150 } : { marginTop: 70 },
                    ]}
                    label={<Text>שם מלא</Text>}
                    value={username}
                    mode={"outlined"}
                    onBlur={() => {
                      if (!regexUserName.test(username)) {
                        setIsValidUserName(false);
                      }
                    }}
                    onChangeText={(username) => {
                      setUsername(username);
                      if (regexUserName.test(username)) {
                        setIsValidUserName(true);
                      }
                    }}
                  />
                  {!isValidUserName ? (
                    <Paragraph
                      style={[styles.validationFail, globalStyles.errorColor]}
                      color={theme.colors.error}
                    >
                      יש להזין שם מלא
                    </Paragraph>
                  ) : (
                    <Paragraph
                      style={[styles.validationFail, globalStyles.errorColor]}
                    >
                      {" "}
                    </Paragraph>
                  )}
                  <TextInput
                    outlineColor={"gray"}
                    activeOutlineColor={"gray"}
                    style={[styles.container, styles.textLeft]}
                    label={<Text>טלפון</Text>}
                    value={phoneNumber}
                    mode={"outlined"}
                    onBlur={() => {
                      if (!regexPhoneNumber.test(phoneNumber)) {
                        setIsValidPhoneNumber(false);
                      }
                    }}
                    onChangeText={(phoneNumber) => {
                      setPhoneNumber(phoneNumber);
                      if (regexPhoneNumber.test(phoneNumber)) {
                        setIsValidPhoneNumber(true);
                      }
                    }}
                  />
                  {!isValidPhoneNumber ? (
                    <Paragraph
                      style={[styles.validationFail, globalStyles.errorColor]}
                      color={theme.colors.error}
                    >
                      יש להזין טלפון תקין
                    </Paragraph>
                  ) : (
                    <Paragraph
                      style={[styles.validationFail, globalStyles.errorColor]}
                    >
                      {" "}
                    </Paragraph>
                  )}
                  {!isUpdateScreen ? (
                    <View>
                      <TextInput
                        outlineColor={"gray"}
                        activeOutlineColor={"gray"}
                        style={[styles.container]}
                        label={<Text>מייל</Text>}
                        value={email}
                        onBlur={() => {
                          if (!validator.isEmail(email)) {
                            setIsValidMail(false);
                          }
                        }}
                        mode={"outlined"}
                        onChangeText={(email) => {
                          setEmail(email);
                          setIsUserRegistered(false);
                          if (validator.isEmail(email)) {
                            setIsValidMail(true);
                          }
                        }}
                      />

                        <Paragraph
                          style={[
                            styles.validationFail,
                            globalStyles.errorColor,
                          ]}
                          color={theme.colors.error}
                        >
                          יש להזין מייל תקין
                        </Paragraph>

                      <TextInput
                        secureTextEntry={passwordVisible}
                        selectionColor={undefined}
                        outlineColor={"gray"}
                        activeOutlineColor={"gray"}
                        style={[styles.container]}
                        label={<Text>סיסמא (8 תווים)</Text>}
                        value={password}
                        mode={"outlined"}
                        onBlur={() => {
                          if (password.length < 8) {
                            setIsValidPassword(false);
                          }
                        }}
                        onChangeText={(password) => setPassword(password)}
                        right={
                          <TextInput.Icon
                            name={passwordVisible ? "eye" : "eye-off"}
                            onPress={() => setPasswordVisible(!passwordVisible)}
                          />
                        }
                      />
                      {!isValidPassword ? (
                        <Paragraph
                          style={[
                            styles.validationFail,
                            globalStyles.errorColor,
                          ]}
                          color={theme.colors.error}
                        >
                          {" "}
                          סיסמה חלשה(8 תווים ומעלה)
                        </Paragraph>
                      ) : (
                        <Paragraph
                          style={[
                            styles.validationFail,
                            globalStyles.errorColor,
                          ]}
                        >
                          {" "}
                        </Paragraph>
                      )}

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
                            setIsValidVerificationPassword(false);
                          }
                        }}
                        onChangeText={(password) => {
                          setPasswordValidation(password);
                          setIsValidVerificationPassword(true);
                        }}
                        right={
                          <TextInput.Icon
                            name={passwordValidationVisible ? "eye" : "eye-off"}
                            onPress={() =>
                              setPasswordValidationVisible(
                                !passwordValidationVisible
                              )
                            }
                          />
                        }
                      />
                      {!isValidVerificationPassword ? (
                        <Paragraph
                          style={[
                            styles.validationFail,
                            globalStyles.errorColor,
                          ]}
                          color={theme.colors.error}
                        >
                          הסיסמה אינה זהה לסיסמה הקודמת
                        </Paragraph>
                      ) : (
                        <Paragraph
                          style={[
                            styles.validationFail,
                            globalStyles.errorColor,
                          ]}
                        >
                          {" "}
                        </Paragraph>
                      )}
                    </View>
                  ) : null}
                  <Button
                    color={theme.colors.buttonText}
                    mode={"outlined"}
                    style={[
                      globalStyles.buttonBackground,
                      styles.generalButton,
                      styles.enterButton,
                      isUpdateScreen ? { marginTop: 150 } : { marginTop: 0 },
                    ]}
                    onPress={() => {
                      saveUser();
                    }}
                  >
                    <Text>{isUpdateScreen ? "עדכון" : "הירשם"}</Text>
                  </Button>
                  <Loading
                      visibleLoading={visibleLoading}
                      setVisibleLoading={setVisibleLoading}
                      message={"עדכון המשתמש מתבצע"}
                  />
                  <Loading
                      visibleLoading={visibleSendMailLoading}
                      setVisibleLoading={setVisibleSendMailLoading}
                      message={"שולח מייל אימות"}
                  />
                </View>
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );

  function saveUser() {
    if (isValidInput()) {
    createUser()
    }
  }

  function createUser() {
    setVisibleSendMailLoading(true)
    HttpService.sendCode({email: email}).then(user => {
      navigation.navigate('VerifyMail', {type: 'createUser',
        email: email,
        user: {
          name: username,
          mail: email,
          location: {
            latitude: 32.32323,
            longitude: 32.65655,
          },
          phoneNumber: phoneNumber,
          password: password,
        } })
      //   does not all fields in user
    }).catch((err) => {
      Toast.show({
            type: 'error',
            text1: '            שליחת קוד נכשלה       '
          }
      );
    }).finally(() => {
      setVisibleSendMailLoading(false);
    })
  }

  function isValidInput() {
    setInputAsValid();
    let isValidInput = true;

    if (!regexUserName.test(username)) {
      setIsValidUserName(false);
      isValidInput = false;
    }
    if (!regexPhoneNumber.test(phoneNumber)) {
      setIsValidPhoneNumber(false);
      isValidInput = false;
    }
    if (!validator.isEmail(email)) {
      setIsValidMail(false);
      isValidInput = false;
    }
    if (password.length <= 7 && !isUpdateScreen) {
      isValidInput = false;
      setIsValidPassword(false);
    }
    if (passwordValidation !== password && !isUpdateScreen) {
      isValidInput = false;
      setIsValidVerificationPassword(false);
    }

    return isValidInput;
  }

  function setInputAsValid() {
    setIsValidPhoneNumber(true);
    setIsValidMail(true);
    setIsValidUserName(true);
    setIsValidVerificationPassword(true);
    setIsValidPassword(true);
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    height: 720,
  },
  validationFail: {
    direction: "rtl",
    marginLeft: 20,
    marginTop: 0,
    fontFamily: 'Inter-Heebo'
  },
  textRight: {
    textAlign: "right",
  },
  textLeft: {
    textAlign: "left",
  },
  container: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    outlineWidth: 50,
  },
  generalButton: {
    marginTop: 10,
    marginLeft: 100,
    marginRight: 100,
  },
  loginAssSoldierButton: {
    marginTop: 5,
    marginRight: 5,
    marginLeft: 220,
  },
  enterButton: {
    marginTop: 60,
  },
  createUserButton: {
    marginRight: 85,
    marginLeft: 85,
  },
  forgotPasswordButton: {
    marginRight: 20,
    marginLeft: 230,
    marginTop: 5,
  },
  extraButtons: {
    marginTop: 150,
  },
});

export default RegistrationScreen;
