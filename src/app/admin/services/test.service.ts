import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Test } from '../../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  http = inject(HttpClient);

  baseUrl = `${environment.baseUrl}evaluations/`;

  getListTest(): Observable<Test[]> {
    const url = `${this.baseUrl}tests/`;
    return this.http.get<Test[]>(url);
  }

  getRetrieve(id: number): Observable<Test> {
    const url = `${this.baseUrl}tests/${id}/`;
    return this.http.get<Test>(url);
  }

  getTest(id: number): Observable<Test> {
    const url = `${this.baseUrl}tests/${id}/all-test/`;
    return this.http.get<Test>(url);
  }

  addAnswer(data: any): Observable<any> {
    const url = `${this.baseUrl}questions/add-answer/`;
    return this.http.post<any>(url, data);
  }

  clientPassedTest(testId: number): Observable<any>{
    const url = `${this.baseUrl}tests/${testId}/passed/`;
    return this.http.get<any>(url);
  }
}
