import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { screenShotElementWebView } from "./ScreenshotElementWebView";
import { memo, useEffect, useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import WebView from "react-native-webview";
import { presets } from "./Filteres";


const tagFilterParent = 'filterParent';
const tagFiltroChild = 'filtroChild';


export const TesteWeb = memo(() => {
    const [photo, setPhoto] = useState(null);
    const [currentFilter, setCurrentFilter] = useState("");


    const updateImg = async () => {
        try {
            setPhoto("");
            const randomNumW = Math.floor(Math.random() * 101) + 250;
            const randomNumH = Math.floor(Math.random() * 101) + 250;
            const link = await fetch(`https://picsum.photos/${randomNumW}/${randomNumH}`, 'GET');
            setPhoto(link.url);
        } catch (e) {
            console.log(e);
        }
    }


    const updateImgGaleria = async () => {
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


    useEffect(() => {
        if (photo === null) updateImg();
    }, []);


    const onMessage = (e) => {
        const key = e.nativeEvent.data;
        try {
            mudarFiltro(key);
        } catch (err) {
            console.log(err);
        }
    }


    const mudarFiltro = (key) => {
        presets.forEach(data => {
            if (data.name.toUpperCase() === key.toUpperCase()) {
                setCurrentFilter(data.code);
            }
        });
    }


    const htmlCode = {
        html: `<style>${currentFilter}</style>
        <div style="display:flex;justify-content:center;align-items:center;height: 100%;flex-direction: column; gap: 25px;">
        <!-- PRINCIPAL -->
        ${ImageViewHtml({ src: photo })}
        <!-- PRESETS -->
        ${PresetsOptions({ src: photo, presets: presets })}
        </div>`
    }


    return (
        <SafeAreaView style={{ flex: 1, alignSelf: 'stretch' }}>
            <WebView
                onMessage={onMessage}
                style={{ marginTop: 35, backgroundColor: 'white', flex: 1, alignSelf: 'stretch' }}
                renderLoading={() => <Text style={{ textAlign: 'center', marginTop: '50%', fontSize: 20 }}>{' '}Carregando...{' '}</Text>}
                originWhitelist={['*']}
                source={htmlCode}
            />

            <View style={styles.grupoBotoes}>
                <Pressable onPress={updateImg}
                    style={[styles.button, styles.center, styles.shadownButton1, { marginTop: 15 }]}>
                    <Text>FOTO ALEATÓRIA</Text>
                </Pressable>
                <Pressable onPress={updateImgGaleria}
                    style={[styles.button, styles.center, styles.shadownButton1, { marginTop: 15 }]}>
                    <Text>FOTO GALERIA</Text>
                </Pressable>
            </View>

        </SafeAreaView>
    );
});


const ImageViewHtml = ({
    src = '',
    width = '900px',
}) => {
    const imgStyle = `display:flex;justify-content:center;align-content:center;object-fit: center/contain;`;
    return (`<div class="filterParent" style="width: ${width};" id="imageEdit">
    <img src="${src}"class="filtroChild" width=${width}; style="${imgStyle}" />
    </div>`)
}


const PresetViewHtml = ({
    src = '',
    width = '180px',
    postMessage = '',
    name = '',
    code = '',
}) => {
    const textStyle = `text-align:center;margin-top: -60px;z-index: 1;position: relative;color:white;font-size:35px; text-shadow:-2px -2px 0 #000,2px -2px 0 #000,-2px 2px 0 #000,2px 2px 0 #000;`;
    const imgStyle = `display:flex;justify-content:center;align-content:center;border-radius: 16px; object-fit: cover;`;


    const tagFilterParentPreview = 'FP_' + name;
    const tagFiltroChildPreview = 'FC_' + name;


    const styleFilterPreview = `<style>
    ${code.replaceAll(tagFilterParent, tagFilterParentPreview).replaceAll(tagFiltroChild, tagFiltroChildPreview)}
    .${tagFilterParentPreview}:after{border-radius: 16px;}
    </style>`;


    return (`${styleFilterPreview}
    <span onclick="window.ReactNativeWebView.postMessage('${postMessage}')">
    <div class="${tagFilterParentPreview}" style="width: ${width};">
    <img src="${src}"class="${tagFiltroChildPreview}" width="${width}" height="${width}" style="${imgStyle}" />
    </div>
    <h1 style="${textStyle}">${name}</h1>
    </span>`)
}


const PresetsOptions = ({
    src = '',
    width = '900px',
    widthImg = '180px',
    presets = []
}) => {
    let data = [`<div style="display: flex; flex-direction: row; gap: 30px; overflow-y: scroll; width: ${width}; height: ${widthImg};">`];
    data.push(presets.map(a => PresetViewHtml({ src, width: widthImg, postMessage: a.name, name: a.name, code: a.code })).join(" "));
    data.push('</div>');
    return data.join(" ");
}


const styles = StyleSheet.create({
    grupoBotoes: {
        position: 'absolute',
        display: 'flex',
        left: 10,
        right: 10,
        bottom: 35,
    },

    button: {
        backgroundColor: '#abc8f7',
        borderRadius: 6,
        height: 40,
        paddingLeft: 15,
        paddingRight: 15,
        minWidth: 80,
    },

    shadownButton1: {
        shadowColor: '#abc8f7',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 5,
        shadowRadius: 10,
        elevation: 10
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

})