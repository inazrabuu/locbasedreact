import React from 'react'

const initialState = {
	_id: "",
	name: "",
	email: "",
	address: "",
	ip: "",
	phone: "",
	blood: 'a',
	lat: "",
	lon: ""
}

export default class DonorPreview extends React.Component{
	constructor(props, context){
		super(props, context)

		this.state = initialState

		this.handleClick = this.handleClick.bind(this)
		this.closeModal = this.closeModal.bind(this)
		this.showModal = this.showModal.bind(this)
	}

	handleClick(event){
		socket.emit("do delete donor", this.state._id)
		event.preventDefault()
	}

	closeModal(event){
		document.getElementById('donor_preview').style.display = 'none'
	}

	clearState(){
		this.setState(initialState)
	}

	showModal(){
		let preview = document.getElementById("donor_preview")
		preview.style.display = "block"
		let left = (screen.width - preview.offsetWidth) / 2
		preview.style.left = left + 'px'
	}

	render(){
		return(
			<div id="donor_preview" style={{display: 'none'}} className="panel panel-default"> 
				<div className="panel-body">
					<div>Name: {this.state.name}</div>
					<div>E-mail: {this.state.email}</div>
					<div>Address: {this.state.address}</div>
					<div>Phone: {this.state.phone}</div>
					<div>Blood Type: {this.state.blood}</div>
					<button className="btn btn-default" onClick={this.closeModal} className="delete-donor">Close</button>&nbsp;&nbsp;
					<button className="btn btn-default" onClick={this.handleClick} className="delete-donor">Delete</button>
				</div>
			</div>
		)
	}

	componentDidMount(){
		socket.emit("get donor data", this.props.params.id)
		socket.on("donor data result", (data) => {
			if (data != null){
				if (data.name && data.name == "CastError"){
					console.log(data)
				}
				else{
					this.setState(data)
					this.showModal()
				}
			}
		})

		socket.on('donor is deleted', (msg) => {
			console.log('donor ' + msg + ' is deleted.')
			this.closeModal()
			this.clearState()
		})
	}
}