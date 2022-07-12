
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Moment from 'moment';
import { Layout, Text, Icon, Card } from '@ui-kitten/components';
import styles from './theme/styles';
import ActionButton from 'react-native-action-button';
// import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({route, navigation}) => {
    // const giftIcon = (props) => (<Icon name='gift' {...props} />);
    // const calendarIcon = (props) => (<Icon {...props} name='calendar-outline'/>);
    // const windowWidth = Dimensions.get('window').width;
    // const windowHeight = Dimensions.get('window').height * 1.1;
    const [ now, setNow ] = useState(new Date());
    const [ total, setTotal ] = useState('0');
    const [ upcoming, setUpcoming ] = useState('0');
    const [ upcomingName, setUpcomingName ] = useState('None');
    const [ fulltimeCount, setFulltimeCount ] = useState(0);
    const [ internCount, setInternCount ] = useState(0);

    const refreshData =  async() => {
        let allKeys = await loadAllKeys();
        let countNum = 0;
        if (allKeys)
            countNum = allKeys.length;

        setNow(new Date());

        [currentMonth, upcomingBirthday, fulltime, intern] = await getRequiredData();
        setUpcoming(currentMonth);
        setUpcomingName(upcomingBirthday);
        setFulltimeCount(fulltime);
        setInternCount(intern);
        setTotal(countNum);
    }

    const addHandler = () => {
        navigation.push('Add', {});
    };

    const deleteHandler = async() => {
        let staffArray = await getAllStaff();
        
        navigation.push('Delete', {'staff': staffArray});
        // navigation.navigate({name: 'Delete', params: {'staff': staffArray}});
    };

    const load = async(key) => {
        return AsyncStorage.getItem(key);
        // return SecureStore.getItemAsync(key);
    }

    const save = async(key, value) => {
        AsyncStorage.setItem(key, value);
        // SecureStore.setItemAsync(key, value);
    }

    const loadAllKeys = async() => {
        return AsyncStorage.getAllKeys();
    }

    const getAllStaff = async() => {
        let allKeys = await loadAllKeys();
        let countNum = 0;
        if (allKeys)
            countNum = allKeys.length;

        let listOfStaff = [];
        for(let i=0; i<countNum; i++) {
            let entry = await load(allKeys[i]);
            let entryJson = JSON.parse(entry);
            entryJson.title = entryJson.name;
            delete entryJson.name;
            entryJson.id = i;
            entryJson.key = allKeys[i];
            listOfStaff.push(entryJson);
        }

        return listOfStaff;
    }

    const getRequiredData = async() => {
        let allKeys = await loadAllKeys();
        let countNum = 0;
        if (allKeys)
            countNum = allKeys.length;

        let currentMonth = 0;
        let closestDate = null;
        let upcomingBirthday = ''
        let intern = 0, fulltime = 0;

        for(let i=0; i<countNum; i++) {
            let entry = await load(allKeys[i]);
            let obj = JSON.parse(entry);
            let birthday = new Date(obj.date);
            if (birthday.getMonth() == now.getMonth() && birthday.getDate() >= now.getDate()) { // get upcoming birthday month
                currentMonth += 1;
                if (closestDate == null)
                    closestDate = birthday;
                else {
                    if (closestDate.getDate() > birthday.getDate())
                        closestDate = birthday;
                }
                upcomingBirthday = obj.name + ' at ' + Moment(closestDate).format('DD-MMM-yyyy');
            }
            if (obj.type == 1)
                fulltime += 1
            else
                intern += 1
        }
        
        return [currentMonth, upcomingBirthday, fulltime, intern];
    }

    useEffect(() => {
        // save("1", `{"name": "first", "type": "1", "date": "${new Date().toDateString()}"}`);
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
            <Text category='h1'>{Moment(now).format('DD MMM yyyy')}</Text>
            <Text category='s1' style={{marginTop: '5%'}}>TODAY</Text>
        </Layout>
        
        <Layout>
        
            <Card style={styles.card}>
                <View style={styles.cardBody}>
                    <Icon name='people-outline' fill='#5faf21' style={styles.smallIcon}/>
                    <View style={{flexDirection: 'column'}}>
                        <Text category='h6' style={{color: '#5faf21'}}>Total birthday record</Text>
                        <Text category='s1'>{fulltimeCount} full-time, {internCount} intern</Text>
                    </View>
                    <Text category='h4' style={{marginLeft: 'auto', color: '#5faf21'}}>{total}</Text>
                </View>
            </Card>

            <Card style={styles.card}>
                <View style={styles.cardBody}>
                    <Icon name='gift-outline' fill='#0595ee' style={styles.smallIcon}/>
                    <View style={{flexDirection: 'column'}}>
                        <Text category='h6' style={{color: '#0595ee'}}>Birthday this month</Text>
                        <Text category='s1'>Upcoming: {upcomingName}</Text>
                    </View>
                    <Text category='h4' style={{marginLeft: 'auto', color: '#0595ee'}}>{upcoming}</Text>
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
                <ActionButton.Item title="Add birthday" buttonColor='#03e096' onPress={() => {addHandler()}}>
                    <Icon name="person-add" fill='#ffffff' style={styles.icon}/>
                </ActionButton.Item>
                <ActionButton.Item title="Remove entry" buttonColor='#ff3c71' onPress={() => {deleteHandler()}}>
                    <Icon name="trash-2" fill='#ffffff' style={styles.icon}/>
                </ActionButton.Item>
            </ActionButton>
        </Layout>
    </Layout>
)};

export default HomeScreen;