import { Box, Text } from "@chakra-ui/react";
import { Map, View, Feature, Overlay } from "ol";
import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { MapCollection } from "./map-control";
import { LayerVectorLabel } from "./layer-vector-label";
import BaseLayer from "ol/layer/Base";
import Select from "ol/interaction/Select";
import { Fill, Stroke, Style } from "ol/style";
import { altKeyOnly, click, pointerMove } from "ol/events/condition";
import { Geometry } from "ol/geom";

export const WorldMapEntry = (): JSX.Element => {
  const [mapObject, setMapObject] = useState<MapCollection | undefined>(undefined);
  const [state, setState] = useState<{ layers: BaseLayer[]; vectorLayer: LayerVectorLabel } | undefined>(undefined);

  const [popup, setPopup] = useState<Overlay | undefined>(undefined);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selItem, setSelItem] = useState<{ [x: string]: any } | undefined>(undefined);

  const mapElement = document.getElementById("world-map");
  const mapHeight = mapElement?.clientHeight;
  const mapWidth = mapElement?.clientWidth;

  const changePositioning = useCallback(
    (targetOverlay: Overlay, pixelPin: number[]) => {
      if (mapElement && mapHeight && mapWidth) {
        const widthHalf = mapWidth / 2;
        const heightHalf = mapHeight / 2;
        if (pixelPin[0] < widthHalf && pixelPin[1] < heightHalf) {
          targetOverlay.setPositioning("top-left");
        } else if (pixelPin[0] >= widthHalf && pixelPin[1] < heightHalf) {
          targetOverlay.setPositioning("top-right");
        } else if (pixelPin[0] < widthHalf && pixelPin[1] >= heightHalf) {
          targetOverlay.setPositioning("bottom-left");
        } else if (pixelPin[0] >= widthHalf && pixelPin[1] >= heightHalf) {
          targetOverlay.setPositioning("bottom-right");
        }
      }
    },
    [mapElement, mapHeight, mapWidth]
  );

  const onClick = useCallback(
    (src: Map, coord: number[], pnt: number[]) => {
      // console.log(src, coord, pnt);
      if (state?.vectorLayer) {
        state.vectorLayer.getFeatures(pnt).then((feature) => {
          // console.log("feature", feature);
          if (feature.length) {
            const content = feature[0].getProperties();
            const readOverlay = src.getOverlayById("select-popup");
            readOverlay.setPosition(coord);
            changePositioning(readOverlay, pnt);
            setSelItem({ ...content, coord: coord });
          } else {
            const readOverlay = src.getOverlayById("select-popup");
            readOverlay.setPosition(undefined);
            setSelItem(undefined);
          }
        });
      }
    },
    [state, changePositioning]
  );
  console.log("mapObject", mapObject);

  useEffect(() => {
    const map = new MapCollection("world-map");
    const myOverlay = new Overlay({ element: document.getElementById("popup") || undefined, id: "select-popup" });

    setMapObject(map);
    setPopup(myOverlay);
  }, []);

  useEffect(() => {
    if (mapObject) {
      const bgLayer = new LayerVectorLabel();
      mapObject.addLayers = [bgLayer];
      setState({ ...state, layers: [bgLayer], vectorLayer: bgLayer });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapObject]);

  useEffect(() => {
    if (state?.layers && mapObject && popup) {
      mapObject.onClick = onClick;
      mapObject.addOverlay = popup;
    }
  }, [state, mapObject, onClick, popup]);

  return (
    <>
      <Box id="world-map" w="100%" h="100vh"></Box>
      <Box id="popup" p={8} bg="white" w="280px" boxShadow="0 0 18px rgba(0,0,0,0.08)" color="gray.800">
        {selItem && (
          <Box>
            <Box>
              {selItem.name} / {selItem.iso_a2}
            </Box>
            <Text>
              위도: {selItem.coord[0]}/ 경도: {selItem.coord[1]}
            </Text>
          </Box>
        )}
      </Box>
    </>
  );
};
