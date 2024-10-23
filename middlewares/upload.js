import multer from "multer";
import { multerSaveFilesOrg } from "multer-savefilesorg";

// export const localUpload = multer({ dest: 'uploads/' });

export const advertIconUpload = multer({
    storage: multerSaveFilesOrg({
        apiAccessToken:
        process.env.SAVEFILESORG_API_KEY,
        relativePath: '/advert-app/*'
    }),
    preservePath: true
});

// export const userAvartarUpload = multer({
//     storage: multerSaveFilesOrg({
//         apiAccessToken:
//         process.env.SAVEFILESORG_API_KEY,
//         relativePath: '/ads-api/users/*'
//     }),
//     preservePath: true
// });