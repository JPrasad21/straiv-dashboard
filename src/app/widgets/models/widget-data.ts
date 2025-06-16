export interface WidgetData {
  labels: string[];
  datasets: WidgetDataset[];
}

export interface WidgetDataset {
  label: string;
  data: number[] | string[];
  backgroundColor: string[];
  borderColor: string[];
  borderWidth?: number;
  fill?: boolean;
}