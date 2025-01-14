import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import axios from 'axios';

export default function NewsSearchApp() {
  const [query, setQuery] = useState('');
  const [articles, setArticles] = useState([]);

  const fetchNews = async () => {
    const apiUrl = process.env.EXPO_PUBLIC_API_URL;
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiUrl}`,
    );
    setArticles(response.data.articles);
  };
  return (
    <ScrollView className="flex-1 p-4 bg-white">
      <Text className="text-2xl font-bold text-center mb-6">News Search</Text>
      <TextInput
        placeholder="Enter search..."
        value={query}
        onChangeText={setQuery}
        className="border border-gray-300 rounded-md p-2 mb-4"
      />

      <Pressable
        onPress={fetchNews}
        className="bg-blue-500 p-3 rounded-md mb-4"
      >
        <Text className="text-white text-center">Search</Text>
      </Pressable>

      {articles.map((article) => (
        <View
          key={article.id}
          className="p-4 mb-4 bg-gray-100 rounded-lg shadow-md"
        >
          <Text className="text-lg font-bold">{article.author}</Text>
          <Text className="text-lg font-bold">{article.title}</Text>
          <Text className="text-gray-700 mb-2">{article.description}</Text>
          <Text className="text-blue-500 underline">{article.url}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
