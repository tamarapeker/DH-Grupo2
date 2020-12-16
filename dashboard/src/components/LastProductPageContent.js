import React from 'react';


class LastProductPageContent extends React.Component {
	constructor(props){
        super(props)
        this.state = {
            ultimoProducto: []
        }
	}
	
	apiCall(url, consecuencia){
        fetch(url)
            .then(response => response.json())
            .then(data => consecuencia(data))
            .catch(error => console.log(error))     
	}
	
	componentDidMount(){
        console.log("Pagina montada")
        this.apiCall("http://localhost:3000/api/productos/ultimoProducto", this.ultimoProducto)
	}
	
	ultimoProducto = (data) => 
        {this.setState({
            ultimoProducto: data.data
		})}
	
	render(){
		let contenido = []
		let imagen = ""
		if(this.state.cantidadProductos === ""){
			contenido = ["Cargando..."]
		} else {
			contenido = this.state.ultimoProducto
			console.log("ahoraa")
			if( typeof contenido.imagenes != "undefined"){
				imagen = contenido.imagenes[0].ruta
			}

			
		}

		return (
			<div className="col-lg-6 mb-4">
				<div className="card shadow mb-4">
					<div className="card-header py-3">
						<h6 className="m-0 font-weight-bold text-primary">Ultimo producto agregado</h6>
					</div>
					<div className="card-body">
						<div className="text-center">
						<p className="m-0 font-weight-bold text-dark">{contenido.nombre} - {contenido.color}</p>	
							<img className="img-fluid px-3 px-sm-4 mt-3 mb-4"  src={`http://localhost:3000/images/products/${imagen}`} alt="dummy"/>
						</div>
						<p>{contenido.descripcion}</p>
						<a target="_blank" rel="nofollow" href={`http://localhost:3000/products/detail/${contenido.id}`}>Ver detalle de producto</a>
					</div>
				</div>
			</div>
		)
	}

	
		

}

export default LastProductPageContent