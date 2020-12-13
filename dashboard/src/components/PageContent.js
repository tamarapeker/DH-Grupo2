import React from 'react';
import CardsPageContent from './CardsPageContent'
import LastProductPageContent from './LastProductPageContent'
import CategoryPageContent from './CategoryPageContent';

class PageContent extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            cantidadProductos: ""
        }
    }

    apiCall(url, consecuencia){
        fetch(url, {
            mode: 'no-cors',
            headers: {'Access-Control-Allow-Origin': 'Origin'}
        })
            .then(response => response.json())
            .then(data => consecuencia(data))
            .catch(error => console.log(error))     
    }

    componentDidMount(){
        console.log("Pagina montada")
        this.apiCall("http://localhost:3000/api/productos/cantidadTotal", this.productosCantidadTotal)
    }
    productosCantidadTotal = (data) => 
        {this.setState({
            cantidadProductos: data.data.cantidadProductos
        })} 
    

        
    render(){
        console.log('estoy renderizando')
        const cards = [{title: 'Products in Data Base', icon: 'fa-clipboard-list', font: 'text-primary', border: 'border-left-primary'}, {title: 'Amount un products',icon: 'fa-dollar-sign', font: 'text-success', border: 'border-left-success'}, {title: 'Users quantity', icon: 'fa-user-check', font: 'text-warning', border: 'border-left-warning'}]
        let contenido;
        if(this.state.cantidadProductos === ""){
            contenido = "Cargando..."
        } else {
            contenido = this.state.cantidadProductos
        }
        return (
            <div className="container-fluid">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">App Dashboard</h1>
                </div>
                <div className="row">
                    {cards.map(card => <CardsPageContent
                        title ={card.title} 
                        number = {contenido}
                        icon = {card.icon}
                        font = {card.font}
                        border = {card.border}
                    />)}
            </div>
            </div>
        )
    }
}













/*function PageContent (){
    return (
        <div className="container-fluid">

			<div className="d-sm-flex align-items-center justify-content-between mb-4">
				<h1 className="h3 mb-0 text-gray-800">App Dashboard</h1>
			</div>

			<div className="row">
               {cards.map(card => <CardsPageContent
               title ={card.title} 
               number = {card.number}
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
							<h6 className="m-0 font-weight-bold text-primary">Categories in Data Base</h6>
						</div>
                        <div className="card-body">
							<div className="row">
                                {category.map(category => <CategoryPageContent category = {category} />)}              
                        
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}*/

export default PageContent