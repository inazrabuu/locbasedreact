import React from 'react'

const initialState = {
	name: '',
	email: "",
	address: "",
	phone: "",
	blood: 'a',
	lat: "",
	lon: ""
}

export default class DonorForm extends React.Component{
	constructor(props, context){
		super(props, context)
		this.state = initialState

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.hideForm = this.hideForm.bind(this)
	}

	handleSubmit(event){
		this.validate()
		socket.emit('do save donor', this.state)
		this.clearState()
		event.preventDefault()
	}

	validate(){

	}

	handleChange(event){
		let change = {}
		change[event.target.name] = event.target.value
		this.setState(change)
	}

	clearState(){
		this.setState(initialState)
	}

	hideForm(event){
		document.getElementById('donor_form').style.display = 'none'

		event.preventDefault()
	}

	render(){
		return(
			<div id="donor_form" className="panel panel-default">
				<div className="panel-heading">
					<h3>Add Your Detail To Become A Donor</h3>
				</div>
				<div className="panel-body">
					<form onSubmit={this.handleSubmit}  style={{padding: '0px 30px'}}>
						<div className="form-group row">
							<label className="col-2 col-form-label">
								Name: 
							</label>
							<div className="col-10">
								<input className="form-control" type="text" name="name" value={this.state.name} onChange={this.handleChange} />
							</div>
						</div>
						<div className="form-group row">
							<label className="col-2 col-form-label">
								E-mail: 
							</label>
							<div className="col-10">
								<input className="form-control" type="text" name="email" value={this.state.email} onChange={this.handleChange} />
							</div>
						</div>
						<div className="form-group row">
							<label className="col-2 col-form-label">
								Address:
							</label>
							<div className="col-10">
								<textarea className="form-control" name="address" value={this.state.address} onChange={this.handleChange} />
							</div>
						</div>
						<div className="form-group row">
							<label className="col-2 col-form-label">
								Phone:
							</label>
							<div className="col-10">
								<input className="form-control" type="text" name="phone" value={this.state.phone} onChange={this.handleChange} />
							</div>
						</div>
						<div className="form-group row">
							<label className="col-2 col-form-label">
								Blood Type: 
							</label>
							<div className="col-10">
								<select className="form-control" name="blood" value={this.state.blood} onChange={this.handleChange}>
									<option value="a">A</option>
									<option value="b">B</option>
									<option value="ab">AB</option>
									<option value="o">O</option>
								</select>
							</div>
						</div>
						<div className="form-group row">
							<input type="submit" value="Submit" className="btn btn-primary" />&nbsp;&nbsp;
							<button onClick={this.hideForm} className="btn btn-default">Cancel</button>
						</div>
					</form>
				</div>
			</div>
		)
	}

	componentDidMount(){
		socket.on('donor is saved', (msg) => {
			console.log(msg)
		})

		socket.on('donor is deleted', (msg) => {
			console.log('donor ' + msg + ' is deleted.')
		})
	}
}