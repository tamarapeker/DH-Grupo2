module.exports = (sequelize, dataTypes) =>{
    let alias = 'Carritos';
    let cols = {
        id : {
            type: dataTypes.INTEGER,
            primaryKey : true,
            autoIncremental: true
        },
        usuario_id: dataTypes.INTEGER,
        fecha_compra: dataTypes.DATE,
        fecha_creacion: dataTypes.DATE,
        estado: dataTypes.INTEGER
    }
    let config = {
        tableName : 'carritos',
        timestamps : false
    }

    const Carrito = sequelize.define(alias,cols,config);

    Carrito.associate = function(models){
        Carrito.belongsTo(models.Usuarios, {
            as: "usuarios",
            foreignKey: "usuario_id"
        });

    }


    return Carrito;
}