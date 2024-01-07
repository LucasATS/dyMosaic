import * as ImagePicker from 'expo-image-picker';


export default async () => {
    let photo = '';
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        // base64: true,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
    });
    if (!result.canceled) {
        photo = result.assets[0].uri;
        // photo = ('data:image;base64,' + result.assets[0].base64);
        // console.log(result.assets);
    }
    return photo;
}