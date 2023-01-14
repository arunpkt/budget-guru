export interface Transaction {
    amount : number,
    description : string,
    category_id: string,
    category_name: string,
    transaction_type: string,
    balance : number,
    date: Date,
    expenseSum: number,
    incomeSum: number
}