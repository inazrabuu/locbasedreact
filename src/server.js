import path from 'path'
import { Server } from 'http'
import Express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import routes from './routes'
import NotFoundPage from './components/NotFoundPage'
import Socket from 'socket.io'
import socketEvent from './socketEvent'

const app = new Express()
const server = new Server(app)
const io = new Socket(server)

io.on('connection', (socket) => {
	console.log("a user is connected")

	socketEvent.doPing(io, socket)

	socketEvent.saveDonor(io, socket)

	socketEvent.getDonor(io, socket)

	socketEvent.deleteDonor(io, socket)

	socketEvent.disconnect(io, socket)
})

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(Express.static(path.join(__dirname, 'static')))

app.get('*', (req, res) => {
	match(
		{routes, location: req.url},
		(err, redirectLocation, renderProps) => {
			if (err){
				return res.status(500).send(err.message)
			}

			if (redirectLocation){
				return res.redirect(302, redirectLocation.pathname + redirectLocation.search)
			}

			let markup
			if (renderProps){
				markup = renderToString(<RouterContext {...renderProps}/>)
			}
			else{
				markup = renderToString(<NotFoundPage/>)
				res.status(404)
			}

			return res.render('index', { markup })
		}
	)
})

const port = process.env.PORT || 8080
const env  = process.env.NODE_ENV || 'production'
server.listen(port, err => {
	if (err){
		return console.error(err)
	}

	console.info(`Server running on http://localhost:${port} [${env}]`)
})