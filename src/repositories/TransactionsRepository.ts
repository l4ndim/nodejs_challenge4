import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: "income" | "outcome";
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions.reduce((acc,transaction) => {
      if(transaction.type === "income"){
        return acc + transaction.value
      }
      return acc;
    }, 0);

    const outcome = this.transactions.reduce((acc,transaction) => {
      if(transaction.type === "outcome"){
        return acc + transaction.value
      }
      return acc;
    }, 0);

    return {income, outcome, total: income - outcome};
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({title, value, type});

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
