import { Injectable } from '@angular/core';
import { IncomeService } from './income.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'
import { map, tap, catchError } from 'rxjs/operators'
import { environment } from 'src/environments/environment';
import { Transaction } from './constants/transaction';
import { income_category } from './constants/incomeCategory';
import { expense_category } from './constants/expenseCategory';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private http: HttpClient) { }

  getCategories(): Observable<expense_category[]> {
    return this.http.get<expense_category[]>
      (environment.EXPENSE_CATEGORY_URL).pipe(tap(_ => console.log("Expense categories get successfully")));;
  }

  saveExpenseDetails(transaction: Transaction): Observable<ArrayBuffer> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    let res = this.http.post<ArrayBuffer>(environment.INCOME_POST_TRANSACTION_URL,
      transaction, httpOptions).pipe(
        tap(data => { console.log("Transaction saved successfully"); }));
    return res;
  }


}
