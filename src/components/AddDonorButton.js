import React from 'react'

export default class AddDonorButton extends React.Component{
	constructor(props, context){
		super(props, context)

		this.handleClick = this.handleClick.bind(this)
	}

	handleClick(event){
		let form = document.getElementById('donor_form')
		form.style.display = 'block'
		const left = ((screen.width - form.offsetWidth) / 2)
		form.style.left = left + 'px'
	}

	render(){
		return(
			<button id="add_donor_button" onClick={this.handleClick} className="btn btn-primary">Become a Donor</button>
		)
	}
}