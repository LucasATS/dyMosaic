import { useState } from "react";
import { Button, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import WebView from "react-native-webview";

export const TesteWeb = () => {

    const base64Img = "data:image/gif;base64,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";

    const [imgTeste, setImgTeste] = useState("");
    const [currentFilter, setCurrentFilter] = useState("");

    const [tamanhos, setTamanhos] = useState([200, 200]);

    const updateImg = async () => {
        console.log('Carregando imagem...');
        try {
            setImgTeste("");
            const randomNumW = Math.floor(Math.random() * 101) + 250;
            const randomNumH = Math.floor(Math.random() * 101) + 250;
            const link = await fetch(`https://picsum.photos/${randomNumW}/${randomNumH}`, 'GET');
            setTamanhos([randomNumW, randomNumH]);
            setImgTeste(link.url);
        } catch (e) {
            console.log(e);
        }
    }

    const onFuncPlay = (e) => {
        const key = e.nativeEvent.data;

        try {
            mudarFiltro(key);
        } catch (err) {
            console.log(err);
        }
    }

    const mudarFiltro = (key) => {
        switch (key) {
            case 'solar':
                setCurrentFilter(solar);
                break;

            case 'seafoam':
                setCurrentFilter(seafoam);
                break;

            case 'lofi':
                setCurrentFilter(lofi);
                break;

            default:
                setCurrentFilter("");
                break;
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, alignSelf: 'stretch' }}>
            <WebView
                onMessage={onFuncPlay}
                style={{ marginTop: 35, backgroundColor: 'white', flex: 1, alignSelf: 'stretch' }}
                renderLoading={() => {
                    return (
                        <Text
                            style={{ textAlign: 'center', marginTop: '50%', fontSize: 20 }}>
                            {' '}Carregando...{' '}
                        </Text>
                    );
                }}
                originWhitelist={['*']}
                source={{
                    html: `
                <style>${currentFilter}</style>
                <div style="display:flex;justify-content:center;align-items:center;height: 100%;flex-direction: column; gap: 25px;">
                
                <!-- PRINCIPAL -->
                ${ImageViewHtml({ src: imgTeste })}
                
                <!-- PRESETS -->
                ${PresetsOptions({ src: imgTeste, presets: presets })}

                </div>
                `
                }}
            />

            <View style={styles.grupoBotoes}>
                <Pressable onPress={updateImg}
                    style={[styles.button, styles.center, styles.shadownButton1, { marginTop: 15 }]}>
                    <Text>MUDAR IMAGEM</Text>
                </Pressable>
            </View>

        </SafeAreaView>
    );
}


// PRESETS
const presets = [
    {
        name: 'Original',
        code: ``,
    },
    {
        name: 'Solar',
        code: `.filterParent{position:relative}.filterParent:after{position:absolute;content:'';display:block;top:0;left:0;height:100%;width:100%;background:linear-gradient(to bottom,rgba(20,0,255,.65) 0,rgba(0,188,255,.4) 100%);mix-blend-mode:exclusion}`,
    },
    {
        name: 'Seafoam',
        code: `.filterParent{position:relative}.filterParent:after{position:absolute;content:'';display:block;top:0;left:0;height:100%;width:100%;background:linear-gradient(to bottom,#00ff54 0,#003dff 100%);mix-blend-mode:color}`,
    },
    {
        name: 'Lofi',
        code: `.filterParent{position:relative}.filterParent:after{position:absolute;content:'';display:block;top:0;left:0;height:100%;width:100%;background:radial-gradient(ellipse at center,rgba(0,0,0,0) 0,rgba(34,34,34,.99) 100%);mix-blend-mode:multiply}`,
    },
]
const solar = `.filterParent{position:relative}.filterParent:after{position:absolute;content:'';display:block;top:0;left:0;height:100%;width:100%;background:linear-gradient(to bottom,rgba(20,0,255,.65) 0,rgba(0,188,255,.4) 100%);mix-blend-mode:exclusion}`;
const seafoam = `.filterParent{position:relative}.filterParent:after{position:absolute;content:'';display:block;top:0;left:0;height:100%;width:100%;background:linear-gradient(to bottom,#00ff54 0,#003dff 100%);mix-blend-mode:color}`;
const lofi = `.filterParent{position:relative}.filterParent:after{position:absolute;content:'';display:block;top:0;left:0;height:100%;width:100%;background:radial-gradient(ellipse at center,rgba(0,0,0,0) 0,rgba(34,34,34,.99) 100%);mix-blend-mode:multiply}`;


const ImageViewHtml = ({
    src = '',
    width = '900px',
    onClick = 'updateImg()',
}) => {
    return (
        `<div class="filterParent" style="width: ${width};" onclick="window.ReactNativeWebView.postMessage('${onClick}')">
    <img src="${src}"class="filtroChild" width=${width}; style="display:flex;justify-content:center;align-content:center;object-fit: center/contain;" />
    </div>`)
}


const PresetViewHtml = ({
    src = '',
    width = '200px',
    onClick = 'updateImg()',
    name = '',
}) => {
    const textStyle = `text-align:center;margin-top:-50px;color:white;font-size:35px; text-shadow:-2px -2px 0 #000,2px -2px 0 #000,-2px 2px 0 #000,2px 2px 0 #000;`

    return (
        `<span onclick="window.ReactNativeWebView.postMessage('${onClick}')"><div class="filterParent" style="width: ${width};">
    <img src="${src}"class="filtroChild" width="${width}" height="${width}" style="display:flex;justify-content:center;align-content:center;object-fit: center/contain;border-radius: 16px" />
    </div><h1 style="${textStyle}">${name}</h1></span>`)
}


const PresetsOptions = ({
    src = '',
    width = '900px',
    widthImg = '200px',
    presets = []
}) => {
    let data = [`<div style="display: flex; flex-direction: row; gap: 30px; overflow-y: scroll; width: ${width}; height: ${widthImg}; justify-content: center;">`];
    data.push(presets.map(a => PresetViewHtml({ src, width: widthImg, onClick: a.name, name: a.name })).join(" "));
    data.push('</div>');
    return data.join(" ");
}
console.log();


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

    right: {
        justifyContent: 'flex-end',
        // textAlign: 'end'
    },

    left: {
        justifyContent: 'flex-start',
        textAlign: 'left',
    },

    max: {
        width: 100 + '%',
        height: 100 + '%',
    },

    animation: {
        transition: 'all 0.1s',
    },

})