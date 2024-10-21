import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Test } from '../../interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
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

  createTest(
    title: string,
    description: string,
    passingScorePercentage: number
  ) {
    const url = `${this.baseUrl}tests/`;
    return this.http.post(url, { title, description, passingScorePercentage });
  }

  createQuestion(questionObj: any) {
    console.log('pregunta', questionObj);
    const { instruction, question, resource, score } = questionObj.value;
    const fd = new FormData();
    fd.append('instruction', instruction);
    fd.append('question', question);
    if (resource) fd.append('resource', resource);
    fd.append('score', score.toString());
    fd.append('order', questionObj.order.toString());
    fd.append('test', questionObj.test.toString());
    const url = `${this.baseUrl}questions/`;
    return this.http.post(url, fd);
  }

  createOption(optionObj: any) {
    console.log('opcion', optionObj);
    const { possible_answer, is_correct, resource } = optionObj;
    const fd = new FormData();
    fd.append('possible_answer', possible_answer);
    fd.append('is_correct', is_correct);
    if (resource) fd.append('resource', resource);
    fd.append('question', optionObj.question.toString());
    const url = `${this.baseUrl}options/`;
    return this.http.post(url, fd);
  }

  getTest(id: number): Observable<Test> {
    const url = `${this.baseUrl}tests/${id}/all-test/`;
    return this.http.get<Test>(url);
  }

  addAnswer(data: any): Observable<any> {
    const url = `${this.baseUrl}questions/add-answer/`;
    return this.http.post<any>(url, data);
  }

  clientPassedTest(testId: number): Observable<any> {
    const url = `${this.baseUrl}tests/${testId}/passed/`;
    return this.http.get<any>(url);
  }
}
