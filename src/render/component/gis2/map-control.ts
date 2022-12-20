import { Map, Overlay, View } from "ol";
import BaseLayer from "ol/layer/Base";
import { NewGisMap } from "./gis-common";
import { LayerAnchorLabel } from "./layer-anchor-label";

export class MapControl {
  private readonly map: Map;
  private readonly overlay: Overlay;
  private readonly projection: string;
  private readonly anchorLayer: LayerAnchorLabel;

  public onClick?: (src: Map, coord?: number[], pnt?: number[]) => void;
  public onMoveEnd?: (src: Map) => void;

  constructor(targetName: string, projection?: string, center?: number[], zoom?: number) {
    this.map = NewGisMap(targetName, projection, center, zoom);
    this.overlay = new Overlay({ element: undefined, positioning: "center-center" });
    this.projection = this.map.getView().getProjection().getCode();
    this.anchorLayer = new LayerAnchorLabel();

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

  set layers(layers: BaseLayer[]) {
    this.map.setLayers(layers.concat(this.anchorLayer));
  }

  get view(): View {
    return this.map.getView();
  }
}
