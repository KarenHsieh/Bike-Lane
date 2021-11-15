import React, { useState, useEffect, useRef } from "react";

import "./App.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const position = [25.14017, 121.79959];

/*

121.804461263431 25.1452651601528,
121.804624920065 25.14558294672,
121.804877252568 25.1458278767349,
121.805147979101 25.1462353300645,
121.805183305714 25.146558616117))"
*/

const latlngs = [
  [25.1421325173852, 121.802056935341],
  [25.1422525621511, 121.802154526427],
  [25.1425165264836, 121.802493612695],
  [25.1430886541818, 121.802976550059],
  [25.1434884881812, 121.803054838637],
  [25.1438257817298, 121.80311257542],
  [25.1439930465128, 121.803145744199],
  [25.1441024902429, 121.803165413379],
  [25.144263805563, 121.8032269283],
  [25.1443534922954, 121.803327338599],
  [25.1446058739486, 121.803749122201],
  [25.1448679706783, 121.804068985326],
  [25.145145912456, 121.80441502791],
];

function App() {
  useEffect(() => {
    const mymap = L.map("mapid").setView(position, 17);

    const OSMUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

    L.tileLayer(OSMUrl).addTo(mymap);

    // 使用 leaflet-color-markers ( https://github.com/pointhi/leaflet-color-markers ) 當作 marker
    const greenIcon = new L.Icon({
      iconUrl:
        "https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    const marker = L.marker(position, { icon: greenIcon }).addTo(mymap);

    marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

    L.circle(position, {
      color: "red",
      fillColor: "#f03",
      fillOpacity: 0.5,
      radius: 10,
    }).addTo(mymap);

    var polyline = L.polyline(latlngs, { color: "red" }).addTo(mymap);

    // zoom the map to the polyline
    mymap.fitBounds(polyline.getBounds());
  }, []);

  // 設定 height 顯示地圖 ( 預設值 height : 0 )
  return <div id="mapid" style={{ height: "100vh", width: "100vw" }} />;
}

export default App;
