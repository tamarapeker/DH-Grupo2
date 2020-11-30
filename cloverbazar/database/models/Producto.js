module.exports = (sequelize, dataTypes) =>{
    let alias = 'Productos';
    let cols = {
        id : {
            type: dataTypes.INTEGER,
            primaryKey : true,
            autoIncremental: true
        },
        nombre: dataTypes.STRING,
        precio: dataTypes.FLOAT,
        descuento: dataTypes.FLOAT,
        stock: dataTypes.INTEGER,
        color: dataTypes.STRING,
        medidas: dataTypes.STRING,
        descripcion: dataTypes.STRING,
        categoria_id: dataTypes.INTEGER,
        estado: dataTypes.INTEGER
    }
    let config = {
        tableName : 'productos',
        timestamps : false
    }

    const Producto = sequelize.define(alias,cols,config);

     Producto.associate = function(models){
        Producto.belongsTo(models.Categorias, {
            as: "categorias",
            foreignKey: "categoria_id"
        });

        Producto.belongsToMany(models.Carritos, {
            as: "carritos",
            through: "carrito_producto",
            foreignKey: "producto_id",
            otherKey: "carrito_id",
            timestamps: false
        });

        Producto.hasMany(models.Imagenes, {
                as: "imagenes",
                foreignKey: "producto_id"
            });
        
        Producto.hasMany(models.carrito_producto, {
            as: "carrito_producto",
            foreignKey: "producto_id"
        });
        
    }

    Producto.calculoDescuento = function(){
        //let calculoDescuento = this.precio*(1-this.descuento/100)
        return "hola"
    }
    return Producto;
}