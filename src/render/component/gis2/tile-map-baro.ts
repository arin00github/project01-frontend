import { WMTS, XYZ } from "ol/source";
import * as proj from "ol/proj";
import WmtsTileGrid from "ol/tilegrid/WMTS";
import { MapProjection } from "./map-projection";
import { ImageTile, Tile } from "ol";
import { getTopLeft, getWidth } from "ol/extent";
import TileLayer from "ol/layer/Tile";

export const FormatString = (str: string, ...val: string[]): string => {
  for (let index = 0; index < val.length; index++) {
    str = str.replace(`{${index}}`, val[index]);
  }
  return str;
};

const projection = new proj.Projection({ code: "EPSG:5179" });
projection?.setExtent([-200000.0, -28024123.62, 31824123.62, 4000000.0]);

// const size = projectionExt ? getWidth(projectionExt) / 256 : 0;
// console.log(projectionExt, size, projection);
export class BaroTileSource2 extends WMTS {
  constructor(private readonly sourcePath?: string) {
    super({
      projection: new proj.Projection({ code: "EPSG:5179" }),
      tileGrid: new WmtsTileGrid({
        extent: MapProjection.baroHdExtent,
        origin: getTopLeft(projection.getExtent()),
        tileSize: 256,
        matrixIds: MapProjection.matrixIds,
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
        const imageTile = tile as ImageTile;

        const ImageGet = imageTile.getImage() as HTMLImageElement;
        ImageGet.src = src;
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
