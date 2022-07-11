
import React from 'react';
import { View, Image, Dimensions } from 'react-native';
import { Layout, Text, Button, Icon, Card } from '@ui-kitten/components';
import { SafeAreaView } from 'react-navigation';

const ListScreen = ({route, navigation}) => {

    const inputDateHandler = () => {
        navigation.push('Input Birthday', {});
    };

    return (
    <Layout>
        <SafeAreaView>
            <Text category='h1'>Hello</Text>
        </SafeAreaView>
    </Layout>
)};

export default ListScreen;