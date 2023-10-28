/* 
Filename: ComplexCode.js
Content: This code demonstrates a complex, sophisticated implementation of a banking system using JavaScript.
*/

// Define classes for Account, Transaction, and Bank

class Account {
  constructor(accountNumber, accountHolder) {
    this.accountNumber = accountNumber;
    this.accountHolder = accountHolder;
    this.balance = 0;
  }

  deposit(amount) {
    this.balance += amount;
    return this.balance;
  }

  withdraw(amount) {
    if (this.balance >= amount) {
      this.balance -= amount;
      return this.balance;
    } else {
      throw new Error('Insufficient balance');
    }
  }
}

class Transaction {
  constructor(fromAccount, toAccount, amount) {
    this.fromAccount = fromAccount;
    this.toAccount = toAccount;
    this.amount = amount;
    this.timestamp = new Date();
  }
}

class Bank {
  constructor() {
    this.accounts = [];
    this.transactions = [];
  }

  createAccount(accountHolder) {
    const accountNumber = Math.floor(Math.random() * 1000000000) + 1000000000;
    const account = new Account(accountNumber, accountHolder);
    this.accounts.push(account);
    return accountNumber;
  }

  getAccount(accountNumber) {
    return this.accounts.find((account) => account.accountNumber === accountNumber);
  }

  deposit(accountNumber, amount) {
    const account = this.getAccount(accountNumber);
    if (account) {
      account.deposit(amount);
      const transaction = new Transaction(null, accountNumber, amount);
      this.transactions.push(transaction);
      return account.balance;
    } else {
      throw new Error('Invalid account number');
    }
  }

  withdraw(accountNumber, amount) {
    const account = this.getAccount(accountNumber);
    if (account) {
      account.withdraw(amount);
      const transaction = new Transaction(accountNumber, null, amount);
      this.transactions.push(transaction);
      return account.balance;
    } else {
      throw new Error('Invalid account number');
    }
  }

  transfer(fromAccountNumber, toAccountNumber, amount) {
    const fromAccount = this.getAccount(fromAccountNumber);
    const toAccount = this.getAccount(toAccountNumber);
    
    if (fromAccount && toAccount) {
      fromAccount.withdraw(amount);
      toAccount.deposit(amount);
      const transaction = new Transaction(fromAccountNumber, toAccountNumber, amount);
      this.transactions.push(transaction);
      return transaction;
    } else {
      throw new Error('Invalid account number');
    }
  }
}

// Usage example:

const bank = new Bank();

const johnsAccountNumber = bank.createAccount('John Doe');
const marysAccountNumber = bank.createAccount('Mary Smith');

console.log(`John's Account Number: ${johnsAccountNumber}`);
console.log(`Mary's Account Number: ${marysAccountNumber}`);

bank.deposit(johnsAccountNumber, 500);
bank.withdraw(johnsAccountNumber, 200);

console.log(`John's Balance: ${bank.getAccount(johnsAccountNumber).balance}`);
console.log(`Mary's Balance: ${bank.getAccount(marysAccountNumber).balance}`);

bank.transfer(johnsAccountNumber, marysAccountNumber, 100);

console.log(`John's Balance: ${bank.getAccount(johnsAccountNumber).balance}`);
console.log(`Mary's Balance: ${bank.getAccount(marysAccountNumber).balance}`);