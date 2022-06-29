import { Box } from "@chakra-ui/react";
import BaseLayer from "ol/layer/Base";
import React, { useEffect } from "react";
import { DefaultLocation, DefaultProjection } from "./gis-common";
import { Map } from "ol";
import { MapControl } from "./map-control";
import { TileMapBaro } from "./tile-map-baro";
import TileLayer from "ol/layer/Tile";
//import { TileMapBaro } from './tile-map-baro';

interface GisEntryState {
  mapObject: MapControl | undefined;
  //loraLayer: LayerLoraNvr | undefined;
}

export const makeBuilderMap = (t: string) => {
  if (t === "baro") {
    return new TileMapBaro();
  }
};

const GisEntry = ({ background }: { background?: string }): JSX.Element => {
  const [state, setState] = React.useState<GisEntryState>({ mapObject: undefined });

  const [layers, setLayers] = React.useState<BaseLayer[]>([]);

  useEffect(() => {
    console.log("create map useEffect");
    const myMap = new MapControl("map", DefaultProjection, DefaultLocation);
    const baroTile = new TileMapBaro();
    setLayers([baroTile]);
    setState({ ...state, mapObject: myMap });
    console.log("map", myMap);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (state && state.mapObject) {
      // 맵이 새로 생성되었거나, 레이어가 변경되었을 경우 새로 적용한다.
      // console.log("mapControl data (overlay)");
      console.log("useEffect2");
      state.mapObject.layers = layers;
    }
  }, [layers, state]);

  //지도이미지(background) 업데이트
  // useEffect(() => {
  //   const updateLayer = async (): Promise<void> => {
  //     setLayers([makeBuilderMap("baro")]);
  //   };
  //   updateLayer().catch((err) => {
  //     console.log("err", err);
  //   });
  // }, [background]);

  return <Box w="100%" h="100%" id="map"></Box>;
};

export default GisEntry;
