import { Component, OnInit } from '@angular/core';
import { income_category } from '../constants/incomeCategory';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { IncomeService } from '../income.service';
import { Transaction } from '../constants/transaction';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss'],
})
export class IncomeComponent implements OnInit {
  incomeCatgoryList: income_category[] = [];
  transaction = {} as Transaction;
  isSuccess = false;

  incomeForm: FormGroup;

  constructor(
    private incomeService: IncomeService,
    private formBuilder: FormBuilder
  ) {
    this.incomeForm = this.formBuilder.group({
      amount: [0, [Validators.required]],
      description: ["", [Validators.required]],
      category_id: [""]
    })
  }

  ngOnInit() {
    this.incomeService.getCategories()
      .subscribe((income_category: income_category[]) =>
        this.incomeCatgoryList = income_category);
  }

  submitIncomeDetails(): void {
    this.transaction = this.incomeForm.value;
    this.transaction.transaction_type = "in"; //in -- income
    this.transaction.balance = this.transaction.amount; //in -- income
    let catArr : string[] = this.transaction.category_id.split("###");
    this.transaction.category_id = catArr[0];
    this.transaction.category_name = catArr[1];
    this.incomeService.saveIncomeDetails(this.transaction).subscribe((data:ArrayBuffer) => {
      this.isSuccess = true;
    });
  }

}
