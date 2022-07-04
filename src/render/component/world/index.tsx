import { Box } from "@chakra-ui/react";
import { Map, View, Feature } from "ol";
import Layer from "ol/layer/Layer";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import React, { useState } from "react";
import { useEffect } from "react";
import * as OlControl from "ol/control";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON, MVT } from "ol/format";
import { Fill, Stroke, Style } from "ol/style";
import { Geometry } from "ol/geom";

export const WorldMapEntry = (): JSX.Element => {
  const [mapObject, setMapObject] = useState<Map | undefined>(undefined);

  useEffect(() => {
    const bgLayer = new TileLayer({ source: new OSM() });
    const svgBorderStyle = new Style({
      stroke: new Stroke({
        width: 1,
        color: "#ffffff",
      }),
      fill: new Fill({
        color: "#dbdbdb",
      }),
    });

    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        format: new GeoJSON(),
        url: "https://openlayersbook.github.io/openlayers_book_samples/assets/data/countries.geojson",
      }),
      background: "white",
      style: function () {
        return svgBorderStyle;
      },
    });
    const map = new Map({
      target: "world-map",
      layers: [vectorLayer],
      view: new View({
        projection: "EPSG:4326",
        center: [0, 0],
        zoom: 3,
        minZoom: 3,
      }),

      controls: OlControl.defaults({ zoom: false }),
    });
    setMapObject(map);
  }, []);

  useEffect(() => {
    if (mapObject) {
      mapObject.on("click", (e) => {
        const targetFeature = e.map.getFeaturesAtPixel(e.pixel);
        console.log("map", e.map);
        if (targetFeature.length) {
          const feature = targetFeature[0];
          console.log("e", feature.getProperties().name);
        }
      });
    }
  }, [mapObject]);

  return <Box id="world-map" w="100%" h="100vh"></Box>;
};
