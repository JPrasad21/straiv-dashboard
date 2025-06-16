import { Component, input } from '@angular/core';
import { Widget } from '../../../widgets/models/widget';
import { KtdGridLayout, KtdGridLayoutItem, KtdGridModule } from '@katoid/angular-grid-layout';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [KtdGridModule, CommonModule],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss'
})
export class DashboardLayoutComponent {

  widgets = input<Widget[]>([]);
  layout: KtdGridLayout = [];
  layoutConfig = {
    cols: 10,
    rowHeight: 100,
    preventCollision: false,
    transition: 'transform 500ms ease, width 500ms ease, height 500ms ease'
  }
  constructor() {}

  ngOnInit() {
    this.generateLayout();
  }

  generateLayout() {
    const layout: KtdGridLayout = [];
    for (let i = 0; i < this.layoutConfig.cols; i++) {
        const y = Math.ceil(Math.random() * 4) + 1;
        layout.push({
            x: Math.round(Math.random() * (Math.floor((this.layoutConfig.cols / 2) - 1))) * 2,
            y: Math.floor(i / 6) * y,
            w: 2,
            h: y,
            id: i.toString()
        });
    }
    console.log('layout', layout);
    this.layout = layout;
  }

  addItemToLayout() {
    const maxId = this.layout.reduce((acc, cur) => Math.max(acc, parseInt(cur.id, 10)), -1);
    const nextId = maxId + 1;

    const newLayoutItem: KtdGridLayoutItem = {
        id: nextId.toString(),
        x: 0,
        y: 0,
        w: 2,
        h: 2
    };

    this.layout = [
        newLayoutItem,
        ...this.layout
    ];
  }
  stopEventPropagation(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }

  removeItem(id: string) {
    this.layout = this.layout.filter(x => x.id !== id);
  }
}
