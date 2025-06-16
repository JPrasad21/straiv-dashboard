import { Injectable, signal } from '@angular/core';
import { Widget } from '../models/widget';

@Injectable({
  providedIn: 'root'
})
export class WidgetService {

  newWidgetAdded = signal<Widget | null>(null);
  constructor() { }
}
