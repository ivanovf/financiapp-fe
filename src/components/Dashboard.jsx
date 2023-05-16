import DonutChart from 'react-svg-donut-chart'
import PlatformsSlide from './PlatformsSlide'
import Transactions from './Transactions'
import AddTransactionLink from './UI/atoms/AddTransactionLink'
import Header from './Header'
import Footer from './Footer'
import { useContext, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import TransactionItem from './UI/molecules/TransactionItem'
import TransactionForm from './UI/molecules/TransactionForm'
import PopUp from './UI/organisms/PopUp'
import DonutBox from './UI/atoms/DonutBox'

const currencyFormat = {
  USD: {
    local:  'en-US',
    format: { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }
  },
  COP: {
    local:  'es-CO',
    format: { style: 'currency', currency: 'COP', minimumFractionDigits: 2 }
  } 
}


function Dashboard() {
  const {transactions, setTransactions, trm} = useContext(AuthContext)
  const [editTransaction, setEditTransaction] = useState(null)
  let compenentToRender = null

  if(editTransaction) {
    compenentToRender = <TransactionForm
      transaction={editTransaction}
      onCancel={() => setEditTransaction(null)}
      onSave={
        (transaction) => {
          const transactionsUpdated = transactions.map(t => t.id === transaction.id ? transaction : t)
          setTransactions(transactionsUpdated)
          setEditTransaction(null)
        }
      }
    />
  }

  return (
    <>
      <Header />
      <section className="p-2 bg-slate-50">
        <DonutBox transactions={transactions} trm={trm}/>
        <Transactions currencyFormat={currencyFormat}>
          {transactions.map(transaction => (
              <TransactionItem 
                transaction={transaction}
                key={transaction.id}
                currencyFormat={currencyFormat}
                setEditTransaction={setEditTransaction}
              />
            )
          )}
        </Transactions>
        {compenentToRender && <PopUp 
          render={compenentToRender} 
        />}
        <AddTransactionLink />
        <PlatformsSlide />
        <div className='h-14 w-full'></div>
      </section>
      <Footer />
    </>
  )
}

export default Dashboard;
