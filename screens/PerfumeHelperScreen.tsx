import React, {useEffect, useState} from 'react';
import {
  View, Text, StyleSheet, Image, TextInput, TouchableOpacity, SafeAreaView,
  ScrollView, KeyboardAvoidingView, Keyboard, Platform, ActivityIndicator, Alert
} from 'react-native';
import PerfumeHelperNavbar from '../components/PerfumeHelperNavbar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/Store';
import { sendMessages } from '../redux/slices/ChatbotSlice';
import { nanoid } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PerfumeHelperScreen: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);  const dispatch = useDispatch<AppDispatch>();
  const chatbotMessages = useSelector((state: RootState) => state.chat.chatbotMessages);
  const loading = useSelector((state: RootState) => state.chat.loading);
  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    const userMessage = { id: nanoid(), text: input, sender: "user" };

    dispatch({ type: "chat/addMessage", payload: userMessage });
    dispatch(sendMessages({ prompt: input })).catch((error) => {
      console.error("Error sending message:", error);
    });

    setInput("");
    Keyboard.dismiss();
  };
    const checkToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      setToken(storedToken);
    };
  useEffect(() => {

    checkToken();
  }, []);
  const handleInputPress = () => {
    if (!token) {
      Alert.alert(
          "Access Denied",
          "You need to be logged in to use this feature.",
          [{ text: "OK" }]
      );
    }
  };
  return (
      <>
        <PerfumeHelperNavbar />
        <SafeAreaView style={styles.safeArea}>
          <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={styles.keyboardAvoidingView}
              keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
          >
            <ScrollView style={styles.chatArea}>
              {chatbotMessages.map((msg) => (
                  <View key={msg.id} style={msg.sender === "user" ? styles.userQuery : styles.messageContainer}>
                    {msg.sender === "bot" && (
                        <Image style={styles.avatar} source={{ uri: 'https://www.kindpng.com/picc/m/361-3612541_bot-icon-hd-png-download.png' }} />
                    )}
                    <View style={msg.sender === "user" ? styles.queryBubble : styles.messageBubble}>
                      <Text style={msg.sender === "user" ? styles.queryText : styles.botText}>{msg.text}</Text>
                    </View>
                  </View>
              ))}
              {loading && <ActivityIndicator size="small" color="#3E7796" style={{ marginTop: 10 }} />}
            </ScrollView>
            <View style={styles.inputContainer}>
              <TouchableOpacity onPress={handleInputPress} activeOpacity={1}>
                <TextInput
                    style={[styles.input, !token && { backgroundColor: '#f0f0f0' }]} // Grise l'input si désactivé
                    placeholder="Type your question here"
                    placeholderTextColor="#999"
                    value={input}
                    onChangeText={setInput}
                    onSubmitEditing={handleSendMessage}
                    editable={!!token}
                    pointerEvents={!token ? "none" : "auto"} // Bloque l'édition si pas de token
                />
              </TouchableOpacity>

              <TouchableOpacity
                  style={[styles.sendButton, !token && { opacity: 0.5 }]}
                  onPress={handleSendMessage}
                  disabled={!token}
              >
                <Ionicons name='arrow-up-outline' size={18} style={styles.sendButtonText} />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  chatArea: {
    flex: 1,
    padding: 16,
  },
  inputContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
    marginBottom: 60,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  messageBubble: {
    backgroundColor: '#FFFF',
    padding: 16,
    borderRadius: 20,
    flex: 1,
    borderWidth: 1,
    borderColor: "#d9dadb",
  },
  messageText: {
    fontSize: 16,
    lineHeight: 24,
  },
  botText: {
    fontSize: 16,
    lineHeight: 24,
    color: "#000", // 🆕 Bot text is now black
  },
  userQuery: {
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  queryBubble: {
    backgroundColor: '#3E7796',
    padding: 16,
    borderRadius: 20,
    maxWidth: '80%',
  },
  queryText: {
    color: '#fff',
    fontSize: 16,
  },
  input: {
    backgroundColor: '#f5f5f5',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 25,
    fontSize: 16,
  },
  sendButton: {
    position: "absolute",
    right: 34,
    top: 25,
    backgroundColor: "#3E7796",
    borderRadius: 20,
    padding: 8,
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default PerfumeHelperScreen;
