import { Feature } from "ol";
import GeoJSON from "ol/format/GeoJSON";
import { Geometry } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Fill, Stroke, Style } from "ol/style";

export class LayerSeleted extends VectorLayer<VectorSource> {
  private baseStyle = new Style({
    fill: new Fill({
      color: "transparent",
    }),
  });
  private selectStyle = new Style({
    stroke: new Stroke({
      width: 2,
      color: "red",
    }),
    fill: new Fill({
      color: "#dbdbdb",
    }),
    zIndex: 100,
  });
  public selectedFeatureId: string | undefined = undefined;

  constructor() {
    //Options<VectorSource<Geometry>>
    super({
      source: new VectorSource({
        format: new GeoJSON(),
        features: [],
      }),
      zIndex: 50,
      style: (feature) => {
        if (feature) {
          return this.selectStyle;
        }
      },
    });
  }

  public redraw(feature?: Feature<Geometry>, valueId?: string) {
    if (feature) {
      this.getSource()?.addFeature(feature);
      this.redrawing(valueId);
    }
    this.getSelectFeature(valueId);
  }

  public redrawing(valueId?: string) {
    this.getSource()?.forEachFeature((item) => {
      const country = item.getProperties().name;
      if (country === valueId) {
        item.setStyle(this.selectStyle);
      } else {
        item.setStyle(this.baseStyle);
        this.getSource()?.removeFeature(item);
      }
    });
  }

  public getSelectFeature(valueId?: string) {
    if (this.selectedFeatureId !== valueId) {
      this.selectedFeatureId = valueId;
    } else {
      this.selectedFeatureId = undefined;
    }
  }
}
