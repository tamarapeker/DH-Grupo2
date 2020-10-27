module.exports = (sequelize, dataTypes) =>{
    let alias = 'Imagenes';
    let cols = {
        id : {
            type: dataTypes.INTEGER,
            primaryKey : true,
            autoIncremental: true
        },
        ruta: dataTypes.STRING,
        producto_id: dataTypes.INTEGER
    }
    let config = {
        tableName : 'imagenes',
        timestamps : false
    }

    const Imagen = sequelize.define(alias,cols,config);

    Imagen.associate = function(models){
        Imagen.belongsTo(models.Productos, {
            as: "productos",
            foreignKey: "producto_id"
        });
    }

    return Imagen;
}