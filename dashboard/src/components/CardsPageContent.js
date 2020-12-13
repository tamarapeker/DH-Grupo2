import React from 'react';
import propTypes from 'prop-types'

function CardsPageContent (props){
    return (
        <div className="col-md-4 mb-4">
			<div className={`card ${props.border} shadow h-100 py-2`}>
				<div className="card-body">
					<div className="row no-gutters align-items-center">
						<div className="col mr-2">
							<div className={`text-xs font-weight-bold ${props.font} text-uppercase mb-1`}> {props.title}</div>
                            <div className="h5 mb-0 font-weight-bold text-gray-800">{props.number}</div>
						</div>
						<div className="col-auto">
							<i className={`fas ${props.icon} fa-2x text-gray-300`}></i>
						</div>
					</div>
				</div>
			</div>
		</div>
    )
}

CardsPageContent.propTypes = {
	border: propTypes.string.isRequired,
	font: propTypes.string.isRequired,
	title: propTypes.string.isRequired,
	number: propTypes.string.isRequired,
	icon: propTypes.string.isRequired
}

CardsPageContent.defaultProps = {
	border: 'border-left-primary',
	font: 'text-primary',
	title: 'Vacio',
	number: 'Vacio',
	icon: ''
}

export default CardsPageContent