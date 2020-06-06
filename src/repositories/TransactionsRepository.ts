import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
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
    const balanceArray: Balance[] = this.transactions.map(item => {
      if (item.type === 'income') {
        return {
          income: item.value,
          outcome: 0,
          total: 0,
        };
      }

      if (item.type === 'outcome') {
        return {
          income: 0,
          outcome: item.value,
          total: 0,
        };
      }

      return {
        income: 0,
        outcome: 0,
        total: 0,
      };
    });

    const balance = balanceArray.reduce(
      (prev, curr) => {
        const income = prev.income + curr.income;
        const outcome = prev.outcome + curr.outcome;
        return {
          income,
          outcome,
          total: income - outcome,
        };
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
