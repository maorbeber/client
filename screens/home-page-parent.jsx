import React from "react";
import {Paragraph, Searchbar, DataTable, TouchableRipple, Colors} from "react-native-paper";
import {View, StyleSheet, Text, ScrollView, Linking, ImageBackground} from "react-native";
import {useTheme} from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import globalStyles from "../styles";

import Toast from 'react-native-toast-message';
import Loading from "../component/modal-loading";


function HomePageParent({navigation}) {
    const theme = useTheme();
    const [searchText, setSearchText] = React.useState("");
    const [users, setUsers] = React.useState([]);
    const [currentBabySitterDisplay, setCurrentBabySitterDisplay] = React.useState([
        {

        }
    ]);
    const [visibleLoading, setVisibleLoading] = React.useState(false);
    //
    // React.useEffect(() => {
    //     getAllBabySitter()
    // }, []);

    function getAllBabySitter() {

    }


    return (
        <ImageBackground style={globalStyles.imageBackground}>

            <View>
                <Searchbar
                    placeholder="חיפוש"
                    value={searchText}
                    onChangeText={(text) => {
                        if (users) {
                            setSearchText(text)
                            setCurrentBabySitterDisplay(users
                                // users.filter((user: object) => user.name.includes(text))
                            );
                            if (text.length === 0) {
                                setCurrentBabySitterDisplay(users);
                            }
                        }
                    }}
                />


                <View style={[styles.tableHeaders, {backgroundColor: theme.colors.backgroundGreen}]}>
                    <View style={styles.tableRow}>
                        <Paragraph style={[globalStyles.fontFamilyApp, styles.descriptionColumn]}>טלפון</Paragraph>
                        <Paragraph style={[globalStyles.fontFamilyApp, styles.titleColumn]}>שם</Paragraph>
                        <Paragraph style={styles.iconColumn}><Paragraph>#</Paragraph></Paragraph>

                    </View>
                </View>

                <ScrollView style={{height: '70%'}}
                            showsVerticalScrollIndicator={true}
                            indicatorStyle={"black"}
                            scrollEnabled={true}
                            vartical={true}>
                    {users.length > 0 ? currentBabySitterDisplay.map((user, index) => (
                        <TouchableRipple
                            style={styles.rowButton}
                            key={index}>
                            <View>
                                <View style={[styles.tableRow, {height: 90, width: '100%'}]}>

                                    <View style={styles.descriptionColumn}>
                                        <Paragraph style={globalStyles.rtlDirection}>{user?.phoneNumber}</Paragraph>
                                    </View>
                                    <View style={styles.titleColumn}>
                                        <Paragraph
                                            style={[globalStyles.centerText]}>{user.name}</Paragraph>
                                    </View>
                                    <View style={styles.iconColumn}>
                                        <Text>{index + 1}</Text>
                                    </View>
                                </View>
                                <View style={[styles.lineBetween, {borderBottomColor: theme.colors.backgroundGreen}]}/>
                            </View>
                        </TouchableRipple>
                    )) : <Paragraph style={[globalStyles.centerText, globalStyles.rtlDirection]}
                    >...לא קיימים עדיין אירועים</Paragraph>
                    }

                </ScrollView>

                <Loading
                    visibleLoading={visibleLoading}
                    setVisibleLoading={setVisibleLoading}
                    message={"אנא המתן"}
                />
            </View>
        </ImageBackground>
    );


}

export default HomePageParent;

