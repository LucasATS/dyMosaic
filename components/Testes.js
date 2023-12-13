import { View, Image, Button, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import Constants from 'expo-constants';


async function imageToBase64(uri) {
  // Converter URI para base64
}


export const MyTestes = () => {
  const [imagem, setImagem] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Desculpe, precisamos de permissão para acessar sua galeria!');
      }
    })();
  }, []);

  const escolherImagem = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImagem(result);
    }
  };

  const aplicarFiltro = () => { 
    console.log(imageToBase64(imagem.assets[0].uri));
  };

  const compartilhar = async () => {
    const url = 'https://www.example.com'; // Substitua pela URL que você deseja compartilhar
    if (!(await Sharing.isAvailableAsync())) {
      alert(`Uh oh, sharing isn't available on your platform`);
      return;
    }
    await Sharing.shareAsync(url);
  };

  return (
    <View style={{ top: Constants.statusBarHeight }}>
      <Button title="Escolher Imagem" onPress={escolherImagem} />
      {imagem && (
        <Image source={{ uri: imagem.assets[0].uri }} style={{ width: 200, height: 200 }} />
      )}
      <Button
        title="Aplicar Filtro"
        onPress={aplicarFiltro}
        style={{ marginTop: 10 }}
      />
      <Button
        title="Compartilhar"
        onPress={compartilhar}
        style={{ marginTop: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 500,
  },
});
