import { Widget } from "../../widgets/models/widget";

export interface Dashboard {
	id: string;
	title: string;
	description: string;
	widgets: Widget[];
}