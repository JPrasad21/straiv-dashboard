import { Injectable } from '@angular/core';
import { WidgetType } from '../../widgets/models/widget-type';

@Injectable({
  providedIn: 'root'
})
export class ChartRenderService {

  constructor() { }

  updateChartOptions(isDarkTheme: boolean = false, showLegend: boolean = true) {
    return {
      responsive: true,
      plugins: {
        legend: {
          display: showLegend,
          position: 'top',
          labels: {
            color: isDarkTheme ? '#fff' : '#000',
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      scales: {
        x: {
          ticks: {
            color: isDarkTheme ? '#fff' : '#000',
          },
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: isDarkTheme ? '#fff' : '#000',
          },
        },
      },
      backgroundColor: isDarkTheme ? '#444' : '#fff',
    };
  }

  getRandomColors(num: number): string[] {
    const colors = [];
    for (let i = 0; i < num; i++) {
        colors.push(this.getRandomColor());
    }
    return colors;
  }
  getRandomColor(): string {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
  }

  getChartData(widgetType: WidgetType) {
    switch (widgetType) {
      case 'Occupancy by Room Types':
      case 'Most Popular Room Type':
        return this.getRoomOccupancyData();
      case 'Checkin Count':
        return this.getCheckinCountData();
      case 'Daily Checkins':
      case 'Most Popular Day':
      case 'Overall Checkin Count':
        return this.getDailyCheckinData();
      default:
        return [];
    }

  }
  getRoomOccupancyData() {
    return [
      {
        label: 'Deluxe',
        data: 120,
        backgroundColor: this.getRandomColor(),
      },
      {
        label: 'Standard',
        data: 95,
        backgroundColor: this.getRandomColor(),
      },
      {
        label: 'Suite',
        data: 60,
        backgroundColor: this.getRandomColor(),
      },
      {
        label: 'Family',
        data: 30,
        backgroundColor: this.getRandomColor(),
      },
      {
        label: 'Economy',
        data: 25,
        backgroundColor: this.getRandomColor(),
      }
    ];
  }

  getCheckinCountData() {
    return [
      {
        label: 'Monday',
        data: 45,
        backgroundColor: this.getRandomColor(),
      },
      {
        label: 'Tuesday',
        data: 60,
        backgroundColor: this.getRandomColor(),
      },
      {
        label: 'Wednesday',
        data: 70,
        backgroundColor: this.getRandomColor(),
      },
      {
        label: 'Thursday',
        data: 80,
        backgroundColor: this.getRandomColor(),
      },
      {
        label: 'Friday',
        data: 95,
        backgroundColor: this.getRandomColor(),
      },
      {
        label: 'Saturday',
        data: 110,
        backgroundColor: this.getRandomColor(),
      },
      {
        label: 'Sunday',
        data: 85,
        backgroundColor: this.getRandomColor(),
      }
    ];
  }
  getDailyCheckinData() {
    const today = new Date();
    const data = [];
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      data.push({
        label: date.toLocaleDateString(),
        data: Math.floor(Math.random() * 100 + 1),
        backgroundColor: this.getRandomColor(),
      })
    }
    return data;
  }
}
