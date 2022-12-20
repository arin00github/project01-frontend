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

const projection = new proj.Projection({ code: "EPSG:5179" });
console.log("projection", projection);

export class BaroTileSource extends WMTS {
  constructor(private readonly sourcePath?: string) {
    super({
      projection: projection,
      tileGrid: new WmtsTileGrid({
        extent: MapProjection.baroHdExtent,
        origin: [-200000.0, 4000000.0],
        tileSize: 256,
        matrixIds: ["L05", "L06", "L07", "L08", "L09", "L10", "L11", "L12", "L13", "L14", "L15", "L16", "L17", "L18"],
        resolutions: MapProjection.baroHdResolution,
      }),
      tilePixelRatio: 2,
      layer: "korean_map",
      style: "korean",
      format: "image/png",
      matrixSet: "korean",
      url: "/emaphd",
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      tileLoadFunction: (tile: Tile, _: string) => {
        // console.log("src", tile['tileCoord'])
        console.log("tile", tile, _);
        const imageTile = tile as ImageTile;
        const z = imageTile["tileCoord"][0] + 5;
        const y = imageTile["tileCoord"][1];
        const x = imageTile["tileCoord"][2];
        const srcPath = sourcePath || "https://tms-gis-tile.azurewebsites.net/api/v1/tile/{0}/{1}/{2}"; //"/emaphd/{0}/{1}/{2}.png";

        const zLabel = srcPath.startsWith("https") ? z.toString(10) : z < 9 ? "L0" + z : "L" + z;

        const ImageSrc = imageTile.getImage() as HTMLImageElement;
        console.log("format", FormatString(srcPath, zLabel, y.toString(10), x.toString(10)));
        ImageSrc.src = FormatString(srcPath, zLabel, y.toString(10), x.toString(10));
      },
      crossOrigin: "anonymous",
      wrapX: false,
    });
  }
}

export class TileMapBaro extends TileLayer<WMTS> {
  constructor(private readonly sourcePath?: string) {
    super({
      preload: Infinity,
      source: new BaroTileSource(sourcePath),
    });
  }
}
