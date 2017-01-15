import React from 'react'
import SearchBar from './searchBar'

export default class MapGIS extends React.Component{
	constructor(props, context) {
		super(props, context)
  }

  render() {
    return (
			<div>
				<SearchBar />
				<div id="viewDiv" className="gismap"></div>
			</div>
    );
  }
}