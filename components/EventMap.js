import { useState, useEffect } from 'react'
import Image from 'next/image'
import ReactMapGL, { Marker } from 'react-map-gl'

import 'mapbox-gl/dist/mapbox-gl.css'

export default function EventMap({ event }) {
  const [latitude, setLatitude] = useState(40.712772)
  const [longitude, setLongitude] = useState(-73.935242)
  const [loading, setLoading] = useState(true)
  const [viewport, setViewport] = useState({
    latitude: 40.712772,
    longitude: -73.935242,
    width: '100%',
    height: '500px',
    zoom: 12
  })

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
      onViewportChange={vp => setViewport(vp)}
    >
      <Marker key={event.id} latitude={latitude} longitude={longitude}>
        <Image src="/images/pin.svg" width={50} height={50} />
      </Marker>
    </ReactMapGL>
  )
}
