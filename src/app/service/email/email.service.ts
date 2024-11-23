import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrl } from '../../shared/constants/apiUrl';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private baseUrl = `${apiUrl}/api`;
  constructor(private http: HttpClient) { }

  getUserEmailByUsername(username: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/User/GetUserEmailByUserName/details/${username}`);
  }
  
  sendEmail(emailRequest: { toEmail: string, subject: string, body: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/Mail/SendMail/SendMail`, emailRequest);
  }
}
