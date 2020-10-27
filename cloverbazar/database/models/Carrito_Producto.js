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

   /* Movie.associate = function(models){
        Movie.belongsTo(models.Genres, {
            as: "generos",
            foreignKey: "genre_id"
        });

        Movie.belongsToMany(models.Actors, {
            as: "actores",
            through: "actor_movie",
            foreignKey: "movie_id",
            otherKey: "actor_id",
            timestamps: false
        })
    }*/


    return Carrito_Producto;
}