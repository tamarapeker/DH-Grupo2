import React from 'react';
import CardsPageContent from './CardsPageContent'
import LastProductPageContent from './LastProductPageContent'
import CategoryPageContent from './CategoryPageContent';

class PageContent extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            cantidadProductos: "",
            cantidadUsuarios: "",
            listadoCategorias: [],
            listadoCompras: []
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
        this.apiCall("http://localhost:3000/api/productos/cantidadTotal", this.productosCantidadTotal)
        this.apiCall("http://localhost:3000/api/usuarios/cantidadTotal", this.usuariosCantidadTotal)
        this.apiCall("http://localhost:3000/api/productos/categorias/listado", this.categoriasListado)
        this.apiCall("http://localhost:3000/api/carritos/compras", this.carritosCompras)
    }
    productosCantidadTotal = (data) => 
        {this.setState({
            cantidadProductos: data.data.cantidadProductos
        })} 
    
    usuariosCantidadTotal = (data) => 
        {this.setState({
            cantidadUsuarios: data.data.cantidadUsuarios
        })} 

    categoriasListado = (data) => 
        {this.setState({
            listadoCategorias: data.data
        })}

    carritosCompras = (data) => 
        {this.setState({
            listadoCompras: data.data
        })} 
        
    render(){
        console.log('estoy renderizando')
        const cards = [{title: 'Cantidad de productos', icon: 'fa-clipboard-list', font: 'text-primary', border: 'border-left-primary'}, {title: 'Monto vendido',icon: 'fa-dollar-sign', font: 'text-success', border: 'border-left-success'}, {title: 'Cantidad de ususarios', icon: 'fa-user-check', font: 'text-warning', border: 'border-left-warning'}]
        let contenido = []
        let categorias = []
        if(this.state.cantidadProductos === ""){
            contenido = ["Cargando..."]
        } else {
            let total = 0
            for(let i=0 ; i < this.state.listadoCompras.length ; i++){
                for(let j=0 ; j < this.state.listadoCompras[i].producto_carrito.length ; j++){
                    total = total + (this.state.listadoCompras[i].producto_carrito[j].precio_congelado)*(this.state.listadoCompras[i].producto_carrito[j].cantidad)
                }
            }
            
            contenido = [this.state.cantidadProductos, "$"+total, this.state.cantidadUsuarios]
            for(let i=0 ; i < this.state.listadoCategorias.length ; i++){
                categorias.push(this.state.listadoCategorias[i].nombre)
            }
            

        }
        return (
            <div className="container-fluid">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">App Dashboard</h1>
                </div>
                <div className="row">
                    {cards.map(card => <CardsPageContent
                        title ={card.title} 
                        number = {contenido[cards.indexOf(card)]}
                        icon = {card.icon}
                        font = {card.font}
                        border = {card.border}
                    />)}
                </div>
                <div className="row">
                    <LastProductPageContent/>
                    <div className="col-lg-6 mb-4">						
					    <div className="card shadow mb-4">
						    <div className="card-header py-3">
							    <h6 className="m-0 font-weight-bold text-primary">Categorías en la base de datos</h6>
						    </div>
                            <div className="card-body">
							    <div className="row">
                                    {categorias.map(categoria => <CategoryPageContent categoria = {categoria} />)}              
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PageContent