import { WMTS, XYZ } from "ol/source";
import * as proj from "ol/proj";
import WmtsTileGrid from "ol/tilegrid/WMTS";
import { MapProjection } from "./map-projection";
import { ImageTile, Tile } from "ol";
import { Extent } from "ol/extent";
import TileLayer from "ol/layer/Tile";

export const FormatString = (str: string, ...val: string[]): string => {
  for (let index = 0; index < val.length; index++) {
    str = str.replace(`{${index}}`, val[index]);
  }
  return str;
};

export class BaroTileSource2 extends WMTS {
  constructor(private readonly sourcePath?: string) {
    super({
      projection: new proj.Projection({ code: "EPSG:5179" }),
      tileGrid: new WmtsTileGrid({
        extent: MapProjection.baroHdExtent,
        origin: [-200000.0, 400000.0],
        tileSize: 256,
        matrixIds: ["L05", "L06", "L07", "L08", "L09", "L10", "L11", "L12", "L13", "L14", "L15", "L16", "L17", "L18"],
        resolutions: MapProjection.baroHdResolution,
      }),
      tilePixelRatio: 2,
      layer: "korean_map",
      style: "korean",
      format: "image/png",
      matrixSet: "korean",
      url: "//map.ngii.go.kr/openapi/Gettile.do?apikey=B1012B4A6CF3C94B4C077DC24B447B7B",
      attributions: [
        '<img style="width:96px; height:16px;"src="http://map.ngii.go.kr/img/process/ms/map/common/img_btoLogo3.png">',
      ],
      tileLoadFunction: (tile: Tile, src: string) => {
        console.log("tile", tile);
        const imageTile = tile as ImageTile;
        console.log(imageTile["tileCoord"], imageTile["tileCoord"][0] * 10 + Number(src.split("TileRow=")[1]));

        const zValue = imageTile["tileCoord"][0] + 1;
        const minorsub = imageTile["tileCoord"][0] > 2 ? imageTile["tileCoord"][0] * 10 : 0;
        const subValue = zValue > 1 ? zValue * 10 : 5;
        console.log("z", zValue, subValue);
        const tileRowNumber = Number(src.split("TileRow=")[1]) + subValue;
        console.log("tileRowNumber", tileRowNumber);
        const newsrc = src.split("TileRow=")[0] + "TileRow=" + tileRowNumber;
        const ImageGet = imageTile.getImage() as HTMLImageElement;
        ImageGet.src = newsrc;
      },
      crossOrigin: "anonymous",
      wrapX: true,
    });
  }
}

export class TileMapBaro2 extends TileLayer<WMTS> {
  constructor(private readonly sourcePath?: string) {
    super({
      preload: Infinity,
      source: new BaroTileSource2(sourcePath),
    });
  }
}