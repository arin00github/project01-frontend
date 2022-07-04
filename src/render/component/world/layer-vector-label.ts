import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Fill, Stroke, Style } from "ol/style";

export class LayerVectorLabel extends VectorLayer<VectorSource> {
  private baseStyle = new Style({
    fill: new Fill({
      color: "#dbdbdb",
    }),
    stroke: new Stroke({ width: 1, color: "red" }),
  });

  constructor() {
    super({
      style: (feature) => {
        if (feature) {
          return this.baseStyle;
        }
      },
    });
  }
}
