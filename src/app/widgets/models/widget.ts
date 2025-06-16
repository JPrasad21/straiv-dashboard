export interface Widget {
  id: string;
  title: string;
  WidgetType: 'Chart' | 'Text';
  data: any;
  position: {
    x: number;
    y: number;
  };
}

export type WidgetType = 'Chart' | 'Text';