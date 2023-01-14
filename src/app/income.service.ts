import { Injectable } from '@angular/core';
import { income_category } from './constants/incomeCategory';
import { Transaction } from './constants/transaction';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators'
import { environment } from '../environments/environment';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<income_category[]> {
    return this.http.get<income_category[]>
      (environment.INCOME_CATEGORY_URL).pipe(tap(_ => console.log("Categories get successfully")));;
  }

  saveIncomeDetails(transaction: Transaction): Observable<ArrayBuffer> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    let res = this.http.post<ArrayBuffer>(environment.INCOME_POST_TRANSACTION_URL,
      transaction, httpOptions).pipe(
        tap(data => { console.log("Transaction saved successfully"); }));
    return res;
  }
}
