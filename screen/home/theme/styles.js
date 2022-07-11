import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 200,
    },
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    card: {
        height: '20%'
    },
    cardBody: {
        flexDirection: 'row',
    },
    icon: {
        width: 32,
        height: 32,
    },
    smallIcon: {
        width: 25,
        height: 25,
        marginRight: '5%',
        marginTop: '30%'
    }
});

export default styles;