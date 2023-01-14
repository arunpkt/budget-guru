import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Transaction } from './constants/transaction';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TransactionInput } from './constants/transaction_input';
import { map, tap, catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http: HttpClient) { }

  retrieveIncomeDetails(transInput : TransactionInput): Observable<Transaction[]> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<Transaction[]>(environment.TRANSACTION_LIST_URL, transInput, httpOptions)
    .pipe(tap(_ => console.log("Transaction details saved successfully")));;
  }
}
