import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface Expense {
  _id?: string;
  userId: string;
  amount: number;
  category: string;
  description: string;
  date: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private apiUrl = 'http://localhost:5000/api/expenses';

  getExpenses(): Observable<Expense[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Expense[]>(this.apiUrl, { headers });
  }

  getExpense(id: string): Observable<Expense> {
    const headers = this.getAuthHeaders();
    return this.http.get<Expense>(`${this.apiUrl}/${id}`, { headers });
  }

  createExpense(expense: Omit<Expense, '_id'>): Observable<Expense> {
    const headers = this.getAuthHeaders();
    return this.http.post<Expense>(this.apiUrl, expense, { headers });
  }

  updateExpense(id: string, expense: Partial<Expense>): Observable<Expense> {
    const headers = this.getAuthHeaders();
    return this.http.put<Expense>(`${this.apiUrl}/${id}`, expense, { headers });
  }

  deleteExpense(id: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
}
