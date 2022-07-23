import React from 'react'
import { Marker } from '@react-google-maps/api'

const GoogleMapMarker = ({ position, index, clusterer }) => (
  <Marker key={index} position={position} clusterer={clusterer} />
)

export default GoogleMapMarker
