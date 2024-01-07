import { StyleSheet, View, Text, TouchableNativeFeedback, TouchableHighlight } from 'react-native';
import ImageFilters from 'react-native-gl-image-filters';
import { Surface } from 'gl-react-expo';


export default ({
    preset = {},
    scale = 70,
    gap = 10,
    photo,
    onClick = () => { },
    isSelect = false,
    borderColor = 'black',
}) => {
    const calcScale = scale + (isSelect ? -5 : 0);


    return (
        <TouchableHighlight
            onPress={onClick}
            style={[css.container, css.center, { width: scale, height: scale, marginLeft: gap, borderColor, borderWidth: isSelect ? 5 : 0 }]}>
            <>
                <Surface style={{ width: calcScale, height: calcScale, ...css.container, borderRadius: 4 }}>
                    <ImageFilters {...preset} width={calcScale} height={calcScale}>{photo}</ImageFilters>
                </Surface>
                <Text style={[css.text, { width: scale, height: scale, bottom: isSelect ? 0 : 5 }]}>{preset?.name}</Text>
            </>
        </TouchableHighlight>
    ); s
};


const css = StyleSheet.create({
    container: {
        backgroundColor: '#d6d6d6',
        borderRadius: 6,
    },

    text: {
        position: 'absolute',
        textAlign: 'center',
        textAlignVertical: 'bottom',
        color: 'white',
        textShadowColor: 'black',
        textShadowRadius: 5,
        fontSize: 16,
    },

    center: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
});
