import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PerformanceDetails } from '../../shared/models/performanceDetails.interface';
import { apiUrl } from '../../shared/constants/apiUrl';

interface Trainee {
  traineeName: string;
  isPresent: string;
  score: number;
}

@Injectable({
  providedIn: 'root'
})
export class PerformanceDetailsService {

  private performanceApiUrl = `${apiUrl}/api/Assessment/GetTraineeAssessmentDetails/GetTraineeAssessmentDetails`; // Replace with your actual API URL
  private scheduledAssessmentApiUrl = `${apiUrl}/api/ScheduledAssessment/GetScheduledAssessmentDetails`;
  constructor(private http: HttpClient) { }

  getTrainees(assessmentId : number): Observable<Trainee[]> {
    return this.http.get<Trainee[]>(`${this.performanceApiUrl}/${assessmentId}`);
  }
  getPerformanceDetails(scheduledAssessmentId: number): Observable<PerformanceDetails> {
    return this.http.get<PerformanceDetails>(`${this.scheduledAssessmentApiUrl}/${scheduledAssessmentId}`);
  }
}
