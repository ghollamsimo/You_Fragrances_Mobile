import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    Pressable,
    Modal,
    SafeAreaView,
    ScrollView,
    Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import {login, register} from "../../redux/slices/AuthSlice";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../redux/Store";
import RNPickerSelect from 'react-native-picker-select';
import { ChevronDown } from 'react-native-feather';
import AsyncStorage from "@react-native-async-storage/async-storage"; // If you have this package, or use any other icon

const LoginScreen = ({ modalVisible, setModalVisible }) => {
    const dispatch = useDispatch<AppDispatch>()
    const [activeTab, setActiveTab] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [gender, setGender] = useState('man');
    const [role, setRole] = useState('client');
    const [showPassword, setShowPassword] = useState(false);
    const navigation = useNavigation();

    const handleLogin = async () => {
        const data = {
            email: email,
            password: password,
        };
        try {
            const user = await dispatch(login(data));

            if (user) {
                await AsyncStorage.setItem('token', user?.token);
                navigation.navigate("Main");
                setModalVisible(false);
            } else {
                alert('Invalid email or password');
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const handleSignUp = async () => {
        console.log('Sign up with:', name, email, password, image);

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('role', role);
        formData.append('gender', gender);

        if (image) {
            const filename = image.split('/').pop();
            const match = /\.(\w+)$/.exec(filename);
            const ext = match ? match[1] : 'jpg';
            const type = `image/${ext}`;

            formData.append('image', {
                uri: image,
                name: filename,
                type: type,
            });
        }

        try {
            const user = await dispatch(register(formData));
            if (user) {
                navigation.navigate("Profile");
            } else {
                alert('Registration failed');
            }
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.5,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const renderGenderField = () => {
        return (
            <View style={styles.inputContainer}>
                <View style={styles.pickerWrapper}>
                    <RNPickerSelect
                        onValueChange={(value) => setGender(value)}
                        value={gender}
                        items={[
                            { label: 'Man', value: 'man' },
                            { label: 'Woman', value: 'woman' },
                        ]}
                        style={{
                            inputIOS: styles.pickerInputIOS,
                            inputAndroid: styles.pickerInput,
                            iconContainer: { top: 10, right: 12 },
                        }}
                        useNativeAndroidPickerStyle={false}
                        placeholder={{ label: 'Select Gender', value: 'man' }}
                        Icon={() => (
                            <Text style={{ fontSize: 18, color: '#666', paddingRight: 10 }}>▼</Text>
                        )}
                    />

                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <SafeAreaView style={styles.modalContent}>
                        <ScrollView contentContainerStyle={styles.scrollViewContent}>
                            <View style={styles.header}>
                                <Text style={styles.logo}>Warehouse Management</Text>
                                <Text style={styles.title}>Welcome to Warehouse</Text>
                                <Text style={styles.subtitle}>
                                    Sign up or login below to manage your warehouse
                                </Text>
                            </View>
                            <View style={styles.tabs}>
                                <Pressable
                                    style={[styles.tab, activeTab === 'login' && styles.activeTab]}
                                    onPress={() => setActiveTab('login')}
                                >
                                    <Text style={[styles.tabText, activeTab === 'login' && styles.activeTabText]}>Login</Text>
                                </Pressable>
                                <Pressable
                                    style={[styles.tab, activeTab === 'signup' && styles.activeTab]}
                                    onPress={() => setActiveTab('signup')}
                                >
                                    <Text style={[styles.tabText, activeTab === 'signup' && styles.activeTabText]}>Sign Up</Text>
                                </Pressable>
                            </View>

                            {activeTab === 'login' ? (
                                <>
                                    <TouchableOpacity style={styles.socialButton}>
                                        <Text style={styles.socialButtonText}>Login with Apple</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.socialButton}>
                                        <Text style={styles.socialButtonText}>Login with Google</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.dividerText}>or continue with Email</Text>
                                    <View style={styles.inputContainer}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Email"
                                            value={email}
                                            onChangeText={setEmail}
                                            keyboardType="email-address"
                                            autoCapitalize="none"
                                        />
                                    </View>
                                    <View style={styles.inputContainer}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Password"
                                            value={password}
                                            onChangeText={setPassword}
                                            secureTextEntry={!showPassword}
                                        />
                                        <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
                                            <Text>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity onPress={() => {}}>
                                        <Text style={styles.forgotPassword}>Forgot Password?</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                                        <Text style={styles.loginButtonText}>Login</Text>
                                    </TouchableOpacity>
                                </>
                            ) : (
                                <>
                                    <TouchableOpacity style={styles.imagePickerContainer} onPress={pickImage}>
                                        {image ? (
                                            <Image source={{ uri: image }} style={styles.profileImage} />
                                        ) : (
                                            <View style={styles.imagePlaceholder}>
                                                <Text style={styles.imagePlaceholderText}>Add Photo</Text>
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                    <View style={styles.inputContainer}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Full Name"
                                            value={name}
                                            onChangeText={setName}
                                        />
                                    </View>
                                    <View style={styles.inputContainer}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Email"
                                            value={email}
                                            onChangeText={setEmail}
                                            keyboardType="email-address"
                                            autoCapitalize="none"
                                        />
                                    </View>
                                    <View style={styles.inputContainer}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Password"
                                            value={password}
                                            onChangeText={setPassword}
                                            secureTextEntry={!showPassword}
                                        />
                                        <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
                                            <Text>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <TextInput
                                        style={{ display: 'none' }}
                                        value={role}
                                        onChangeText={setRole}
                                    />

                                    {renderGenderField()}

                                    <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
                                        <Text style={styles.loginButtonText}>Sign Up</Text>
                                    </TouchableOpacity>
                                </>
                            )}

                            <Text style={styles.termsText}>
                                By signing up, you agree to our{' '}
                                <Text style={styles.link}>Terms of Service</Text>{' '}and{' '}
                                <Text style={styles.link}>Privacy Policy</Text>
                            </Text>
                        </ScrollView>
                    </SafeAreaView>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        marginBottom: 16,
        position: 'relative',
    },
    inputLabel: {
        marginBottom: 8,
        fontSize: 14,
        color: '#333',
    },
    pickerWrapper: {
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    pickerInput: {
        padding: 12,
        fontSize: 16,
        backgroundColor: '#fff',
        color: '#333',
    },
    pickerInputIOS: {
        padding: 12,
        fontSize: 16,
        color: '#333',
        paddingRight: 30, // space for the arrow icon
    },
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    modalContent: {
        flex: 1,
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingHorizontal: 20,
        paddingTop: 10,
        maxHeight: '80%'
    },
    scrollViewContent: {
        paddingBottom: 40,
        margin: 20
    },
    header: {
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 50,
    },
    logo: {
        fontSize: 20,
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        lineHeight: 20,
    },
    tabs: {
        flexDirection: 'row',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#3E7796',
    },
    tabText: {
        textAlign: 'center',
        color: '#666',
    },
    activeTabText: {
        color: '#3E7796',
        fontWeight: '600',
    },
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E5E5E5',
        marginBottom: 12,
    },
    socialIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    socialButtonText: {
        fontSize: 16,
    },
    dividerText: {
        textAlign: 'center',
        color: '#666',
        marginVertical: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
    },
    eyeIcon: {
        position: 'absolute',
        right: 12,
        top: 12,
    },
    forgotPassword: {
        color: '#3E7796',
        textAlign: 'right',
        marginBottom: 20,
    },
    loginButton: {
        backgroundColor: '#3E7796',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    termsText: {
        textAlign: 'center',
        color: '#666',
        fontSize: 12,
    },
    link: {
        color: '#3E7796',
        textDecorationLine: 'underline',
    },
    imagePickerContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    imagePlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#E5E5E5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagePlaceholderText: {
        color: '#666',
    },
});

export default LoginScreen;