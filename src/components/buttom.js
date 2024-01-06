import { Pressable, StyleSheet, Text } from "react-native";

export const Button = ({
    onClick = () => { },
    UiBackgroundColor = 'black',
    UiElementsColor = 'white',
    text = '',
    marginTop = 0,
    style,
}) => (
    <Pressable onPress={onClick}
        style={[styles.button, styles.center, { marginTop: marginTop, backgroundColor: UiElementsColor }, style]}>
        <Text style={{ color: UiBackgroundColor }}>{text}</Text>
    </Pressable>
);



const styles = StyleSheet.create({
    grupoBotoes: {
        position: 'absolute',
        display: 'flex',
        left: 25,
        right: 25,
        bottom: 15,
    },

    button: {
        borderRadius: 6,
        height: 40,
        paddingLeft: 15,
        paddingRight: 15,
        minWidth: 80,
    },

    col: {
        display: 'flex',
        flexDirection: 'column',
    },

    row: {
        display: 'flex',
        flexDirection: 'row',
    },

    center: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },

});