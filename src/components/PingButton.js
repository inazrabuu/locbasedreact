import React from 'react'

export default class PingButton extends React.Component{
	constructor(props, context) {
		super(props, context)

		this.state = {}
		this.sendPing = this.sendPing.bind(this)
  }

	sendPing(e){
		socket.emit('do ping', 'here')
	}

	render(){
		return(
			<button id="ping" className="btn btn-default" onClick={this.sendPing}>Ping</button>
		)
	}

	componentDidMount(){
		socket.on('do pong', (data) => {
			console.log(data)
		})
	}
}