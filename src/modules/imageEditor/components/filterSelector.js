import WebView from "react-native-webview";
import { memo, useEffect, useState } from "react";
import { screenShotElementWebView } from "../../../components/ScreenshotElementWebView";


const tagFilterParent = 'filterParent';
const tagFiltroChild = 'filtroChild';


export const FilterSelector = memo(({
    photo,
    presets,
    UiBackgroundColor = 'black',
    onSave = false,
}) => {
    const [injectedScript, setInjectedScript] = useState("");
    const [currentFilter, setCurrentFilter] = useState("");


    const onMessage = (e) => {
        const key = e.nativeEvent.data;
        console.log(key);
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
        html: `
        <style>${currentFilter}</style>
        
        <script>${require('../../../components/teste.json').code}</script>
        
        ${RenderSaveButton()}

        <div style="display: flex; justify-content: center; align-items: center; height: 100%; flex-direction: column; gap: 25px;" id="imageEdit">
        
        <!-- PRINCIPAL -->
        ${RenderPhotoHtml({ src: photo })}
        
        <!-- PRESETS -->
        ${RenderPresetsOptions({ src: photo, presets })}

        </div>`
    }

    // useEffect(() => {
    //     onSave && console.log(onSave);
    //     onSave && setInjectedScript(`alert('oi a')`);
    // }, [onSave]);


    return (<WebView
        onMessage={onMessage}
        // injectedJavaScript={screenShotElementWebView}
        style={{ marginTop: 35, backgroundColor: UiBackgroundColor, flex: 1, alignSelf: 'stretch' }}
        renderLoading={() => <Text style={{ textAlign: 'center', marginTop: '50%', fontSize: 20 }}>{' '}Carregando...{' '}</Text>}
        originWhitelist={['*']}
        source={htmlCode}
    />);
});


const RenderSaveButton = () => {
    const script = `
        <script>
        const teste = () => {
                alert(typeof(html2canvas));
        }

        function capturarScreenshot(elementoID) {
            var elemento = document.getElementById(elementoID); // Obtenha o elemento pelo ID
        
            html2canvas(elemento).then(function(canvas) {
                // Quando a promessa for resolvida, você terá um objeto de canvas que pode ser exportado para uma imagem
                var link = document.createElement('a');
                link.href = canvas.toDataURL("image/png");

                // alert(link.href);
                window.ReactNativeWebView.postMessage(link.href);

                // link.download = 'screenshot.png';
                // link.click();
            });
        }

        </script>
    `


    const style = `
    position: absolute;
    top: 10px;
    right: 45px;
    height: 100px; 
    width: 200px; 
    font-size: 40px; 
    background-color: black; 
    color: white; 
    border-radius: 16px;`;


    return (`${script}<button style="${style}" onclick="capturarScreenshot('imageEdit')">APLICAR</button>`);
};


const RenderPhotoHtml = ({
    src = '',
    width = '900px',
}) => {
    const imgStyle = `display:flex; justify-content:center; align-content:center; object-fit: center/contain;`;

    return (`<div class="filterParent" style="width: ${width};">
        <img src="${src}"class="filtroChild" width=${width}; style="${imgStyle}" />
    </div>`);
};


const RenderPresetHtml = ({
    src = '',
    width = '180px',
    postMessage = '',
    name = '',
    code = '',
}) => {
    const textStyle = (`
    text-align:center; 
    margin-top: -60px; z-index: 1;
    position: relative;
    color:white;
    font-size:35px;
    text-shadow: -2px -2px 0px #000, 2px -2px 0px #000, -2px 2px 0px #000, 2px 2px 0px #000;
    `);

    const imgStyle = `display: flex; justify-content: center; align-content: center; border-radius: 8px; object-fit: cover;`;


    const tagFilterParentPreview = 'FP_' + name;
    const tagFiltroChildPreview = 'FC_' + name;


    const styleFilterPreview = `<style>
    ${code.replaceAll(tagFilterParent, tagFilterParentPreview).replaceAll(tagFiltroChild, tagFiltroChildPreview)}
    .${tagFilterParentPreview}:after{border-radius: 8px;}
    </style>`;


    return (`${styleFilterPreview}
    <span onclick="window.ReactNativeWebView.postMessage('${postMessage}')">
    <div class="${tagFilterParentPreview}" style="width: ${width};">
    <img src="${src}"class="${tagFiltroChildPreview}" width="${width}" height="${width}" style="${imgStyle}" />
    </div>
    <h1 style="${textStyle}">${name}</h1>
    </span>`)
}


const RenderPresetsOptions = ({
    src = '',
    width = '900px',
    widthImg = '180px',
    presets = []
}) => {
    let data = [`<div style="display: flex; flex-direction: row; gap: 30px; overflow-y: scroll; width: ${width}; height: ${widthImg};">`];
    data.push(presets.map(a => RenderPresetHtml({ src, width: widthImg, postMessage: a.name, name: a.name, code: a.code })).join(" "));
    data.push('</div>');
    return data.join(" ");
}