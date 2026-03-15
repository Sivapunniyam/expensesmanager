import { Component, AfterViewInit, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

// Register all Chart.js components
Chart.register(...registerables);

interface ExpenseData {
  label: string;
  value: number;
  color: string;
}

interface RevenueData {
  label: string;
  value: number;
  color: string;
}

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Dashboard implements AfterViewInit {
  @ViewChild('pieChart', { static: false }) pieChartCanvas?: ElementRef<HTMLCanvasElement>;
  @ViewChild('barChart', { static: false }) barChartCanvas?: ElementRef<HTMLCanvasElement>;
  
  expenseChart?: Chart;
  revenueChart?: Chart;
  
  pieData: ExpenseData[] = [
    { label: 'Rent', value: 500, color: '#ff6384' },
    { label: 'Food', value: 300, color: '#36a2eb' },
    { label: 'Utilities', value: 200, color: '#ffcd56' },
    { label: 'Entertainment', value: 150, color: '#4bc0c0' },
    { label: 'Transport', value: 100, color: '#ff9f40' }
  ];

  revenueData: RevenueData[] = [
    { label: 'Salary', value: 5000, color: '#27ae60' },
    { label: 'Freelance', value: 1500, color: '#3498db' },
    { label: 'Investment', value: 800, color: '#f39c12' },
    { label: 'Retail Income', value: 1200, color: '#e74c3c' },
    { label: 'Bonus', value: 2000, color: '#9b59b6' },
    { label: 'Others', value: 500, color: '#95a5a6' }
  ];

  ngAfterViewInit(): void {
    setTimeout(() => {
      console.log('view init passed');
      this.initializeCharts();
    }, 100);
  }

  initializeCharts(): void {
    this.initializeExpenseChart();
    this.initializeRevenueChart();
  }

  initializeExpenseChart(): void {
    if (!this.pieChartCanvas) {
      console.warn('Expense chart canvas not found');
      return;
    }

    const canvas = this.pieChartCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      console.warn('Canvas 2D context not available');
      return;
    }

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const chartConfig: ChartConfiguration = {
      type: 'doughnut',
      data: {
        labels: this.pieData.map(d => d.label),
        datasets: [
          {
            data: this.pieData.map(d => d.value),
            backgroundColor: this.pieData.map(d => d.color),
            borderColor: '#fff',
            borderWidth: 2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            position: 'bottom'
          },
          tooltip: {
            callbacks: {
              label: (context: any) => {
                const label = context.label || '';
                const value = context.parsed || 0;
                const total = this.totalExpenses;
                const percentage = ((value / total) * 100).toFixed(2);
                return `${label}: $${value} (${percentage}%)`;
              }
            }
          }
        }
      }
    };

    if (this.expenseChart) {
      this.expenseChart.destroy();
    }

    this.expenseChart = new Chart(ctx, chartConfig);
    console.log('Expense chart initialized successfully');
  }

  initializeRevenueChart(): void {
    if (!this.barChartCanvas) {
      console.warn('Revenue chart canvas not found');
      return;
    }

    const canvas = this.barChartCanvas.nativeElement;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      console.warn('Canvas 2D context not available for revenue chart');
      return;
    }

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const chartConfig: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: this.revenueData.map(d => d.label),
        datasets: [
          {
            label: 'Revenue Amount',
            data: this.revenueData.map(d => d.value),
            backgroundColor: this.revenueData.map(d => d.color),
            borderColor: '#fff',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        indexAxis: 'y',
        plugins: {
          legend: {
            position: 'top'
          },
          tooltip: {
            callbacks: {
              label: (context: any) => {
                const value = context.parsed.x || 0;
                const total = this.totalRevenue;
                const percentage = ((value / total) * 100).toFixed(2);
                return `$${value} (${percentage}%)`;
              }
            }
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              callback: function(value: any) {
                return '$' + value;
              }
            }
          }
        }
      }
    };

    if (this.revenueChart) {
      this.revenueChart.destroy();
    }

    this.revenueChart = new Chart(ctx, chartConfig);
    console.log('Revenue chart initialized successfully');
  }

  get totalExpenses(): number {
    return this.pieData.reduce((sum, d) => sum + d.value, 0);
  }

  get totalRevenue(): number {
    return this.revenueData.reduce((sum, d) => sum + d.value, 0);
  }

  get total(): number {
    return this.totalExpenses;
  }

  addExpense(label: string, value: number, color: string): void {
    this.pieData.push({ label, value, color });
    this.updateExpenseChart();
  }

  updateExpense(index: number, value: number): void {
    if (index >= 0 && index < this.pieData.length) {
      this.pieData[index].value = value;
      this.updateExpenseChart();
    }
  }

  removeExpense(index: number): void {
    if (index >= 0 && index < this.pieData.length) {
      this.pieData.splice(index, 1);
      this.updateExpenseChart();
    }
  }

  addRevenue(label: string, value: number, color: string): void {
    this.revenueData.push({ label, value, color });
    this.updateRevenueChart();
  }

  updateRevenue(index: number, value: number): void {
    if (index >= 0 && index < this.revenueData.length) {
      this.revenueData[index].value = value;
      this.updateRevenueChart();
    }
  }

  removeRevenue(index: number): void {
    if (index >= 0 && index < this.revenueData.length) {
      this.revenueData.splice(index, 1);
      this.updateRevenueChart();
    }
  }

  private updateExpenseChart(): void {
    if (!this.expenseChart) return;

    this.expenseChart.data.labels = this.pieData.map(d => d.label);
    this.expenseChart.data.datasets[0].data = this.pieData.map(d => d.value);
    (this.expenseChart.data.datasets[0] as any).backgroundColor = this.pieData.map(d => d.color);
    this.expenseChart.update();
  }

  private updateRevenueChart(): void {
    if (!this.revenueChart) return;

    this.revenueChart.data.labels = this.revenueData.map(d => d.label);
    this.revenueChart.data.datasets[0].data = this.revenueData.map(d => d.value);
    (this.revenueChart.data.datasets[0] as any).backgroundColor = this.revenueData.map(d => d.color);
    this.revenueChart.update();
  }

  onDashboardClick(): void {
    console.log('Dashboard button clicked');
  }
}
