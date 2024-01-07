import { StyleSheet, View, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import React from 'react';


export default ({ value, name, minimum, maximum, step = 1, onChange }) => (
    <View style={styles.container}>
        <Text style={styles.text}>{name}</Text>
        <Slider
            style={styles.slider}
            value={value}
            minimumValue={minimum}
            maximumValue={maximum}
            step={step}
            onValueChange={onChange}
        />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 300,
        paddingLeft: 20,
    },
    text: { textAlign: 'center' },
    slider: { width: 150 },
});
