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
  private selectStyle = new Style({
    stroke: new Stroke({
      width: 1,
      color: "red",
    }),
    fill: new Fill({
      color: "#dbdbdb",
    }),
  });

  public selectedFeatureId: string | undefined = undefined;

  constructor() {
    //Options<VectorSource<Geometry>>
    super({
      source: new VectorSource({
        format: new GeoJSON(),
        url: "https://openlayersbook.github.io/openlayers_book_samples/assets/data/countries.geojson",
      }),
      zIndex: 1,
      background: "white",
      style: (feature) => {
        if (feature) {
          if (feature.getProperties().name === this.selectedFeatureId) {
            console.log("change style");
            return this.selectStyle;
          } else {
            return this.baseStyle;
          }
        }
      },
    });
    this.bindEvent();
  }

  private bindEvent() {
    this.addEventListener("change", (e) => {
      if (this.selectedFeatureId) {
        console.log("change");
      }
    });
  }
  public redraw(valueId: string | undefined) {
    this.getSelectFeature(valueId);
    this.getSource()?.refresh();
  }

  public getSelectFeature(valueId: string | undefined) {
    if (this.selectedFeatureId !== valueId) {
      this.selectedFeatureId = valueId;
    } else {
      this.selectedFeatureId = undefined;
    }
  }
}
