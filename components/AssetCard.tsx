import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import Icon from "react-native-vector-icons/AntDesign";
import { Card } from 'react-native-paper';
import Moment from "moment";
import { useNavigation } from "@react-navigation/native";

const AssetCard = ({ asset }) => {
      const navigation = useNavigation();
    
    return (
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.headerCont}>
            {/* <Text style={styles.headingtxt}>{asset.Category.category}</Text> */}
            <Text style={styles.headingtxt}>{asset.productName}</Text>
            <TouchableOpacity style={styles.elipsis}>
              <Icon style={styles.elipsis} name="ellipsis1" size={20} />
            </TouchableOpacity>
          </View>
          <Text style={styles.infoLighttTxt}>
            Description:{" "}
            <Text style={styles.infoBoldTxt}>{asset.description}</Text>{" "}
          </Text>
          <Text style={styles.infoLighttTxt}>
            Serial Number:{" "}
            <Text style={styles.infoBoldTxt}>{asset.serialNumber}</Text>{" "}
          </Text>
          <Text style={styles.infoLighttTxt}>
            Purchase Date:{" "}
            <Text style={styles.infoBoldTxt}>
              {" "}
              {Moment(asset.buyingDate).format("d MMM YYYY")}
            </Text>
          </Text>
          <Text style={styles.infoLighttTxt}>
            Price: <Text style={styles.infoBoldTxt}>₹ {asset.price}</Text>{" "}
          </Text>
          <TouchableOpacity
            style={styles.greenBtn}
            onPress={() =>
            {
                navigation.navigate({
                  pathname: "assets/assetdetailscreen",
                  params: { asset },
                });

            }
            }
          >
            <Text style={styles.eVoucher}>View Details</Text>
          </TouchableOpacity>
        </Card.Content>
      </Card>
    );
};

const styles = StyleSheet.create({
    headerCont: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 8,
    },
    card: {
        marginBottom: 15,
        padding: 5,
        borderRadius: 10,
        backgroundColor: '#fff',
        elevation: 4,
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#008000',
    },
    detail: {
        fontSize: 14,
        color: '#333',
        marginTop: 4,
    },
    eVoucher: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#008000',
    },
    headingtxt: {
        fontSize: 18,
        fontWeight: '600',
        color: '#008000',
    },
    greenBtn: {
        width: "100%",
        height: 40,
        backgroundColor: "#8CE8C9",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10
    },
    elipsis: {
        fontSize: 30,
        fontWeight: "bold",
        backgroundColor: "#F3F3F3",
        borderRadius: 15,
        height: 30,
        width: 30
    },
    infoLighttTxt: {
        fontSize: 16,
        fontWeight: '800',
        color: "#C3C3C3",
    },
    infoBoldTxt: {
        fontSize: 16,
        fontWeight: '500',
        color: "#737373",
    }
});

export default AssetCard;