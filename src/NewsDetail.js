import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useRoute } from "@react-navigation/native";

const NewsDetail = ({ navigation }) => {
  const route = useRoute();
  const newsItem = route.params?.newsItem;

  return (
    <View style={styles.container}>
      {newsItem.image && (
        <Image source={{ uri: newsItem.image }} style={styles.image} />
      )}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{newsItem.title}</Text>
        <Text style={styles.description}>{newsItem.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "justify",
    color:"blue",
  },
  description: {
    fontSize: 16,
    color: "#555",
    textAlign: "justify",
  },
});

export default NewsDetail;
