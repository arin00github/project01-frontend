import { Map } from "ol";
import BaseLayer from "ol/layer/Base";
import { NewWorldMap } from "./gis-common";
import { LayerVectorLabel } from "./layer-vector-label";

export class MapCollection {
  private readonly map: Map;
  private readonly vectorLayer: LayerVectorLabel;
  private readonly projection: string;

  public onClick?: (src: Map, coord?: number[], pnt?: number[]) => void;
  public onMoveEnd?: (src: Map) => void;

  constructor(targetName: string, projection?: string, center?: number[], zoom?: number) {
    this.map = NewWorldMap(targetName, projection, center, zoom);
    this.vectorLayer = new LayerVectorLabel();
    this.projection = this.map.getView().getProjection().getCode();

    this.bindEvent();
  }

  private bindEvent() {
    this.map.on("click", (e) => {
      if (this.onClick && e && e.map) {
        this.onClick(this.map, e.map.getEventCoordinate(e.originalEvent), e.map.getEventPixel(e.originalEvent));
      }
    });

    this.map.on("moveend", (e) => {
      if (this.onMoveEnd && e && e.map) {
        this.onMoveEnd(e.map);
      }
    });
  }

  set addLayers(layers: BaseLayer[]) {
    this.map.setLayers(layers.concat(this.vectorLayer));
  }
}
