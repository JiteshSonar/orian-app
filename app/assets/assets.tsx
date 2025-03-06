import { apiService } from "@/service/service";
import {
  StyleSheet,
  View,
  Text,
  Button,
  ScrollView,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AssetCard from "../../components/AssetCard";
import { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

export default function Assets() {
  const [loading, setLoading] = useState(true);
  const [assets, setAssets] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [searchText, setSearchText] = useState("");

  const navigation = useNavigation();
  const getAsset = async () => {
    try {
      setLoading(true);
      const res = await apiService.getAsset();
      setAssets(res.assets);
      setFilteredAssets(res.assets);
      console.log("assets", assets);
    } catch (error) {
      console.error("Error fetching assets:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = assets.filter((asset) => {
      return asset.productName.toLowerCase().includes(text.toLowerCase());
    });

    setFilteredAssets(filtered);
  };

  useEffect(() => {
    getAsset();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.pageHeading}>Assets</Text>
          <TouchableOpacity
            style={styles.addAssetBtn}
            onPress={() => navigation.navigate("assets/addAsset")}
          >
            <Icon name="add" size={18} />
            <Text style={styles.headingtxt}>Add Asset</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.flex}>
          <View
            style={[
              styles.inputContainer,
              { width: searchText.length > 0 ? "86%" : "100%" },
            ]}
          >
            <Icon name="search" size={25} />
            <TextInput
              style={styles.input}
              placeholder="search.."
              onChangeText={handleSearch}
              value={searchText}
            />
          </View>
          {searchText.length > 0 ? (
            <View style={styles.inputContainer}>
              <Icon name="close" size={25} onPress={() => setSearchText("")} />
            </View>
          ) : (
            ""
          )}
        </View>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size={60} color="#15F5BA" />
          </View>
        ) : filteredAssets.length > 0 ? (
          filteredAssets.map((asset, index) => (
            <AssetCard key={index} asset={asset} />
          ))
        ) : (
          <Text>No Data Found</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: "100%",
    padding: 20,
    backgroundColor: "#ffffff",
  },
  loadingContainer: {
    flexGrow: 1,
    width: "100%",
    padding: 20,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },
  pageHeading: {
    fontSize: 24,
    fontWeight: "700",
    color: "#63686E",
    paddingBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
  },
  input: {
    flex: 1,
    height: "100%",
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headingtxt: {
    fontSize: 14,
    fontWeight: "600",
    color: "#008000",
  },
  addAssetBtn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#8CE8C9",
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 12,
  },
});
