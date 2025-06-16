import { WidgetFormat } from "./widget-format";

export interface Widget {
  id: string;
  title: string;
  WidgetFormat: WidgetFormat;
  data: any;
  position: {
    x: number;
    y: number;
  };
}