import React, {useEffect, useState} from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";

const NewsList = ({navigation})=>{
    const [news, setNews] = useState([]);

    useEffect(()=>{
        fetchNews();
    }, []);

    const fetchNews = async()=>{
        try{
            const response = await axios.get('https://newsapi.org/v2/top-headlines', {
                params:{
                    country:'us',
                    apiKey: '87e2d12910e6415caeba669689069349'
                },
            });
            setNews(response.data.articles);
            }catch(error){
                console.error(error);
            }
        };

        return (
            <View style={styles.container}>
                <FlatList
                    data={news}
                    renderItem={({item})=>(
                        <TouchableOpacity
                            style={styles.newsItem}
                            key={item.id}
                            onPress={()=>navigation.navigate('NewsDetail', {newsItem:item})}
                        >
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.description}>{item.description}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item)=>item.id?.toString()}
                />
            </View>
        );
    };

    const styles=StyleSheet.create({
        container:{
            flex:1,
            padding:16,
        },
        newsItem:{
            marginBottom:16,
        },
        title:{
            fontSize:18,
            fontWeight:'bold',
        },
        description:{
            fontSize:14,
        },
    });

    export default NewsList;