export default async () => {
    try {
        // const randomNumW = Math.floor(Math.random() * 101) + 250;
        const randomNumH = Math.floor(Math.random() * 101) + 250;
        const link = await fetch(`https://picsum.photos/${randomNumH}/${randomNumH}`, 'GET');
        // setPhoto(link.url);
        return link.url;
    } catch (e) {
        console.log(e);
    }
}