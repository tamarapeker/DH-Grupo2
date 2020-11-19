module.exports = (sequelize, dataTypes) =>{
    let alias = 'carrito_producto';
    let cols = {
        id : {
            type: dataTypes.INTEGER,
            primaryKey : true,
            autoIncremental: true
        },
        carrito_id: dataTypes.INTEGER,
        producto_id: dataTypes.INTEGER,
        precio_congelado: dataTypes.FLOAT
    }
    let config = {
        tableName : 'carrito_producto',
        timestamps : false
    }

    const Carrito_Producto = sequelize.define(alias,cols,config);

   Carrito_Producto.associate = function(models){
        Carrito_Producto.belongsTo(models.Productos, {
            as: "productos",
            foreignKey: "producto_id"
        });
    }


    return Carrito_Producto;
}