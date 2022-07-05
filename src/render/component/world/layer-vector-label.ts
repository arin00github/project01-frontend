import GeoJSON from "ol/format/GeoJSON";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Fill, Stroke, Style } from "ol/style";

export class LayerVectorLabel extends VectorLayer<VectorSource> {
  private baseStyle = new Style({
    stroke: new Stroke({
      width: 1,
      color: "#ffffff",
    }),
    fill: new Fill({
      color: "#dbdbdb",
    }),
  });

  constructor() {
    //Options<VectorSource<Geometry>>
    super({
      source: new VectorSource({
        format: new GeoJSON(),
        url: "https://openlayersbook.github.io/openlayers_book_samples/assets/data/countries.geojson",
      }),
      background: "white",
      style: (feature) => {
        if (feature) {
          return this.baseStyle;
        }
      },
    });
  }
}
