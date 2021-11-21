import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import L from 'leaflet'

const MapContainer = ({ mapType = 'bike', myPosition = [], markers = [], roadMap = [] }) => {
  const [mapObject, setMapObject] = useState(undefined)

  useEffect(() => {
    if (!mapObject) {
      setMapObject(L.map('mapid').setView(myPosition, 12))
    }
  }, [myPosition])

  useEffect(() => {
    if (mapObject) {
      const zoom = roadMap && roadMap.length ? 16 : 12

      console.log('mapObject', mapObject)
      console.log('myPosition', myPosition)
      let mymap = mapObject.setView(myPosition, zoom)

      const OSMUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

      L.tileLayer(OSMUrl).addTo(mymap)

      // 使用 leaflet-color-markers ( https://github.com/pointhi/leaflet-color-markers ) 當作 marker
      const pinIcon = new L.Icon({
        // iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        iconUrl: '/pin.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [42, 66], // [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      })

      const marker = L.marker(myPosition, { icon: pinIcon }).addTo(mymap)

      if (markers && markers.length) {
        // L.marker([25.1421325173852, 121.802056935341], { icon: greenIcon }).addTo(
        //   mymap
        // );
        // L.marker([25.1430886541818, 121.802976550059], { icon: greenIcon }).addTo(
        //   mymap
        // );
      }

      // L.circle(myPosition, {
      //   color: 'red',
      //   fillColor: '#f03',
      //   fillOpacity: 0.5,
      //   radius: 10,
      // }).addTo(mymap)

      if (roadMap && roadMap.length) {
        marker.bindPopup('<h4>起點</h4>').openPopup()

        var polyline = L.polyline(roadMap, { color: '#7B61FF', weight: 8 }).addTo(mymap)

        // zoom the map to the polyline
        mymap.fitBounds(polyline.getBounds())
      }
    }
  }, [myPosition, markers, roadMap, mapObject])

  // 設定 height 顯示地圖 ( 預設值 height : 0 )
  return <div id="mapid" style={{ height: '100%', width: '100%' }} />
}

MapContainer.propTypes = {
  myPosition: PropTypes.array, // [25.14017, 121.79959]
  markers: PropTypes.array, // [[25.1421325173852, 121.802056935341],[25.1422525621511, 121.802154526427]]
  polyline: PropTypes.array, // [[25.1421325173852, 121.802056935341],[25.1422525621511, 121.802154526427]]
}

export default MapContainer
