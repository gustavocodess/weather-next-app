import React from 'react'
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const MapLayer = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoiZ3VzdGF2b2hncyIsImEiOiJja3pneXczNjMwYnF2MnVtcGltZmtjMmRoIn0.Yp1ZbL5E_hf1nzly-O1iDw',
})

interface MapProps {
  lat: number;
  lng: number;
}

export const Map: React.FC<MapProps> = ({ lat, lng }) => {
  return (
    <div style={{ width: '100%', minHeight: 200, height: '100%' }}>
      <MapLayer
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: '100%',
          width: '100%',
          boxShadow: '0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24)',
        }}
        center={[lng, lat]}
        zoom={[9]}
      >
        <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
          <Feature coordinates={[lng, lat]} />
        </Layer>
      </MapLayer>
    </div>
  )
}

export default Map
