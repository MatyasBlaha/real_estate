import express from "express";
// import { uploads } from '../utils/multer.js'

const estateRoutes = express.Router();

estateRoutes.route('/')
    // .get(getEstatesPreview)
    // .post(uploads.array('images', 15), createEstate)


export default estateRoutes;