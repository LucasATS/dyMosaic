import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { FilterSelector } from "./components/filterSelector";
import { memo, useEffect, useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { presets } from "./components/presets";
import { StatusBar } from "expo-status-bar";
import { Button } from "../../components/buttom";


// UI
const UiBackgroundColor = 'white';
const UiStatusBarStyle = 'dark'; //light or dark
const UiElementsColor = 'black';

export const ImageEditor = memo(() => {
    const [onSave, setOnSave] = useState(false);
    const [photo, setPhoto] = useState(null);


    const getRandomImage = async () => {
        setOnSave(false);
        
        try {
            setPhoto("");
            // const randomNumW = Math.floor(Math.random() * 101) + 250;
            const randomNumH = Math.floor(Math.random() * 101) + 250;
            const link = await fetch(`https://picsum.photos/${randomNumH}/${randomNumH}`, 'GET');
            setPhoto(link.url);
        } catch (e) {
            console.log(e);
        }
    }


    const getImageFromGaleria = async () => {
        setOnSave(false);

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            base64: true,
            allowsEditing: true,
            aspect: [1, 1],
            // quality: 1,
        });
        if (!result.canceled) {
            setPhoto('data:image;base64,' + result.assets[0].base64);
            console.log(result.assets);
        }
    }


    const handleSaveEdit = () => {
        setOnSave(true);
    }


    useEffect(() => {
        if (photo === null) getRandomImage();
    }, []);


    return (
        <SafeAreaView style={{ flex: 1, alignSelf: 'stretch', backgroundColor: UiBackgroundColor }}>
            <StatusBar style={UiStatusBarStyle} backgroundColor={UiBackgroundColor} />

            <FilterSelector
                photo={photo}
                presets={presets}
                onSave={onSave}
                UiBackgroundColor={UiBackgroundColor} />


            {/* <Button text="APLICAR"
                onClick={handleSaveEdit}
                UiBackgroundColor={UiBackgroundColor}
                UiElementsColor={UiElementsColor}
                style={{ position: 'absolute', top: 50, right: 25 }} /> */}


            <View style={styles.grupoBotoes}>
                <Button text="FOTO ALEATÓRIA"
                    onClick={getRandomImage}
                    UiBackgroundColor={UiBackgroundColor}
                    UiElementsColor={UiElementsColor} />


                <Button text="FOTO GALERIA"
                    onClick={getImageFromGaleria}
                    UiBackgroundColor={UiBackgroundColor}
                    UiElementsColor={UiElementsColor}
                    marginTop={10} />
            </View>
        </SafeAreaView>
    );
});


const styles = StyleSheet.create({
    grupoBotoes: {
        position: 'absolute',
        display: 'flex',
        left: 25,
        right: 25,
        bottom: 15,
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