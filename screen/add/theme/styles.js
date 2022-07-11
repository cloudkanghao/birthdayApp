import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    controlContainer: {
        borderRadius: 4,
        margin: 2,
        padding: 6,
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    },
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 216,
    },
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    formContainer: {
        flex: 1,
        marginTop: 32,
        paddingHorizontal: 16,
    },
    text: {
        margin: 4,
        padding: 12,
        borderBottomWidth: 1,
        backgroundColor: '#ffffff',
        borderColor: '#c1c1c1'
    },
    input: {
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        backgroundColor: '#ffffff',
        borderColor: '#c1c1c1',
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    dialogHeader: {
        fontSize: 18.5,
        fontWeight: 'bold'
    },
    dialogContent: {
        marginBottom: 60,
        marginTop: 30,
        fontSize: 16
        // marginLeft: 20,
        // marginRight: 20
    },
    dialogView: {
        justifyContent: 'center',
        alignContent: 'center'
    },
    dialogButton: {
        textAlign: 'right',
        paddingRight: 10,
        color: '#03e096',
        fontWeight: 'bold'
    },
    headerButton: {
        textAlign: 'right',
        paddingRight: 15,
        color: '#03e096',
        fontWeight: 'bold',
        fontSize: 16
    }
});

export default styles;