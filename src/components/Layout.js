import React from 'react'
import { Link } from 'react-router'
import MapGIS from './Map'
import PingButton from './PingButton'
import AddDonorButton from './AddDonorButton'
import DonorForm from './DonorForm'

export default class Layout extends React.Component {
	render() {
		return (
			<div className="app-container">
				<header>
					<h1>
						<Link to="/">
							Blood Donor App
						</Link>
					</h1>
				</header>
				<PingButton />
				<AddDonorButton />
				<DonorForm />
				<div className="app-content">{this.props.children}</div>
				<MapGIS />
				<footer>
					<p>
						<strong>React</strong> and <strong>Express</strong>.
					</p>
				</footer>
			</div>
		)
	}
}