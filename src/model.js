import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost/blood', (err) => {
	if (err) console.log(err)
})

const Schema = mongoose.Schema

var donor = new Schema({
	name: String,
	email: String,
	address: String,
	phone: String,
	blood: String,
	lat: String,
	lon: String,
	ip: String
})

const Donor = mongoose.model('Donor', donor)

export default Donor