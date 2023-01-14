// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  INCOME_CATEGORY_URL : "http://127.0.0.1:3000/categories/income",
  EXPENSE_CATEGORY_URL : "http://127.0.0.1:3000/categories/expense",
  INCOME_POST_TRANSACTION_URL : "http://127.0.0.1:3000/transaction/",
  TRANSACTION_LIST_URL : "http://127.0.0.1:3000/transaction/transactionlist"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
