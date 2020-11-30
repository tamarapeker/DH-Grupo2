// requerimos moment para poder calcular las ultimas compras en dias
const moment = require("moment")
// requerimos la base de datos para calcular las estadisticas
const db = require('../../database/models');
const apiController = {
    cantidadUsuarios: function (req, res, next) {
        db.Usuarios.count()
            .then(
                function (cantidad) {
                    let respuesta = {
                        meta: {
                            status: 200,
                            url: "/api/usuarios/cantidadTotal"
                        },
                        data: { cantidadUsuarios: cantidad }
                    }
                    res.json(respuesta)
                }
            )
    },
    cantidadProductos: function (req, res, next) {
        db.Productos.count()
            .then(
                function (cantidad) {
                    let respuesta = {
                        meta: {
                            status: 200,
                            url: "/api/productos/cantidadTotal"
                        },
                        data: { cantidadProductos: cantidad }
                    }
                    res.json(respuesta)
                }
            )
    },
    cantidadCategorias: function (req, res, next) {
        db.Categorias.count()
            .then(
                function (cantidad) {
                    let respuesta = {
                        meta: {
                            status: 200,
                            url: "/api/categorias/cantidadTotal"
                        },
                        data: { cantidadCategorias: cantidad }
                    }
                    res.json(respuesta)
                }
            )
    },
    cantidadCarritos: function (req, res, next) {
        db.Carritos.count({
            where: {estado: 0}
        })
            .then(
                function (cantidad) {
                    let respuesta = {
                        meta: {
                            status: 200,
                            url: "/api/carritos/cantidadTotal"
                        },
                        data: { cantidadCarritos: cantidad }
                    }
                    res.json(respuesta)
                }
            )
    },
    ultimasCompras: function (req, res, next) {
        db.Carritos.findAll({
            where: {
                fecha_compra: {
                  [db.Sequelize.Op.gte]: moment().subtract(7, 'days').toDate()
                }
              },
              include: [{ association: "productos" }]
            }) 
            .then(
                function (compras) {
                    let respuesta = {
                        meta: {
                            status: 200,
                            url: "/api/carritos/ultimasCompras"
                        },
                        data: compras
                    }
                    res.json(respuesta)
                }
            )
    },
    


}
module.exports = apiController