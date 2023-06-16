import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from "react-native";
import axios from "axios";

const NewsList = ({ navigation }) => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get("https://newsapi.org/v2/top-headlines", {
        params: {
          country: "us",
          apiKey: "87e2d12910e6415caeba669689069349",
        },
      });
      setNews(response.data.articles);
    } catch (error) {
      console.error(error);
    }
  };

  const renderNewsItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.newsItem}
        onPress={() => navigation.navigate("NewsDetail", { newsItem: item })}
      >
        <Image source={{ uri: item.urlToImage }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={news}
        renderItem={renderNewsItem}
        keyExtractor={(item) => item.id?.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  newsItem: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 120,
    height: 120,
  },
  content: {
    flex: 1,
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#888",
  },
});

export default NewsList;
