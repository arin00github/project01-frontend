import { WMTS } from "ol/source";
import * as proj from "ol/proj";
import WmtsTileGrid from "ol/tilegrid/WMTS";
import { MapProjection } from "./map-projection";
import { ImageTile, Tile } from "ol";
import TileLayer from "ol/layer/Tile";

export const FormatString = (str: string, ...val: string[]): string => {
  for (let index = 0; index < val.length; index++) {
    str = str.replace(`{${index}}`, val[index]);
  }
  return str;
};

// export class BaroTileSource extends WMTS {
//   constructor(private readonly sourcePath?: string) {
//     super({
//       url: "http://map.ngii.go.kr/openapi/Gettile.do?apikey=B1012B4A6CF3C94B4C077DC24B447B7B",
//       projection: new proj.Projection({ code: "EPSG:5179" }),
//       tileGrid: new WMTSTileGrid({
//         extent: MapProjection.baroHdExtent,
//         origin: [-200000.0, 400000.0],
//         tileSize: 256,
//         matrixIds: ["L05", "L06", "L07", "L08", "L09", "L10", "L11", "L12", "L13", "L14", "L15", "L16", "L17", "L18"],
//         resolutions: MapProjection.baroHdResolution,
//       }),
//       tilePixelRatio: 2,
//       layer: "korean_map",
//       style: "korean",
//       format: "image/png",
//       matrixSet: "korean",
//       // attributions: [
//       //   '<img style="width:96px; height:16px;"src="http://map.ngii.go.kr/img/process/ms/map/common/img_btoLogo3.png">',
//       // ],
//       tileLoadFunction: (tile: Tile, src: string) => {
//         console.log("tile", tile);
//         const imageTile = tile as ImageTile;
//         (imageTile.getImage() as HTMLImageElement).src =
//           "http://map.ngii.go.kr/openapi/proxy/proxyTile.jsp?apikey=" +
//           "B1012B4A6CF3C94B4C077DC24B447B7B" +
//           "&URL=" +
//           encodeURIComponent(src);
//         const z = imageTile["tileCoord"][0] + 5;
//         const y = imageTile["tileCoord"][1];
//         const x = imageTile["tileCoord"][2];
//         // const srcPath = sourcePath || "";
//         // const zLabel = srcPath.startsWith("https") ? z.toString(10) : z < 9 ? "L0" + z : "L" + z;
//         // (imageTile.getImage() as HTMLImageElement).src = FormatString(srcPath, zLabel, y.toString(10), x.toString(10));
//       },
//       crossOrigin: "anonymous",
//       wrapX: true,
//     });
//   }
// }

export class BaroTileSource extends WMTS {
  constructor(private readonly sourcePath?: string) {
    super({
      projection: new proj.Projection({
        code: "EPSG:5179",
      }),
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
        const imageTile = tile as ImageTile;
        const z = imageTile["tileCoord"][0] + 5;
        const y = imageTile["tileCoord"][1];
        const x = imageTile["tileCoord"][2];
        const srcPath = sourcePath || "https://tms-gis-tile.azurewebsites.net/api/v1/tile/{0}/{1}/{2}"; //"/emaphd/{0}/{1}/{2}.png";

        const zLabel = srcPath.startsWith("https") ? z.toString(10) : z < 9 ? "L0" + z : "L" + z;
        (imageTile.getImage() as HTMLImageElement).src = FormatString(srcPath, zLabel, y.toString(10), x.toString(10));
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
