import { React, useState, useEffect, useRef } from 'react';
import { TouchableOpacity, Keyboard, View } from 'react-native';
// import { WebView } from 'react-native-webview';
import styles from './theme/styles';
import { Card, Layout, Text, Input, Calendar, Select, SelectItem, IndexPath, Icon, Button, Modal } from '@ui-kitten/components';
import * as SecureStore from 'expo-secure-store';
import { useToast } from "react-native-toast-notifications";

const AddScreen = ({route, navigation}) => {
    
    const toast = useToast();
    const staffIcon = (props) => (<Icon name='people-outline' {...props} />);
    
    // UI states
    const [calendarState, setCalendarState] = useState(false);
    const [dialogState, setDialogState] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    
    // Staff entry variables
    const now = new Date();
    const [date, setDate] = useState(new Date(now.getFullYear(), now.getMonth(), now.getDate() - (27 * 365)));
    const min = new Date(now.getFullYear(), now.getMonth(), now.getDate() - (90 * 365));
    const dateRef = useRef(date);

    const [selectedIndex, setSelectedIndex] = useState(new IndexPath(0));
    const selectIndexRef = useRef(selectedIndex);
    const data = ['Full time', 'Intern'];
    const displayValue = data[selectedIndex.row];
    
    const [staffName, setStaffName] = useState('');
    const staffNameRef = useRef(staffName);

    // for async function to work...
    dateRef.current = date;
    selectIndexRef.current = selectedIndex;
    staffNameRef.current = staffName;

    useEffect(() => {
        const addStaffOptions = {
            title: 'Add staff',
            headerRight: () => (
                <TouchableOpacity onPress={() => {submitHandler()}}>
                    <Text category='s1' style={styles.headerButton}>Save</Text>
                </TouchableOpacity>
                // <Button status='success' onPress={() => submitHandler()}>Save</Button>
            )
        }
        navigation.setOptions(addStaffOptions);

    }, []);

    const save = async(key, value) => {
        SecureStore.setItemAsync(key, value);
    }

    const load = async(key) => {
        return SecureStore.getItemAsync(key);
    }
    
    const isStaffExist = async(staffName) => {
        let count = await load('count');
        let countNum = parseInt(count);
        
        for(let i=1; i<=countNum; i++) {
            let entry = await load(i.toString());
            let obj = JSON.parse(entry);
            
            if (obj.name == staffName)
                return true;
        }
        return false;
    }

    const calendarHandler = () => {
        Keyboard.dismiss();
        if (calendarState)
            setCalendarState(false);
        else
            setCalendarState(true);
    };

    const submitHandler = async() => {
        Keyboard.dismiss();
        if (staffNameRef.current == '') {
            setErrorMessage('Staff name is empty. Please fill in the staff name to proceed!');
            setDialogState(true);
        }
        else {
            let result = await isStaffExist(staffNameRef.current);
            if(result) {
                setErrorMessage(`staff ${staffNameRef.current} already exists. Please enter another name!`)
                setDialogState(true);
            }
            else {
                let count = await load('count');
                let countNum = parseInt(count);
                countNum += 1;
                
                // console.log(`{"name": "${staffNameRef.current}", "type": "${selectIndexRef.current}", "date": "${dateRef.current.toDateString()}"}`);
                await save(countNum.toString(), `{"name": "${staffNameRef.current}", "type": "${selectIndexRef.current}", "date": "${dateRef.current.toDateString()}"}`);
                await save('count', countNum.toString());
                toast.show(`Staff ${staffNameRef.current} added!`, { animationType: 'zoom-in', duration: 2500 });
                navigation.goBack();
            }
        }
    }

    return (
        <Layout style={styles.container} level='1'>
             {/* <Image style={{width: windowWidth, height: windowHeight, opacity: 0.5, position: 'absolute'}} source={require('../home/theme/background.jpg')}/> */}

            <Modal visible={dialogState} backdropStyle={styles.backdrop} onBackdropPress={() => setDialogState(false)}>
            <View style={{width: 325}}>
                <Card disabled={true}>
                    <Icon name='alert-circle-outline' fill='red' style={{width: 25, height: 25, position: 'absolute', right: 0}}/>
                    <Text style={styles.dialogHeader}>Input error</Text>
                    
                    <Text style={styles.dialogContent}>{errorMessage}</Text>
                    <TouchableOpacity onPress={() => {setDialogState(false)}}>
                        <Text category='s1' style={styles.dialogButton}>OK</Text>
                    </TouchableOpacity>
                </Card>
            </View>
            </Modal>

            <Card style={{marginTop: '10%'}}>
                <Text category='s2' style={{color: 'grey'}}>Staff name</Text>
                <Input accessoryRight={staffIcon} style={styles.input} placeholder='Name' onChangeText={text => setStaffName(text)}/>

                <Text category='s2' style={{marginTop: '10%', color: 'grey'}}>Staff type</Text>
                <Select style={{padding: 12, width: '100%'}} placeholder='Default' value={displayValue} selectedIndex={selectedIndex} onSelect={index => {setSelectedIndex(index)}}>
                    <SelectItem title='Full time'/>
                    <SelectItem title='Intern'/>
                </Select>

                <TouchableOpacity onPress={calendarHandler}>
                    <Text category='s2' style={{marginTop: '10%', color: 'grey'}}>Date</Text>
                    <Text accessoryRight={staffIcon} style={styles.text}>{date.toDateString()}</Text>
                    {/* <Input accessoryRight={staffIcon} style={styles.input} value={date.toDateString()} showSoftInputOnFocus={false} /> */}
                </TouchableOpacity>
                
                <Calendar style={{display: calendarState? 'flex': 'none'}} date={date} min={min} max={now} onSelect={nextDate => setDate(nextDate)}/>
                
            </Card>
        </Layout>
    );
}

export default AddScreen;