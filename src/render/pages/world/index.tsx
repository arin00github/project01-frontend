import { Box } from "@chakra-ui/react";
import { Map, View } from "ol";
import Layer from "ol/layer/Layer";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import React from "react";
import { useEffect } from "react";
import * as OlControl from "ol/control";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { GeoJSON, MVT } from "ol/format";
import { Fill, Stroke, Style } from "ol/style";
import { WorldMapEntry } from "Component/world";

const WorldMapIndex = (): JSX.Element => {
  return <WorldMapEntry />;
};

export default WorldMapIndex;
