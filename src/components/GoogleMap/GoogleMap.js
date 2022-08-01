import React, { useEffect, useState } from 'react'
import { GoogleMap } from '@react-google-maps/api'
import GoogleMapMarker from '../GoogleMapMarker/GoogleMapMarker.js'
import { LoadScript } from '@react-google-maps/api'
import { cities } from '../../common/cities.js'
import { mapStyles } from './map-style-config.js'

const Map = (props) => {
  const { city } = props
  const [cityLatLng, setCityLatLng] = useState({ lat: 0, lng: 0 })
  useEffect(() => {
    if (city) {
      const cityData = cities.find((x) => x.city === city)
      setCityLatLng({ lat: +cityData.lat, lng: +cityData.lng })
    }
  }, [city])

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}>
      <GoogleMap
        mapContainerStyle={{
          height: '150px',
          width: '100%',
        }}
        zoom={15}
        center={cityLatLng}
        options={{
          styles: mapStyles,
          disableDefaultUI: true,
          keyboardShortcuts: false,
          fullscreenControl: true,
        }}
      >
        <GoogleMapMarker position={cityLatLng} />
      </GoogleMap>
    </LoadScript>
  )
}

export default Map
