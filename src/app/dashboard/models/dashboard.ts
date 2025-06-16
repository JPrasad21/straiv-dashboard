import { Widget } from "./widget";

export interface Dashboard {
	id: string;
	title: string;
	description: string;
	widgets: Widget[];
}