import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import L from 'leaflet'

import { objIsEmpty, objIsNotEmpty } from '../../utils/validate'

const MapContainer = ({ mapType = 'bike', myPosition = [], markers = [], roadMap = [] }) => {
  const [mapObject, setMapObject] = useState(undefined)
  const [tempPolyline, setTempPolyline] = useState(undefined)
  const [polylineLayerGroup, setPolylineLayerGroup] = useState(undefined)

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

  useEffect(() => {
    if (!mapObject) {
      console.log('setMapObject')
      // setMapObject(L.map('mapid').setView(myPosition, 12))
      const mapOptions = {
        center: myPosition,
        zoom: 12,
      }
      const map = new L.map('mapid', mapOptions)
      setMapObject(map)
    }
  }, [mapObject, myPosition])

  useEffect(() => {
    if (mapObject) {
      const zoom = roadMap && roadMap.length ? 16 : 12

      console.log('mapObject', mapObject)
      console.log('myPosition', myPosition)

      const myMap = mapObject.setView(myPosition, zoom)

      const OSMUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

      // Creating the Layer Object
      // L.tileLayer(OSMUrl).addTo(myMap)
      const layer = new L.tileLayer(OSMUrl)
      myMap.addLayer(layer)
    }
  }, [myPosition, mapObject])

  // useEffect(() => {
  //   var newMarker = new L.Marker(myPosition)
  //   // Creating layer group
  //   var layerGroup = L.layerGroup([newMarker])

  //   // Adding layer group to map
  //   layerGroup.addTo(mapObject)

  //   if (markers && markers.length) {
  //     // const marker = L.marker(myPosition, { icon: pinIcon }).addTo(mapObject)
  //     // L.marker([25.1421325173852, 121.802056935341], { icon: greenIcon }).addTo(
  //     //   myMap
  //     // );
  //     // L.marker([25.1430886541818, 121.802976550059], { icon: greenIcon }).addTo(
  //     //   myMap
  //     // );
  //   }
  //   // layerGroup.removeLayer(newMarker);
  // }, [markers])

  useEffect(() => {
    if (tempPolyline) {
      polylineLayerGroup.removeLayer(tempPolyline)
    }

    if (roadMap && roadMap.length) {
      // const marker = L.marker(myPosition, { icon: pinIcon }).addTo(mapObject)
      const marker = L.marker(myPosition, { icon: pinIcon })
      marker.bindPopup('<h4>起點</h4>').openPopup()

      // var activePolyline = L.featureGroup().addTo(mapObject)
      // var polyline = L.polyline(roadMap, { color: '#7B61FF', weight: 8 }).addTo(activePolyline)
      // activePolyline.clearLayers()
      // var polyline = L.polyline(roadMap, { color: '#7B61FF', weight: 8 }).addTo(myMap)
      var polyline = L.polyline(roadMap, { color: '#7B61FF', weight: 8 })

      // zoom the map to the polyline
      mapObject.fitBounds(polyline.getBounds())

      var newLayerGroup = new L.layerGroup([marker, polyline])
      newLayerGroup.addTo(mapObject)

      setTempPolyline(polyline)
      setPolylineLayerGroup(newLayerGroup)
    }
  }, [roadMap])

  // 設定 height 顯示地圖 ( 預設值 height : 0 )
  return <div id="mapid" style={{ height: '100%', width: '100%' }} />
}

MapContainer.propTypes = {
  myPosition: PropTypes.array, // [25.14017, 121.79959]
  markers: PropTypes.array, // [[25.1421325173852, 121.802056935341],[25.1422525621511, 121.802154526427]]
  polyline: PropTypes.array, // [[25.1421325173852, 121.802056935341],[25.1422525621511, 121.802154526427]]
}

export default MapContainer
