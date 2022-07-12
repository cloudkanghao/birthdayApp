import { React, useState, useEffect, useRef } from 'react';
import { TouchableOpacity, Keyboard, View, Dimensions } from 'react-native';
import styles from './theme/styles';
import { Card, Layout, Text, Input, Icon, Modal, SelectItem } from '@ui-kitten/components';
// import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from "react-native-toast-notifications";
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';

const DeleteScreen = ({route, navigation}) => {
    
    const toast = useToast();

    // UI states
    const [dialogState, setDialogState] = useState(false);
    const [errorDialogState, setErrorDialogState] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [staffArray, setStaffArray] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const selectedItemRef = useRef(selectedItem);
    selectedItemRef.current = selectedItem;

    useEffect(() => {
        const addStaffOptions = {
            title: 'Remove entry',
            headerRight: () => (
                <TouchableOpacity onPress={() => {submitHandler()}}>
                    <Text category='s1' style={styles.headerButton}>Delete</Text>
                </TouchableOpacity>
            )
        }
        navigation.setOptions(addStaffOptions);
        setStaffArray(route.params.staff);
        
    }, []);

    const save = async(key, value) => {
        // SecureStore.setItemAsync(key, value);
        AsyncStorage.setItem(key, value);
    }

    const remove = async(key) => {
        AsyncStorage.removeItem(key);
        // SecureStore.deleteItemAsync(key);
    }

    const load = async(key) => {
        return AsyncStorage.getItem(key);
        // return SecureStore.getItemAsync(key);
    }

    const submitHandler = () => {
        if (selectedItemRef.current == null)
            setErrorDialogState(true);
        else {
            remove(selectedItemRef.current.key);
            setDialogState(true);
        }
    }

    const yesHandler = () => {
        setDialogState(false);
        let value = selectedItemRef.current;
        console.log(`${value.id}: ${value.title}`);
        // remove(value.id.toString());
        navigation.goBack();
    }

    return (
        <Layout style={styles.container} level='1'>
             {/* <Image style={{width: windowWidth, height: windowHeight, opacity: 0.5, position: 'absolute'}} source={require('../home/theme/background.jpg')}/> */}

            <Modal visible={dialogState} backdropStyle={styles.backdrop} onBackdropPress={() => setDialogState(false)}>
                <View style={{width: 325}}>
                    <Card disabled={true}>
                        <Icon name='question-mark-circle-outline' fill='#03e096' style={{width: 25, height: 25, position: 'absolute', right: 0}}/>
                        <Text style={styles.dialogHeader}>Are you sure?</Text>
                        
                        <Text style={styles.dialogContent}>Clicking YES will remove the staff entry permanently. Do you wish proceed?</Text>
                        <View style={{flex: 1, flexDirection: 'row-reverse'}}>
                            <TouchableOpacity onPress={() => {yesHandler()}}>
                                <Text category='s1' style={styles.dialogButton}>YES</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {setDialogState(false)}}>
                                <Text category='s1' style={styles.dialogCancelButton}>CANCEL</Text>
                            </TouchableOpacity>
                        </View>
                    </Card>
                </View>
            </Modal>

            <Modal visible={errorDialogState} backdropStyle={styles.backdrop} onBackdropPress={() => setErrorDialogState(false)}>
                <View style={{width: 325}}>
                    <Card disabled={true}>
                        <Icon name='alert-circle-outline' fill='red' style={{width: 25, height: 25, position: 'absolute', right: 0}}/>
                        <Text style={styles.dialogHeader}>Input error</Text>
                        <Text style={styles.dialogContent}>Please select a valid staff name.</Text>
                        <TouchableOpacity onPress={() => {setErrorDialogState(false)}}>
                            <Text category='s1' style={styles.dialogButton}>OK</Text>
                        </TouchableOpacity>
                    </Card>
                </View>
            </Modal>

            <Card style={{marginTop: '10%', paddingBottom: '70%'}}>
                <Text category='s2' style={{color: 'grey'}}>Staff name</Text>
                {/* <Input accessoryRight={staffIcon} style={styles.input} placeholder='Name' onChangeText={text => setStaffName(text)}/> */}

                <AutocompleteDropdown inputContainerStyle={styles.autocomplete} clearOnFocus={false} onSelectItem={(select) => {setSelectedItem(select)}}
                    initialValue={{ id: '2' }} dataSet={staffArray}/>

            </Card>
        </Layout>
    );
}

export default DeleteScreen;