import { Dimensions, Platform, SafeAreaView, StyleSheet, Text, View } from "react-native";
import getImageFromGaleria from "../_shared/util/getImageFromGaleria";
import getRandomImage from "../_shared/util/getRandomImage";
import { customPresets } from "./components/customPresets";
import ImageFilters from "react-native-gl-image-filters";
import EditorAdvanced from "./components/EditorAdvanced";
import EditorSimple from "./components/EditorSimple";
import { captureRef } from 'react-native-view-shot';
import { useEffect, useRef, useState } from "react";
import * as MediaLibrary from 'expo-media-library';
import { Button } from "../../components/buttom";
import { StatusBar } from "expo-status-bar";
import { ScrollView } from "react-native";
import { Surface } from "gl-react-expo";
import Constants from 'expo-constants';


const settings = [
    {
        name: 'hue',
        minValue: 0,
        maxValue: 6.3,
    },
    {
        name: 'blur',
        minValue: 0,
        maxValue: 30,
    },
    {
        name: 'sepia',
        minValue: -5,
        maxValue: 5,
    },
    {
        name: 'sharpen',
        minValue: 0,
        maxValue: 15,
    },
    {
        name: 'negative',
        minValue: -2.0,
        maxValue: 2.0,
    },
    {
        name: 'contrast',
        minValue: -10.0,
        maxValue: 10.0,
    },
    {
        name: 'saturation',
        minValue: 0.0,
        maxValue: 2,
    },
    {
        name: 'brightness',
        minValue: 0,
        maxValue: 5,
    },
    {
        name: 'temperature',
        minValue: 0.0,
        maxValue: 40000.0,
    },
    {
        name: 'exposure',
        step: 0.05,
        minValue: -1.0,
        maxValue: 1.0,
    },
];
const filtroDefault = {
    ...settings,
    hue: 0,
    blur: 0,
    sepia: 0,
    sharpen: 0,
    negative: 0,
    contrast: 1,
    saturation: 1,
    brightness: 1,
    temperature: 6500,
    exposure: 0,
}


// UI
// DARK
const UiBackgroundColor = 'black';
const UiStatusBarStyle = 'light'; //light or dark
const UiElementsColor = 'white';

// LIGHT
// const UiBackgroundColor = 'white';
// const UiStatusBarStyle = 'dark'; //light or dark
// const UiElementsColor = 'black';


const width = Platform.OS === 'web' ? 500 : Dimensions.get('window').width - 50;
const { height, width: absWidth } = Dimensions.get('window');
const heightStatusBar = Constants.statusBarHeight;


export const ImageEditorWebGL = (
) => {
    const [modo, setModo] = useState(false);


    const [filtroCurrent, setFiltroCurrent] = useState(customPresets[0]);
    const [photo, setPhoto] = useState(null);
    const imageRef = useRef();


    const [status, requestPermission] = MediaLibrary.usePermissions();
    if (status === null) {
        requestPermission();
    }


    const onSaveImageAsync = async () => {
        try {
            const localUri = await captureRef(imageRef, {
                height: 440,
                quality: 1,
            });
            console.log(localUri);

            // console.log('MediaLibrary Permission Status:', status);
            // await MediaLibrary.saveToLibraryAsync(localUri);
            // if (localUri) {
            //     alert("Saved!");
            // }
        } catch (e) {
            console.log(e);
        }
    };


    const handleRandomImage = async () => {
        setPhoto(await getRandomImage());
    }
    useEffect(() => {
        if (photo === null) handleRandomImage();
    }, []);


    const handleImageFromGaleria = async () => {
        setPhoto(await getImageFromGaleria());
    }


    return (<SafeAreaView>
        <StatusBar style={UiStatusBarStyle} backgroundColor={UiBackgroundColor} />


        {photo
            ? <View style={[styles.center, { width: absWidth, height: height + heightStatusBar, backgroundColor: UiBackgroundColor }]}>
                {/* RESULT EDIT */}
                <Surface ref={imageRef} style={{ width: absWidth, height: absWidth }}>
                    <ImageFilters {...filtroCurrent} width={width} height={width}>{{ uri: photo }}</ImageFilters>
                </Surface>

                <View style={[styles.center, { width: absWidth, marginTop: 10 }]}>

                    {/* EDITOR */}
                    {modo ? settings.map(filter =>
                        <EditorAdvanced
                            colorText={UiElementsColor}
                            key={filter.name}
                            name={filter.name + ' ' + filtroCurrent[filter.name].toFixed(1)}
                            value={filtroCurrent[filter.name]}
                            minimum={filter.minValue}
                            maximum={filter.maxValue}
                            step={filter.step}
                            onChange={value => setFiltroCurrent(prevState => ({ ...prevState, [filter.name]: value }))}
                        />
                    ) :
                        <ScrollView horizontal={true} contentOffset={{ x: 0 }} style={{ marginLeft: 10, marginRight: 10 }}>
                            {customPresets.map((item, index) =>
                                <EditorSimple
                                    key={index}
                                    preset={item}
                                    isSelect={filtroCurrent.name === item.name}
                                    gap={index === 0 ? 0 : 10}
                                    onClick={() => setFiltroCurrent(item)}
                                    photo={{ uri: photo }}
                                    borderColor={UiElementsColor} />
                            )}
                        </ScrollView>
                    }

                </View>
            </View>
            : <Text style={[styles.center, styles.loadingText, {
                width: absWidth, height: height + heightStatusBar,
                backgroundColor: UiBackgroundColor, color: UiElementsColor
            }]}>Carregando...</Text>
        }


        {/* HEADER */}
        <View style={[styles.row, styles.center, styles.grupoBotoes, { top: heightStatusBar }]}>
            <Text style={{ width: 100, color: UiElementsColor }} >Selecionar filtro</Text>
            <Button style={{ width: 100 }} text="APLICAR" onClick={onSaveImageAsync}
                UiElementsColor={UiElementsColor} UiBackgroundColor={UiBackgroundColor} />
        </View>


        {/* MENU */}
        <View style={[styles.grupoBotoes, styles.row, { bottom: 5 }]}>
            <Button text="FOTO ALEATÓRIA"
                onClick={handleRandomImage}
                UiBackgroundColor={UiBackgroundColor}
                UiElementsColor={UiElementsColor} />

            <Button text="MUDAR MODO"
                onClick={() => { setFiltroCurrent(filtroDefault); setModo((old) => !old); }}
                UiBackgroundColor={UiBackgroundColor}
                UiElementsColor={UiElementsColor} />

            <Button text="GALERIA"
                onClick={handleImageFromGaleria}
                UiBackgroundColor={UiBackgroundColor}
                UiElementsColor={UiElementsColor}
                marginTop={0} />
        </View>
    </SafeAreaView>);
}


const styles = StyleSheet.create({
    grupoBotoes: {
        position: 'absolute',
        display: 'flex',
        left: 25,
        right: 25,
        justifyContent: 'space-between',
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

    loadingText: {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 18,

    }

});


