import React from "react";
import {
  Paragraph,
  Searchbar,
  DataTable,
  TouchableRipple,
  Colors,
} from "react-native-paper";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Linking,
  ImageBackground,
} from "react-native";
import { useTheme } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import globalStyles from "../styles";

import Toast from "react-native-toast-message";
import Loading from "../component/modal-loading";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

function HomePageParent(props) {
  const navigation = useNavigation();
  const theme = useTheme();
  const [searchText, setSearchText] = React.useState("");
  const [user, setUser] = React.useState([]);
  //   const [currentUserDisplay, setCurrentUserDisplay] =
  React.useState([{}]);
  const [visibleLoading, setVisibleLoading] = React.useState(false);
  //
  React.useEffect(() => {
    setUser(props.route.params.user);
  }, []);

  function getAllBabySitter() {}

  return (
    <ImageBackground style={globalStyles.imageBackground}>
      <View>
        <Searchbar
          placeholder="חיפוש"
          value={searchText}
          onChangeText={(text) => {
            if (users) {
              setSearchText(text);
              //   setCurrentUserDisplay(
              //     users
              //     // users.filter((user: object) => user.name.includes(text))
              //   );
              if (text.length === 0) {
                setCurrentBabySitterDisplay(users);
              }
            }
          }}
        />

        <View
          style={[
            styles.tableHeaders,
            { backgroundColor: theme.colors.backgroundGreen },
          ]}
        >
          <View style={styles.tableRow}>
            <Paragraph
              style={[globalStyles.fontFamilyApp, styles.descriptionColumn]}
            >
              טלפון
            </Paragraph>
            <Paragraph style={[globalStyles.fontFamilyApp, styles.titleColumn]}>
              שם
            </Paragraph>
            <Paragraph style={styles.iconColumn}>
              <Paragraph>מיקום</Paragraph>
            </Paragraph>
          </View>
        </View>

        <ScrollView
          style={{ height: "70%" }}
          showsVerticalScrollIndicator={true}
          indicatorStyle={"black"}
          scrollEnabled={true}
          vartical={true}
        >
          <View style={styles.container}>
            <View style={styles.row}>
              <Text style={styles.label}>שם:</Text>
              <Text style={styles.value}>{user?.name}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>מספר טלפון:</Text>
              <Text style={styles.value}>{user?.phoneNumber}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>תיאור:</Text>
              <ScrollView style={styles.description}>
                <Text>{user?.description}</Text>
              </ScrollView>
            </View>
          </View>
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
    fontFamily: "Inter-Heebo",
  },
  titleItemHeader: {
    color: "#425746",
    fontFamily: "Inter-Heebo",
  },
  itemHeader: {
    color: "black",
    fontFamily: "Inter-Heebo",
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
  buttonFilter: {
    marginRight: 300,
  },
  tableEvents: {
    paddingLeft: 10,
    paddingRight: 10,
    height: "90%",
  },
  rowTable: {
    height: 80,
  },
  colTable: {
    display: "flex",
    justifyItems: "start",
  },
  actions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    flex: 2,
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 1,
    width: "90%",
    alignSelf: "center",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    flex: 1,
    fontWeight: 'bold',
  },
  value: {
    flex: 2,
  },
  description: {
    flex: 2,
    maxHeight: 100,
  },
  containerTableAndFilter: {
    paddingTop: 50,
  },
  lineBetween: {
    alignSelf: "center",
    justifyContent: "center",
    width: "100%",
    // borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  rowButton: {
    alignSelf: "center",
    justifyContent: "center",
    width: "90%",
    borderRadius: 10,
    paddingRight: 10,
    paddingLeft: 5,
  },
  actionsColumn: {
    width: "25%",
    justifyContent: "center",
    textAlign: "center",
  },
  actionFlexColumn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 1,
    marginBottom: 2,
  },
  descriptionColumn: {
    width: "25%",
    justifyContent: "center",
    textAlign: "center",
  },
  titleColumn: {
    width: "15%",
    justifyContent: "center",
    textAlign: "center",
  },
  iconColumn: {
    justifyContent: "center",
    alignItems: "center",
  },
  tableHeaders: {
    marginTop: "2%",
    padding: "2%",
  },
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
