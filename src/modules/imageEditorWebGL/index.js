import { Dimensions, Image, Platform, SafeAreaView, Text, View } from "react-native";
import getRandomImage from "../_shared/util/getRandomImage";
import ImageFilters from "react-native-gl-image-filters";
import { captureRef } from 'react-native-view-shot';
import { useEffect, useRef, useState } from "react";
import * as MediaLibrary from 'expo-media-library';
import { Button } from "../../components/buttom";
import Filter from "./components/Filter";
import { Surface } from "gl-react-expo";


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


const width = Platform.OS === 'web' ? 500 : Dimensions.get('window').width - 50;

export const ImageEditorWebGL = (
) => {
    const [state, setState] = useState(
        {
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
        });
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

            console.log('MediaLibrary Permission Status:', status);
            await MediaLibrary.saveToLibraryAsync(localUri);
            if (localUri) {
                alert("Saved!");
            }
        } catch (e) {
            console.log(e);
        }
    };

    const [photo, setPhoto] = useState(null);

    const onRandomImage = async () => {
        setPhoto(await getRandomImage());
    }

    useEffect(() => {
        if (photo === null) onRandomImage();
    }, []);

    return (<SafeAreaView>

        {/* <Button text="APLICAR"
            onClick={onSaveImageAsync}
            UiElementsColor={`black`}
            UiBackgroundColor={`white`}
            style={{ position: 'absolute', top: 50, right: 25 }} /> */}

        <Button
            text="Solicitar Permissão"
            onClick={requestPermission}
            UiElementsColor={`black`}
            UiBackgroundColor={`white`}
            style={{ position: 'absolute', top: 50, right: 25 }}
        />


        <Text style={{ marginTop: 55, fontSize: 20, left: 10 }}>Selecionar filtro</Text>
        {photo && <>
            <Surface ref={imageRef} style={{ width, height: width, marginTop: 25 }}>
                <ImageFilters {...state}
                    width={width} height={width}>
                    {{ uri: photo }}
                    {/* {require('../../assets/icon.png')} */}
                </ImageFilters>
            </Surface>

            <View style={{ marginTop: 25 }}>
                {settings.map(filter => (
                    <Filter
                        key={filter.name}
                        name={filter.name + ' ' + state[filter.name].toFixed(1)}
                        value={state[filter.name]}
                        minimum={filter.minValue}
                        maximum={filter.maxValue}
                        step={filter.step}
                        onChange={value => { setState(prevState => ({ ...prevState, [filter.name]: value })) }}
                    />
                ))}
            </View>
        </>}

    </SafeAreaView>);
}


