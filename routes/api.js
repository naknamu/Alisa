const express = require("express");
const router = express.Router();

const {
    home
} = require("../controllers/homeController");

const {
    image_list,
    image_detail,
    image_create_get,
    image_create_post,
    image_delete_get,
    image_delete_post,
    image_update_get,
    image_update_post,
} = require("../controllers/imageController");

const {
    category_list,
    category_detail,
    category_create_get,
    category_create_post,
    category_delete_get,
    category_delete_post,
    category_update_get,
    category_update_post,
} = require("../controllers/categoryController");

const {
    uploader_list,
    uploader_detail,
    uploader_create_get,
    uploader_create_post,
    uploader_delete_get,
    uploader_delete_post,
    uploader_update_get,
    uploader_update_post,
} = require("../controllers/uploaderController");


// GET HOMEPAGE
router.get("/", home);

/***IMAGE ROUTES ***/

// GET request for creating an image. NOTE This must come before routes that display image (uses id).
router.get("/image/create", image_create_get);

// POST request for creating image
router.post("/image/create", image_create_post);

// GET request for deleting image
router.get("/image/:imagecaption/delete", image_delete_get);

// POST request for deleting image
router.post("/image/:imagecaption/delete", image_delete_post);

// GET request for updating image
router.get("/image/:imagecaption/update", image_update_get);

// POST request for updating image
router.post("/image/:imagecaption/update", image_update_post);

// GET request for list of all images
router.get("/images", image_list);

// GET request for detail of a image
router.get("/images/:imagecaption", image_detail);


/***CATEGORY ROUTES ***/

// GET request for creating category
router.get("/category/create", category_create_get);

// POST request for creating category
router.post("/category/create", category_create_post);

// GET request for deleting category
router.get("/category/:categoryname/delete", category_delete_get);

// POST request for deleting category
router.post("/category/:categoryname/delete", category_delete_post);

// GET request for updating category
router.get("/category/:categoryname/update", category_update_get);

// POST request for updating category
router.post("/category/:categoryname/update", category_update_post);

// GET request for list of categories
router.get("/categories", category_list);

// GET request for a single category
router.get("/categories/:categoryname", category_detail);


/***UPLOADER ROUTES ***/

// GET request for creating uploader
router.get("/uploader/create", uploader_create_get);

// POST request for creating uploader
router.post("/uploader/create", uploader_create_post);

// GET request for deleting uploader
router.get("/uploader/:uploadername/delete", uploader_delete_get);

// POST request for deleting uploader
router.post("/uploader/:uploadername/delete", uploader_delete_post);

// GET request for updating uploader
router.get("/uploader/:uploadername/update", uploader_update_get);

// POST request for updating uploader
router.post("/uploader/:uploadername/update", uploader_update_post);

// GET request for list of uploaders
router.get("/uploaders", uploader_list);

// GET request for a single uploader
router.get("/uploaders/:uploadername", uploader_detail);


module.exports = router;