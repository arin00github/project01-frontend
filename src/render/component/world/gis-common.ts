import { Map, View } from "ol";
import * as proj from "ol/proj";
import * as OlControl from "ol/control";

export const DefaultProjection = "EPSG:4326";
export const DefaultCenter = [0, 0];

export const NewWorldMap = (targetName: string, projection?: string, center?: number[], zoom?: number) => {
  return new Map({
    target: targetName,
    layers: [],
    view: new View({
      projection: projection || DefaultProjection,
      center: proj.fromLonLat(center || DefaultCenter, projection),
      zoom: zoom || 4,
    }),
    controls: OlControl.defaults({
      zoom: false,
    }),
  });
};
