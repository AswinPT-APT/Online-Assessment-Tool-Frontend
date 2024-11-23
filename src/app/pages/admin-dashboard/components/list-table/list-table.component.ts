import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { Performers } from '../../../../shared/models/performers.interface'; 
import { AdminDashboardService } from '../../../../service/admin-dashboard/admin-dashboard.service'; 
import { TableComponent } from '../../../assessment-performance/components/table/table.component';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-list-table',
  standalone: true,
  imports: [CommonModule,TableModule],
  templateUrl: './list-table.component.html',
  styleUrl: './list-table.component.scss'
})
export class ListTableComponent {
  @Input() batchName: string = '';
  @Input() assessmentName: string = '';
  @Input() performerType: 'top' | 'low' = 'top';
  @Input() assessmentId!: number ;

  Title: string = '';
  filteredData: Performers[] = [];

  constructor(private adminDashboardService: AdminDashboardService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['assessmentId'] || changes['performerType']) {
      if (this.assessmentId !== null) {
        this.updateTitleAndFetchData();
      }
    }
  }

  updateTitleAndFetchData(): void {
    if (this.performerType === 'top') {
      this.Title = 'High Performers';
      this.fetchTopPerformers();
    } else {
      this.Title = 'Low Performers';
      this.fetchLowPerformers();
    }
  }

  fetchTopPerformers(): void {
    if (this.assessmentId !== null) {
      this.adminDashboardService.getHighPerformers(this.assessmentId).subscribe(
        (data: Performers[]) => {
          this.filteredData = data;
        },
        (error: any) => {
          console.error('Error fetching top performers:', error);
        }
      );
    }
  }

  fetchLowPerformers(): void {
    if (this.assessmentId !== null) {
      this.adminDashboardService.getLowPerformers(this.assessmentId).subscribe(
        (data: Performers[]) => {
          this.filteredData = data;
        },
        (error: any) => {
          console.error('Error fetching low performers:', error);
        }
      );
    }
  }
}
