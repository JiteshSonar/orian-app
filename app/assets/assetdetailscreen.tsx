import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import { RootState } from "../../store/store";
import TopBar from "@/components/TopBarWithBackNav";
import { SafeAreaView } from "react-native-safe-area-context";
import { apiService } from "@/service/service";
import { Card } from "react-native-paper";
import Icon from "react-native-vector-icons/AntDesign";
import Moment from "moment";
import mac from "../../assets/images/mac.jpg";
import window from "../../assets/images/window.jpg";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
const assetDetailScreen = () => {
  const id = useTypedSelector((state) => state.globalState.id);

  const [loading, setLoading] = useState(true);
  const [asset, setAssets] = useState([]);

  const getAssetDetail = async () => {
    try {
      setLoading(true);
      const res = await apiService.getAssetDetail(id);
      setAssets(res.assetDetail);
    } catch (error) {
      console.error("Error fetching assets:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAssetDetail();
    console.log("assets", asset);
  }, []);
  return (
    <SafeAreaView style={styles.main}>
      <TopBar title="Asset Detail" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={window} style={styles.productImage} />

          {/* <Image source={{ uri: productData.imageUrl }} style={styles.productImage} /> */}
        </View>

        <View style={styles.card}>
          <Text style={styles.productName}>{asset.productName}</Text>
          <Text style={styles.category}>{asset.category?.category}</Text>

          <Text style={styles.model}>Model: {asset.model}</Text>
          <Text style={styles.serialNumber}>Serial: {asset.serialNumber}</Text>

          <Text style={styles.description}>{asset.description}</Text>

          <View style={styles.priceSection}>
            <Text style={styles.price}> ₹{asset.price}</Text>
            <Text style={styles.warranty}>
              Warranty: {asset.warrantyPeriod} months
            </Text>
          </View>

          <View style={styles.availabilitySection}>
            <Text style={styles.status}>Status: {asset.status}</Text>
            <Text style={styles.condition}>
              Condition:{" "}
              <Text style={styles.conditiont}> {asset.condition} </Text>
            </Text>
            <Text style={styles.location}>Location: {asset.location}</Text>
          </View>

          <View style={styles.supplierSection}>
            <Text style={styles.supplier}>Supplier: {asset.supplier}</Text>
          </View>

          <View style={styles.datesSection}>
            <Text style={styles.date}>
              Buy Date: {Moment(asset.buyingDate).format("d MMM YYYY")}
            </Text>
            <Text style={styles.date}>
              Created At: {Moment(asset.createdAt).format("d MMM YYYY")}
            </Text>
            <Text style={styles.date}>
              Updated At: {Moment(asset.updatedAt).format("d MMM YYYY")}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  main: {
    backgroundColor: "#ffffff",
    height: "100%",
  },
  container: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: "#ffffff",
  },
  imageContainer: {
    alignItems: "center",
  },
  productImage: {
    width: "100%",
    height: 250,
    resizeMode: "contain",
    borderRadius: 10,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  productName: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  category: {
    fontSize: 18,
    color: "#888",
    marginBottom: 10,
  },
  model: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  serialNumber: {
    fontSize: 14,
    color: "#aaa",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#444",
    marginBottom: 20,
  },
  priceSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  price: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  warranty: {
    fontSize: 16,
    color: "#777",
  },
  availabilitySection: {
    marginBottom: 20,
  },
  status: {
    fontSize: 16,
    color: "#4CAF50",
    marginBottom: 10,
  },
  condition: {
    fontSize: 16,
    color: "#888",
    marginBottom: 10,
  },
  conditiont: {
    fontSize: 18,
    color: "#ffffff",
    backgroundColor: "green",
  },
  location: {
    fontSize: 16,
    color: "#777",
  },
  supplierSection: {
    marginBottom: 20,
  },
  supplier: {
    fontSize: 16,
    color: "#333",
  },
  datesSection: {
    marginTop: 10,
  },
  date: {
    fontSize: 14,
    color: "#777",
    marginBottom: 10,
  },
});

export default assetDetailScreen;
