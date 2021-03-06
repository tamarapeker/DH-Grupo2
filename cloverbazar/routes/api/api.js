var express = require('express');
var router = express.Router();

const apiController = require('../../controllers/api/apiController');

// cantidad total de usuarios
router.get('/usuarios/cantidadTotal', apiController.cantidadUsuarios);

// cantidad total de productos
router.get('/productos/cantidadTotal', apiController.cantidadProductos);

// cantidad total de categorias de productos
router.get('/productos/categorias/cantidadTotal', apiController.cantidadCategorias);

// listado de categorias de productos
router.get('/productos/categorias/listado', apiController.listadoCategorias);

// cantidad total de carritos cerrados
router.get('/carritos/cantidadTotal', apiController.cantidadCarritos);

// listado de ultimas compras
router.get('/carritos/ultimasCompras', apiController.ultimasCompras);

// listado de compras
router.get('/carritos/compras', apiController.compras);

//ultimo producto agregado
router.get('/productos/ultimoProducto', apiController.ultimoProducto)



module.exports = router;
