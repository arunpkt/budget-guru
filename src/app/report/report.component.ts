import { Component, OnInit } from '@angular/core';
import { ReportService } from '../report.service';
import { Transaction } from '../constants/transaction';
import { TransactionInput }  from '../constants/transaction_input';
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {

  expenseSum: number = 0;
  incomeSum: number = 0;
  balance: number = 0;
  transactionList = {} as Transaction[];
  constructor(private reportService : ReportService) {
  }

  ngOnInit() {
    let date = new Date();
    let transInput  = {} as TransactionInput;
    transInput.month = (date.getMonth() + 1).toString();
    transInput.year = (date.getFullYear()).toString();
    this.getReport(transInput);
  }
  reload(year:string, month:string) {
    let transInput  = {} as TransactionInput;
    transInput.month = month;
    transInput.year = year;
    this.getReport(transInput);
  }
  
  getReport(transInput : TransactionInput) : void {
    this.reportService.retrieveIncomeDetails(transInput).subscribe((transactList : Transaction[]) => {
      this.transactionList = transactList;
      transactList.map((trans) => {
        trans.date = new Date(trans.date);
      });
      this.expenseSum = transactList.reduce((previous , next) => {
        if (next.transaction_type == 'ex') {
          return previous + next.amount;
        } else {
          return previous;
        }
      }, 0 as number);
      this.incomeSum = transactList.reduce((previous , next) => {
        if (next.transaction_type == 'in') {
          return previous + next.amount;
        } else {
          return previous;
        }
      }, 0 as number);
    });
  }

}
