import { Component, OnInit } from '@angular/core';
import { expense_category } from '../constants/expenseCategory';
import { Transaction } from '../constants/transaction';
import { FormGroup,FormControl, FormBuilder, Validators } from '@angular/forms';
import { ExpenseService } from '../expense.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss'],
})
export class ExpenseComponent implements OnInit {

  expenseCatgoryList: expense_category[] = [];
  transaction = {} as Transaction;
  isSuccess = false;
  expenseForm: FormGroup;

  constructor(
    private expenseService: ExpenseService,
    private formBuilder: FormBuilder
  ) {
    this.expenseForm = this.formBuilder.group({
      amount: [0, [Validators.required]],
      description: ["", [Validators.required]],
      category_id: [""]
    })
  }

  ngOnInit() {
    this.expenseService.getCategories()
      .subscribe((expense_category: expense_category[]) =>
        this.expenseCatgoryList = expense_category);
  }

  submitExpenseDetails(): void {
    this.transaction = this.expenseForm.value;
    this.transaction.transaction_type = "ex"; //ex -- Expense
    this.transaction.balance = this.transaction.amount; 
    let catArr : string[] = this.transaction.category_id.split("###");
    this.transaction.category_id = catArr[0];
    this.transaction.category_name = catArr[1];
    this.expenseService.saveExpenseDetails(this.transaction).subscribe((data:ArrayBuffer) => {
      this.isSuccess = true;
    });
  }
}
