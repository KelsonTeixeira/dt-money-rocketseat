import Modal from 'react-modal';
import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { GlobalStyle } from './styles/global';
import { NewTransactionModal } from './components/NewTransactionModal';
import { TransactionsProvider } from './hooks/useTransactions';

Modal.setAppElement('#root');

export function App() {
  const [isTransactionsModalOpen, setIsTransactionsModalOpen] = useState(false);

  function handleOpenNewTransactionModal() {
    setIsTransactionsModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsTransactionsModalOpen(false);
  }

  return (
    <TransactionsProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
      <Dashboard />
      <NewTransactionModal 
        isOpen={isTransactionsModalOpen} 
        onRequestClose={handleCloseNewTransactionModal} 
      />
      <GlobalStyle />
    </TransactionsProvider>
  );
}
