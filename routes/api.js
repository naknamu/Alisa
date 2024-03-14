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
    imagelove_update_post,
    imagelove_delete_post
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
    uploader_login,
    uploader_list,
    uploader_detail,
    uploader_create_get,
    uploader_create_post,
    uploader_delete_get,
    uploader_delete_post,
    uploader_update_get,
    uploader_update_post,
} = require("../controllers/uploaderController");

// Require auth middleware
const auth = require("../middleware/requireAuth");

/***  HOME ROUTE ***/

// GET HOMEPAGE
router.get("/", home);

/***IMAGE ROUTES ***/

// GET request for creating an image. NOTE This must come before routes that display image (uses id).
router.get("/image/create", image_create_get);

// POST request for creating image
router.post("/image/create", image_create_post);

// GET request for deleting image
router.get("/image/:imageid/delete", image_delete_get);

// POST request for deleting image
router.post("/image/:imageid/delete", auth, image_delete_post);

// GET request for updating image
router.get("/image/:imageid/update", image_update_get);

// POST request for updating image
router.post("/image/:imageid/update", auth, image_update_post);

// POST request for updating love count
router.post("/image/:imageid/love/update", auth, imagelove_update_post);

// POST request for deleting love count
router.post("/image/:imageid/love/delete", auth, imagelove_delete_post);

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
router.get("/category/:categoryid/delete", category_delete_get);

// POST request for deleting category
router.post("/category/:categoryid/delete", auth, category_delete_post);

// GET request for updating category
router.get("/category/:categoryid/update", category_update_get);

// POST request for updating category
router.post("/category/:categoryid/update", auth, category_update_post);

// GET request for list of categories
router.get("/categories", category_list);

// GET request for a single category
router.get("/categories/:categoryname", category_detail);


/***UPLOADER ROUTES ***/

// GET request for login uploader
router.post("/uploader/login", uploader_login);

// GET request for creating uploader
router.get("/uploader/create", uploader_create_get);

// POST request for creating uploader
router.post("/uploader/create", uploader_create_post);

// GET request for deleting uploader
router.get("/uploader/:uploaderid/delete", uploader_delete_get);

// POST request for deleting uploader
router.post("/uploader/:uploaderid/delete", auth, uploader_delete_post);

// GET request for updating uploader
router.get("/uploader/:uploaderid/update", uploader_update_get);

// POST request for updating uploader
router.post("/uploader/:uploaderid/update", auth, uploader_update_post);

// GET request for list of uploaders
router.get("/uploaders", uploader_list);

// GET request for a single uploader
router.get("/uploaders/:uploadername", uploader_detail);


module.exports = router;