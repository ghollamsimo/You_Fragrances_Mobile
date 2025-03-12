import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Switch,
    SafeAreaView,
    StatusBar,
    Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export const ProModal = ({ modalVisible, setModalVisible }) => {
    const [freeTrialEnabled, setFreeTrialEnabled] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState('yearly');

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="dark-content" />
                <LinearGradient
                    colors={['rgba(255, 255, 255, 0.9)', 'rgba(240, 245, 240, 0.95)']}
                    style={styles.background}
                >

                    <View style={styles.content}>
                        <View>
                            <Text>X</Text>
                        </View>
                        <View style={styles.logoContainer}>
                            <View style={styles.logoCircle}>
                                <Text style={styles.logoText}>P</Text>
                            </View>
                            <Text style={styles.title}>You Fragrances PRO</Text>
                            <Text style={styles.subtitle}>Know what touches your skin</Text>
                        </View>

                        {/* Features */}
                        <View style={styles.featuresContainer}>
                            <View style={styles.featureRow}>
                                <View style={[styles.featureIcon, { backgroundColor: '#a0b4f0' }]}>
                                    <Text style={styles.featureIconText}>🔍</Text>
                                </View>
                                <View style={styles.featureTextContainer}>
                                    <Text style={styles.featureTitle}>Unlimited</Text>
                                    <Text style={styles.featureDescription}>product scans</Text>
                                </View>
                            </View>

                            <View style={styles.featureRow}>
                                <View style={[styles.featureIcon, { backgroundColor: '#d8b0e8' }]}>
                                    <Text style={styles.featureIconText}>🛡️</Text>
                                </View>
                                <View style={styles.featureTextContainer}>
                                    <Text style={styles.featureTitle}>Personal AI</Text>
                                    <Text style={styles.featureDescription}>cosmetologist</Text>
                                </View>
                            </View>

                            <View style={styles.featureRow}>
                                <View style={[styles.featureIcon, { backgroundColor: '#ff9d9d' }]}>
                                    <Text style={styles.featureIconText}>📊</Text>
                                </View>
                                <View style={styles.featureTextContainer}>
                                    <Text style={styles.featureTitle}>Hair product</Text>
                                    <Text style={styles.featureDescription}>analysis</Text>
                                </View>
                            </View>

                            <View style={styles.featureRow}>
                                <View style={[styles.featureIcon, { backgroundColor: '#ffb74d' }]}>
                                    <Text style={styles.featureIconText}>🏅</Text>
                                </View>
                                <View style={styles.featureTextContainer}>
                                    <Text style={styles.featureTitle}>100%</Text>
                                    <Text style={styles.featureDescription}>unbiased rating system</Text>
                                </View>
                            </View>
                        </View>

                        {/* Free Trial Toggle */}
                        <View style={styles.toggleContainer}>
                            <Text style={styles.toggleText}>Enable Free Trial</Text>
                            <Switch
                                value={freeTrialEnabled}
                                onValueChange={setFreeTrialEnabled}
                                trackColor={{ false: '#e0e0e0', true: '#a0c4a0' }}
                                thumbColor={freeTrialEnabled ? '#ffffff' : '#f4f3f4'}
                                ios_backgroundColor="#e0e0e0"
                            />
                        </View>

                        {/* Subscription Options */}
                        <View style={styles.subscriptionContainer}>
                            <TouchableOpacity
                                style={[
                                    styles.subscriptionOption,
                                    selectedPlan === 'yearly' && styles.selectedOption
                                ]}
                                onPress={() => setSelectedPlan('yearly')}
                            >
                                <View style={styles.optionLeftContent}>
                                    {selectedPlan === 'yearly' && (
                                        <View style={styles.checkCircle}>
                                            <Text style={styles.checkmark}>✓</Text>
                                        </View>
                                    )}
                                    {selectedPlan !== 'yearly' && <View style={styles.emptyCircle} />}
                                    <View style={styles.planTextContainer}>
                                        <Text style={styles.planTitle}>Yearly Access</Text>
                                        <Text style={styles.planSubtitle}>Just US$39,99 per year</Text>
                                    </View>
                                </View>
                                <View style={styles.priceContainer}>
                                    <View style={styles.bestOfferBadge}>
                                        <Text style={styles.bestOfferText}>BEST OFFER</Text>
                                    </View>
                                    <Text style={styles.priceText}>US$0,77</Text>
                                    <Text style={styles.priceSubtext}>per week</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.subscriptionOption,
                                    selectedPlan === 'weekly' && styles.selectedOption
                                ]}
                                onPress={() => setSelectedPlan('weekly')}
                            >
                                <View style={styles.optionLeftContent}>
                                    {selectedPlan === 'weekly' && (
                                        <View style={styles.checkCircle}>
                                            <Text style={styles.checkmark}>✓</Text>
                                        </View>
                                    )}
                                    {selectedPlan !== 'weekly' && <View style={styles.emptyCircle} />}
                                    <View style={styles.planTextContainer}>
                                        <Text style={styles.planTitle}>Weekly Access</Text>
                                    </View>
                                </View>
                                <View style={styles.priceContainer}>
                                    <Text style={styles.priceText}>US$5,99</Text>
                                    <Text style={styles.priceSubtext}>per week</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        {/* Continue Button */}
                        <TouchableOpacity style={styles.continueButton}>
                            <Text style={styles.continueButtonText}>Continue</Text>
                        </TouchableOpacity>

                        {/* Best Value */}
                        <View style={styles.bestValueContainer}>
                            <View style={styles.bestValueCircle}>
                                <Text style={styles.bestValueIcon}>⭐</Text>
                            </View>
                            <Text style={styles.bestValueText}>Best value</Text>
                        </View>

                        {/* Footer */}
                        <View style={styles.footer}>
                            <TouchableOpacity>
                                <Text style={styles.footerLink}>Terms of Use</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.footerLink}>Privacy Policy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={styles.footerLink}>Restore</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>
            </SafeAreaView>
        </Modal>
    );
};

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFF'
    },
    background: {
        flex: 1,
        width: '100%',
    },
    content: {
        flex: 1,
        paddingHorizontal: 30,
        // paddingTop: 60,
        paddingBottom: 20,
        // alignItems: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logoCircle: {
        width: 80,
        height: 80,
        borderRadius: 20,
        backgroundColor: '#a0c4a0',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    logoText: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 18,
        color: '#666',
    },
    featuresContainer: {
        width: '100%',
        marginBottom: 30,
    },
    featureRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    featureIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    featureIconText: {
        fontSize: 18,
    },
    featureTextContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    featureTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 5,
    },
    featureDescription: {
        fontSize: 18,
    },
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 20,
        marginBottom: 20,
    },
    toggleText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    subscriptionContainer: {
        width: '100%',
        marginBottom: 20,
    },
    subscriptionOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 20,
        marginBottom: 15,
    },
    selectedOption: {
        borderWidth: 2,
        borderColor: '#a0c4a0',
    },
    optionLeftContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkCircle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#a0c4a0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    emptyCircle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        marginRight: 10,
    },
    checkmark: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    planTextContainer: {
        justifyContent: 'center',
    },
    planTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    planSubtitle: {
        fontSize: 14,
        color: '#666',
    },
    priceContainer: {
        alignItems: 'flex-end',
    },
    bestOfferBadge: {
        backgroundColor: '#3498db',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 15,
        marginBottom: 5,
    },
    bestOfferText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
    priceText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    priceSubtext: {
        fontSize: 14,
        color: '#666',
    },
    continueButton: {
        backgroundColor: '#3498db',
        width: '100%',
        padding: 18,
        borderRadius: 30,
        alignItems: 'center',
        marginBottom: 15,
    },
    continueButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    bestValueContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    bestValueCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#a0c4a0',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    bestValueIcon: {
        fontSize: 12,
    },
    bestValueText: {
        fontSize: 16,
        color: '#666',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 'auto',
    },
    footerLink: {
        color: '#666',
        fontSize: 16,
        marginHorizontal: 10,
    },
});