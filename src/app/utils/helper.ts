export function getBase64(file) {
    if (file) {
        const blobUrl = URL.createObjectURL(file);
        return blobUrl;
    }   
}