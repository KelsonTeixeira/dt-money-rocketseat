import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

interface ITransaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

// interface ITransactionInput {
//   title: string;
//   amount: number;
//   type: string;
//   category: string;
// }
// ou
type ITransactionInput = Omit<ITransaction, 'id' | 'createdAt'>;
// ou
// type ITransactionInput = Pick<ITransaction, 'title' | 'amount' | 'type' | 'category'>;



interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: ITransaction[];
  createTransaction: (trasaction: ITransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>(
  // in this case, there is no solution, so, we trick TS, forcing a type
  {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);

  useEffect(() =>{
    api.get('transaction')
      .then(response => setTransactions(response.data.transactions));
  }, []);

  async function createTransaction(transaction: ITransactionInput) {
    const response = await api.post('transaction', {
      ...transaction,
      createdAt: new Date(),
    });
    setTransactions([
      ...transactions,
      response.data.transaction
    ]);
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  )

}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}