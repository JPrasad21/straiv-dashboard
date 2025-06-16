import { ChartType } from "./chart-type";
import { WidgetFormat } from "./widget-format";
import { WidgetType } from "./widget-type";

export interface Widget {
  id: string;
  title: string;
  widgetFormat: WidgetFormat;
  widgetType: WidgetType;
  chartType: ChartType;
  data?: any;
  x: number;
  y: number;
  w: number;
  h: number;
  config: any;
}