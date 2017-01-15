import Donor from './model'

exports.doPing = (io, socket) => {
	socket.on("do ping", (msg) => {
		io.emit("do pong", msg)
	})
}

exports.disconnect = (io, socket) => {
	console.log("a user is disconnected")
}

exports.saveDonor = (io, socket) => {
	socket.on('do save donor', (msg) => {
		let entry = new Donor(msg)
		entry['ip'] = socket.request.connection.remoteAddress
		entry.save((err, room) => {
			if (err){
				console.log(err)
			}
			else{
				let id = room.id
				console.log('saved id is: ' + id)
				socket.emit('donor is saved', id)
			}
		})
	})
}

exports.getDonor = (io, socket) => {
	socket.on('get donor data', (id) => {
		Donor.findById(id, (err, data) => {
			let ret =  (err) ? err : data
			io.emit('donor data result', ret)
		})
	})
}

exports.deleteDonor = (io, socket) => {
	socket.on('do delete donor', (msg) => {
		Donor.findByIdAndRemove(msg, (err) => {
			if (err){
				console.log(err)
			}
			else{
				io.emit('donor is deleted', msg)
			}
		})
	})
}