const styles = StyleSheet.create({
    actionsTitle: {
        color: "black",
        display: "flex",
        flexDirection: "row",
        fontFamily: 'Inter-Heebo'
    },
    titleItemHeader: {
        color: "#425746",
        fontFamily: 'Inter-Heebo'
    },
    itemHeader: {
        color: "black",
        fontFamily: 'Inter-Heebo'
    },
    row: {
        display: 'flex',
        flexDirection: "row",
    },
    buttonFilter: {
        marginRight: 300
    },
    tableEvents: {
        paddingLeft: 10,
        paddingRight: 10,
        height: '90%',
    },
    rowTable: {
        height: 80,
    },
    colTable: {
        display: 'flex',
        justifyItems: 'start'
    },
    actions: {
        display: 'flex',
        flexDirection: "row",
        justifyContent: "center",
        flex: 2
    },
    tableRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 1,
        width: '90%',
        alignSelf: 'center',
    },
    containerTableAndFilter: {
        paddingTop: 50
    },
    lineBetween: {
        alignSelf: 'center',
        justifyContent: "center",
        width: '100%',
        // borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    rowButton: {
        alignSelf: 'center',
        justifyContent: "center",
        width: '90%',
        borderRadius: 10,
        paddingRight: 10,
        paddingLeft: 5,
    },
    actionsColumn: {
        width: '25%',
        justifyContent: "center",
        textAlign: 'center'
    },
    actionFlexColumn: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 1,
        marginBottom: 2,
    },
    descriptionColumn: {
        width: '25%',
        justifyContent: "center",
        textAlign: "center"
    },
    titleColumn: {
        width: '15%',
        justifyContent: "center",
        textAlign: 'center'
    },
    iconColumn: {
        justifyContent: "center",
        alignItems: 'center'
    },
    tableHeaders: {
        marginTop: '2%',
        padding: '2%',
    }
});
//  <View style={styles.containerTableAndFilter}>
//         <DataTable
//           style={[
//             globalStyles.rtlDirection,
//             styles.tableEvents,
//             { borderBottomWidth: 0 },
//           ]}
//         >
//           <DataTable.Header
//             style={[
//               { direction: globalStyles.rtlDirection },
//               { backgroundColor: theme.colors.backgroundGreen },
//             ]}
//           >
//             <DataTable.Title style={[globalStyles.centerText]}>
//               #
//             </DataTable.Title>
//             <DataTable.Title style={globalStyles.centerText}>
//               שם
//             </DataTable.Title>
//             <DataTable.Title style={globalStyles.centerText}>
//               פעולות
//             </DataTable.Title>
//           </DataTable.Header>
//           <ScrollView>
//             {users.length > 0 ? (
//               currentUsersDisplay.map((user, index) => (
//                 <DataTable.Row
//                   key={index}
//                   style={[globalStyles.rtlDirection, styles.rowTable]}
//                 >
//                   <DataTable.Cell
//                     style={[globalStyles.centerText, { flex: 1 }]}
//                   >
//                     <Paragraph>{index + 1}</Paragraph>
//                   </DataTable.Cell>
//                   <DataTable.Cell
//                     style={[globalStyles.centerText, { flex: 1 }]}
//                   >
//                     <Paragraph style={globalStyles.p7}>{user.name}</Paragraph>
//                   </DataTable.Cell>
//                   <DataTable.Cell
//                     style={[
//                       globalStyles.centerText,
//                       styles.actions,
//                       { flex: 2 },
//                     ]}
//                   >
//                     <TouchableRipple onPress={() => {
//                       confirmUser(user._id, true);
//                     }}>
//                     <Icon
//                       name="check"
//                       size={25}
//                       color={"green"}
//                       style={globalStyles.p7}
//                  />
//                     </TouchableRipple>
//                     <Paragraph style={{ padding: 1 }}>      </Paragraph>
//                     <TouchableRipple  onPress={() =>
//                         Linking.openURL(
//                             `http://wa.me/972${user.phoneNumber.slice(1)}`
//                         )
//                     }>
//                     <Icon
//                       name="whatsapp"
//                       size={25}
//                       color={"green"}
//                       style={globalStyles.p7}
//
//                     />
//                     </TouchableRipple>
//                   </DataTable.Cell>
//                 </DataTable.Row>
//               ))
//             ) : (
//               <Paragraph
//                 style={[globalStyles.centerText, globalStyles.rtlDirection]}
//               >
//                 ...לא קיימים משתמשים המחכים לאישור{" "}
//               </Paragraph>
//             )}
//           </ScrollView>
//         </DataTable>
//       </View>
