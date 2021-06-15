import React, { useState, useEffect } from 'react';
import ReactMapboxGl, { Layer, Popup, Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MapboxGl = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
});

export default function Map({details}) {
  const [center, setCenter] = useState([39.14022604367159, -6.794581990870498]);

  useEffect(() => {
    if(details && details.center)
      setCenter(details.center);
  }, [details])

  return (
    <MapboxGl
      // style="mapbox://styles/mapbox/streets-v11"
      // style="mapbox://styles/mapbox/satellite-streets-v11"
      // style="mapbox://styles/jestrux/ckfjath4f0ibq19o3kta26x0d"
      style="mapbox://styles/jestrux/ckfj9j6bx1iqc19meeipe67f5"
      containerStyle={{
        height: '100%', width: '100%'
      }}
      center={center}
      zoom={[14]}
    >
      <Marker coordinates={center}>
        <img className="w-10" src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png" alt="" />
      </Marker>

      <Popup
        coordinates={center}
        offset={{
          'bottom': [0, -38],
        }}
        style={{width: "300px"}}
        >
        <div className="py-0.5 px-2 text-black">
          <h1 className="fancy-font text-gray-600 text-3xl font-bold tracking-widest text-center">
            { details ? details.name : "" }
          </h1>
        </div>
      </Popup>
    </MapboxGl>
  );
}