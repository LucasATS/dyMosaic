# dyMosaic: App de edição de imagem

by Thalia

## **Sobre**

Ser um app simples de edição básica de imagem usando filtros.
No inicio foi complexo pois foi necessário o usu de ferramentas avançadas, entretanto, ao notar que tudo podia ser resolvido apenas com webview, o sistema ficou super mais tranquilo e simples de entender. O foco agora é aprimorar o código e realizar a integração no sistema ATP.

O código com webview foi aprimorado, e consegui obter um resultado muito bom, o tempo de carregamento e o processamento da imagem são bons, entretanto, não consegui renderizar e salvar a imagem editada. Oque é lógico, péssimo para a situação. Eu tinha mais um plano em mente para isso, mas antes que pude dar inicio a ele, encontrei uma biblioteca interesante usando openGL e webGL. Implementei, e deu certo, além disso, consegui salvar a imagem editada, os prontos negativos são que eu não posso utilizar filtros complexos igual ao do Webview, além disso a qualidade da imagem ficou um pouco baixa, mas os resultados ainda são interesantes, aparentemente, irei continuar implementando essa versão pois é mais ideal para o sistema no momento, entretanto, acredito que a versão webview, se fosse mais bem elaborada, poderia dar mais resultados com o meu outro conceito de renderização de imagem que não pude testar. 

Obs: a grande chance de eu não testar esse outro conceito, principalmente agora que não consigo mais acessar o webview por algum motivo de bug.

## **Primeiras imagens**
<p align="center">
  <img height="400px" src=".github/photos/version%200.01.jpeg">
  <img height="400px" src=".github/photos/version%200.02%20(a).jpeg">
  <img height="400px" src=".github/photos/version%200.02%20(b).jpeg">
</p>

## **📂 PLAY EXPO**

> Funciona apenas no mobile

    npx expo start --web

    ou

    npx expo start
    npx expo start --ios
    npx expo start --android

## **📚 BIBLIOTECA**

    npm install expo
    
    npx expo install expo-status-bar react react-native expo-image-picker expo-sharing react-native-webview expo-constants react-native-web react-dom @expo/webpack-config

## Sobre

dyMosaic: Transforme suas fotos em obras de arte!

Descrição: dyMosaic é um aplicativo de edição de imagem que permite aos usuários transformar suas fotos em belas obras de arte. Com uma variedade de filtros e ferramentas de edição, DyMosaic oferece uma experiência de edição de imagem sem igual. Seja para ajustar a luminosidade, contraste, saturação ou aplicar efeitos artísticos, DyMosaic tem tudo o que você precisa para tornar suas fotos verdadeiramente únicas.

Objetivos: Nosso objetivo é fornecer aos usuários uma plataforma intuitiva e fácil de usar para edição de imagens. Queremos que nossos usuários se sintam como verdadeiros artistas, dando-lhes o poder de transformar suas fotos comuns em algo extraordinário.

Metas Futuras: Estamos sempre buscando melhorar e expandir nossas ofertas. No futuro, planejamos adicionar mais filtros e ferramentas de edição, além de recursos como a capacidade de editar vídeos. Também estamos explorando a possibilidade de integrar a inteligência artificial para sugerir automaticamente ajustes e melhorias com base no conteúdo da imagem. Além disso, estamos trabalhando para tornar nosso aplicativo mais acessível e inclusivo, com suporte para vários idiomas e recursos de acessibilidade.

Esperamos que você aproveite a experiência do DyMosaic e estamos ansiosos para ouvir seus comentários e sugestões!
