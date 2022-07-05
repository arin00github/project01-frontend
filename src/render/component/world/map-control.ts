import { Map, Overlay } from "ol";
import BaseLayer from "ol/layer/Base";
import { NewWorldMap } from "./gis-common";
import { LayerVectorLabel } from "./layer-vector-label";

export class MapCollection {
  private readonly map: Map;
  private readonly overlay: Overlay;
  private readonly vectorLayer: LayerVectorLabel;
  private readonly projection: string;

  public onClick?: (src: Map, coord: number[], pnt: number[]) => void;
  public onMoveEnd?: (src: Map) => void;

  constructor(targetName: string, projection?: string, center?: number[], zoom?: number) {
    this.map = NewWorldMap(targetName, projection, center, zoom);
    this.overlay = new Overlay({ element: undefined, positioning: "center-center" });
    this.vectorLayer = new LayerVectorLabel();
    this.projection = this.map.getView().getProjection().getCode();

    this.bindEvent();
  }

  private bindEvent() {
    this.map.on("click", (e) => {
      if (this.onClick && e && e.map) {
        //바깥에서 onClick에 대한 구체적인 함수 이벤트를 정의한다
        this.onClick(this.map, e.map.getEventCoordinate(e.originalEvent), e.map.getEventPixel(e.originalEvent));
      }
    });

    this.map.on("moveend", (e) => {
      if (this.onMoveEnd && e && e.map) {
        this.onMoveEnd(e.map);
      }
    });
  }

  set addOverlay(overlay: Overlay) {
    this.map.addOverlay(overlay);
  }

  set addLayers(layers: BaseLayer[]) {
    this.map.setLayers(layers.concat(this.vectorLayer));
  }
}
