import React from 'react'

export default class SearchBar extends React.Component{
	constructor(props, context){
		super(props, context)

		this.state = {
			text: ''
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleClick = this.handleClick.bind(this)
	}

	handleChange(event){
	
	}

	handleClick(event){

	}

	doSearch(keyword){

	}

	render(){
		return(
			<div id="search">
				
			</div>
		)
	}
}