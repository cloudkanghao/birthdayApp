
import React, { useEffect, useState } from 'react';
import { View, Image, Dimensions } from 'react-native';
import Moment from 'moment';
import { Layout, Text, Icon, Card } from '@ui-kitten/components';
import styles from './theme/styles';
import ActionButton from 'react-native-action-button';
import * as SecureStore from 'expo-secure-store';

const HomeScreen = ({route, navigation}) => {
    // const giftIcon = (props) => (<Icon name='gift' {...props} />);
    // const calendarIcon = (props) => (<Icon {...props} name='calendar-outline'/>);
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height * 1.1;
    const [ total, setTotal ] = useState('0');
    const [ upcoming, setUpcoming ] = useState('0');

    const refreshData =  async() => {
        let count = await load('count');
        if(count == null)
            await save('count', '0');
        else
            setTotal(count);
    }

    const inputDateHandler = () => {
        navigation.push('Add', {});
    };

    const load = async(key) => {
        return SecureStore.getItemAsync(key);
    }

    const save = async(key, value) => {
        SecureStore.setItemAsync(key, value);
    }

    const remove = async(key) => {
        SecureStore.deleteItemAsync(key);
    }

    const getNumOfUpcoming = async() => {
        let count = await load('count');
        let countNum = parseInt(count);
        
        for(let i=1; i<=countNum; i++) {
            let entry = await load(i.toString());
            let obj = JSON.parse(entry);
        }
        
    }

    useEffect(() => {
        refreshData();
        let setIntervalId = setInterval(refreshData, 1000); // 1 seconds refresh rate
        return () => {
            // Anything in here is fired on component unmount.
            clearInterval(setIntervalId);
        }
    }, []);

    return (
    <Layout style={styles.container}>
        {/* <Image style={{width: windowWidth, height: windowHeight, opacity: 0.5, position: 'absolute'}} source={require('./theme/background.jpg')}/> */}
    
        <Layout style={styles.headerContainer} level='4'>
            <Text category='h1'>{Moment(new Date()).format('DD MMM yyyy')}</Text>
            <Text category='s1' style={{marginTop: '5%'}}>TODAY</Text>
        </Layout>
        
        <Layout>
        
            <Card style={styles.card}>
                <View style={styles.cardBody}>
                    <Icon name='people-outline' fill='#5faf21' style={styles.smallIcon}/>
                    <View style={{flexDirection: 'column'}}>
                        <Text category='h6' style={{color: '#5faf21'}}>Total birthday record</Text>
                        <Text category='s1'>15 full-time, 5 intern</Text>
                    </View>
                    <Text category='h4' style={{marginLeft: 'auto', color: '#5faf21'}}>{total}</Text>
                </View>
            </Card>

            <Card style={styles.card}>
                <View style={styles.cardBody}>
                    <Icon name='gift-outline' fill='#0595ee' style={styles.smallIcon}/>
                    <View style={{flexDirection: 'column'}}>
                        <Text category='h6' style={{color: '#0595ee'}}>Birthday this month</Text>
                        <Text category='s1'>Upcoming at DD-MMM-yyyy</Text>
                    </View>
                    <Text category='h4' style={{marginLeft: 'auto', color: '#0595ee'}}>5</Text>
                </View>
            </Card>
            
            <Card style={styles.card}>
                <View style={styles.cardBody}>
                    <Icon name='clock-outline' fill='#ff9e06' style={styles.smallIcon}/>
                    <View style={{flexDirection: 'column'}}>
                        <Text category='h6' style={{color: '#ff9e06'}}>Recent birthday notification</Text>
                        <Text category='s1'>Last sent at DD-MMM-yyyy</Text>
                    </View>
                    <Text category='h4' style={{marginLeft: 'auto', color: '#ff9e06'}}></Text>
                </View>
            </Card>
        </Layout>

        <Layout>
            <ActionButton buttonColor="rgba(231,76,60,1)">
            <ActionButton.Item title="Add Birthday" buttonColor='#131729' onPress={() => {inputDateHandler()}}>
                <Icon name="person-add" fill='#ffffff' style={styles.icon}/>
            </ActionButton.Item>
            </ActionButton>
        </Layout>
    </Layout>
)};

export default HomeScreen;