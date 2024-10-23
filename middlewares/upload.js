import multer from "multer";
import { multerSaveFilesOrg } from "multer-savefilesorg";

export const localUpload = multer({ dest: 'uploads/' });

export const adsUpload = multer({
    storage: multerSaveFilesOrg({
        apiAccessToken:
            process.env.SAVEFILESORG_API_KEY,
        relativePath: '/ads-api/ads/*'
    }),
    preservePath: true
});

export const userAvartarUpload = multer({
    storage: multerSaveFilesOrg({
        apiAccessToken:
            process.env.SAVEFILESORG_API_KEY,
        relativePath: '/ads-api/users/*'
    }),
    preservePath: true
});