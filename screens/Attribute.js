import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function Attribute({ name, value, onIncrease, onDecrease }) {
    return (
        <View style={styles.container}>

            <Text style={styles.name}>{name}</Text>

            <View style={styles.controls}>

                <TouchableOpacity onPress={onDecrease}>
                    <FontAwesome name="minus" size={24} color="red" />
                </TouchableOpacity>

                <Text style={styles.value}>{value}</Text>

                <TouchableOpacity onPress={onIncrease}>
                    <FontAwesome name="plus" size={24} color="green" />
                </TouchableOpacity>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        marginVertical: 5,
        backgroundColor: '#333',
        borderRadius: 5,
    },

    name: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },

    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },

    value: {
        fontSize: 16,
        color: '#fff',
        minWidth: 25,
        textAlign: 'center',
    },
});