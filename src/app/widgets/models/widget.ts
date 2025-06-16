import { ChartType } from "./chart-type";
import { WidgetData } from "./widget-data";
import { WidgetFormat } from "./widget-format";
import { WidgetType } from "./widget-type";

export interface Widget {
  id: string;
  title: string;
  widgetFormat: WidgetFormat;
  widgetType: WidgetType;
  chartType: ChartType;
  data?: WidgetData;
  x: number;
  y: number;
  w: number;
  h: number;
  config: WidgetConfig;
}

export interface WidgetConfig {
  roomType?: string[];
  lastDays?: number;
}