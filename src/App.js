import React, { useState, useEffect, useRef } from "react";

import { Box, Grid, TextField, Button } from "@material-ui/core";

import { makeStyles } from "@material-ui/styles";

import MapContainer from "./component/MapContainer";
import NavBar from "./component/NavBar";

import "./App.css";

const useStyles = makeStyles({
  searchBar: {
    padding: "30px",
  },
});

function App() {
  const classes = useStyles();

  const myPosition = [25.14017, 121.79959];

  const roadMap = [
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

  const markers = [25.1422525621511, 121.802154526427];

  return (
    <Box sx={{ bgcolor: "#e5e5e5" }}>
      <NavBar />
      <Grid container spacing={2}>
        <Grid>
          <div className={classes.searchBar}>
            <TextField
              id="standard-basic"
              label="Standard"
              variant="standard"
            />
          </div>
        </Grid>
        <Grid>
          <div>
            <Button variant="outlined">我附近的租借站</Button>
          </div>
          <div>
            <div>更多篩選</div>
          </div>
        </Grid>
      </Grid>

      <div id="map">
        <MapContainer
          myPosition={myPosition}
          markers={markers}
          roadMap={roadMap}
        />
      </div>
      <div id="list"></div>
    </Box>
  );
}

export default App;
