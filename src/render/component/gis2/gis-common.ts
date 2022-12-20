import * as OlControl from "ol/control";

import * as proj from "ol/proj";
import { GeoJSON } from "ol/format";
import { Map, View } from "ol";
import { MapProjection } from "./map-projection";

export type BackgroundMapType = "none" | "baro" | "kakao" | "skyview" | "hybrid";
export const DefaultLocation = [127.606847, 35.730482]; // [126.8915302, 37.4858711];
export const DefaultProjection = "EPSG:5179";
export const DefaultMapName = "map";

const ViewCenter: number[] = [127.606847, 35.730482];
const ViewRange: number[] = [127.8684, 35.0073, 130.8178, 36.1804];

export interface GisViewPosition {
  center: number[];
  zoom?: number;
}

export interface GisViewExtent {
  center: number[];
  centerSrc: number[];
  rect: number[];
  zoom: number;
}

export const GetViewCenter = (): number[] => {
  return proj.fromLonLat([ViewCenter[0], ViewCenter[1]], DefaultProjection);
};

export const GetViewRange = (): number[] => {
  const p1 = proj.fromLonLat([ViewRange[0], ViewRange[1]], DefaultProjection);
  const p2 = proj.fromLonLat([ViewRange[2], ViewRange[3]], DefaultProjection);

  return p1.concat(p2);
};

export const ReadFeatureFromGeoJSON = (
  featureProjection: string,
  dataProjection: string,
  src: Record<string, unknown>
) => {
  try {
    if (src && src.features && Array.isArray(src.features) && src.features.length > 0) {
      const reader = new GeoJSON({ featureProjection, dataProjection });
      if (reader) {
        return reader.readFeatures(src);
      }
    }
  } catch (err) {
    console.log("readFeature error");
  }
};

export const NewGisMap = (targetName: string, projection?: string, center?: number[], zoom?: number): Map => {
  return new Map({
    target: targetName,
    layers: [],
    view: new View({
      projection: projection || DefaultProjection,
      center: proj.fromLonLat(center || DefaultLocation, projection),
      zoom: zoom || 2,
      resolutions: MapProjection.baroHdResolution,
      minZoom: 2,
      maxZoom: 18,
    }),
    controls: OlControl.defaults({
      zoom: false,
    }),
  });
};
