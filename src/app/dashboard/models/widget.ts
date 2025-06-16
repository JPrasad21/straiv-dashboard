export interface Widget {
  id: string;
  title: string;
  type: 'Chart' | 'Text';
  data: any;
  position: {
    x: number;
    y: number;
  };
}