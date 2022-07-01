import { Box } from "@chakra-ui/react";
import { Map, View } from "ol";
import Layer from "ol/layer/Layer";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import React from "react";
import { useEffect } from "react";
import * as OlControl from "ol/control";

const WorldMapIndex = (): JSX.Element => {
  useEffect(() => {
    const bgLayer = new TileLayer({ source: new OSM() });
    const map = new Map({
      target: "world-map",
      layers: [bgLayer],
      view: new View({
        projection: "EPSG:4326",
        center: [0, 0],
        zoom: 3,
      }),

      controls: OlControl.defaults({ zoom: false }),
    });
  }, []);

  return <Box w="100%" h="100vh" id="world-map"></Box>;
};

export default WorldMapIndex;
