// src/app/api/upload.js
import nextConnect from 'next-connect';
import multer from 'multer';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase';

const upload = multer({
    storage: multer.memoryStorage(),
});

const apiRoute = nextConnect({
    onError(error, req, res) {
        res.status(501).json({ error: `Sorry, something went wrong! ${error.message}` });
    },
    onNoMatch(req, res) {
        res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
    },
});

apiRoute.use(upload.array('files'));

apiRoute.post(async (req, res) => {
    try {
        const files = req.files;
        const urls = [];

        for (let file of files) {
            const storageRef = ref(storage, file.originalname);
            const snapshot = await uploadBytes(storageRef, file.buffer, {
                contentType: file.mimetype,
            });

            const url = await getDownloadURL(snapshot.ref);
            urls.push(url);
        }

        res.status(200).json({ urls });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default apiRoute;
