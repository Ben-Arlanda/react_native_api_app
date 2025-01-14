import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

interface Article {
  author: string;
  title: string;
  description: string;
  url: string;
}

export default function NewsSearchApp() {
  const [query, setQuery] = useState('');
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchNews = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const apiKey = process.env.EXPO_PUBLIC_API_KEY;
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`,
      );
      setArticles(response.data.articles);
    } catch (error) {
    } finally {
      setLoading(false);
    }
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
      {loading && (
        <ActivityIndicator size="large" color="#0000ff" className="mb-4" />
      )}
      {articles.map((article) => (
        <View
          key={article.url}
          className="p-4 mb-4 bg-gray-100 rounded-lg shadow-md"
        >
          <Text className="text-lg font-bold">{article.author}</Text>
          <Text className="text-lg font-bold">{article.title}</Text>
          <Text className="text-gray-700 mb-2">{article.description}</Text>
          <Text className="text-blue-500 underline">{article.url}</Text>
        </View>
      ))}
      {!loading && !articles.length && query && (
        <Text className="text-center text-gray-500">No results found.</Text>
      )}
    </ScrollView>
  );
}
