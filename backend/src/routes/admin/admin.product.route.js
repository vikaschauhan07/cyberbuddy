const express = require('express');
const cedarAuthorize = require('../../middlewares/admin/adminCedar.middleware');
const upload = require('../../middlewares/multer.middleware');
const AdminProductController = require('../../controllers/admin/admin.product.controller');

const router = express.Router();

router.post(
  '/product/upload',
  upload.single('image'),
  AdminProductController.uploadProductImage
);

router.post(
  '/product/add',
  AdminProductController.createProduct
);

router.get(
  '/product/all',
  AdminProductController.getProducts
);

router.get(
  '/product/grouped',
  AdminProductController.getProductsGrouped
);

router.get(
  '/product/view',
  AdminProductController.getProductById
);

router.post(
  '/product/update',
  AdminProductController.updateProduct
);

router.get(
  '/product/delete',
  AdminProductController.deleteProduct
);

module.exports = router;
