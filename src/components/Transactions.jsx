import { useState, useContext } from 'react'
import TransactionForm from './TransactionForm'
import { AuthContext } from '../contexts/AuthContext'

function Transactions() {
  const { transactions, loading, trm } = useContext(AuthContext)
  const [editTransaction, setEditTransaction] = useState(null)

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

  // Calculates total assets
  let totalToday = 0,
      totalPurshed = 0

  if (transactions) {
    transactions.forEach(transaction => {

      let valueTodayInCOP,
          valuePurshedInCOP = 0

      if (transaction.currency === 'COP') {
        valuePurshedInCOP = transaction.value
        valueTodayInCOP = transaction.value
      }
      else {
        valuePurshedInCOP = transaction.value * trm
        valueTodayInCOP = transaction.currentPrice * trm
      }
      totalPurshed += valuePurshedInCOP
      totalToday += valueTodayInCOP
    })
  }
  return (
    <>
      <div className="my-6 mx-4 p-4 rounded-lg bg-gradient-to-r from-green-500 from-40% via-green-600 via-70% to-emerald-500 to-90% ">
        <p  className='text-white text-xs'>TRM: {trm}</p>
        <p className='text-white text-2xl font-bold'>{
          totalPurshed.toLocaleString('es-CO', currencyFormat.COP.format)
        }</p>
        <p className='text-white text-2xl font-bold'>{
          totalToday.toLocaleString('es-CO', currencyFormat.COP.format)
        }</p>
      </div>
      {loading && <p>Loading...</p>}
      <h2 className='text-2xl font-bold text-gray-800 p-2'>Assets</h2>
      <table className="table-auto w-full">
        <tbody>
          {transactions && transactions.map(transaction => {
          return (
            <tr
              key={transaction.id}
              className="border-b"
              onClick={() => setEditTransaction(transaction)}
            >
              <td>
                {transaction.name}
                <br />
                {transaction.platform.name} Q: {transaction.quantity}
              </td>
              <td>
                {transaction.currency} {transaction.value.toLocaleString(
                  currencyFormat[transaction.currency].local,
                  currencyFormat[transaction.currency].format
                )}
                <br/>
                {transaction.currentPrice.toLocaleString('es-CO', currencyFormat.COP.format)}
                <br/>
                % {
                  ((transaction.currentPrice - transaction.value)  * 100 / transaction.value).toFixed(2)
                  }
              </td>
            </tr>)
          })}
        </tbody>
      </table>
      {editTransaction &&
        <TransactionForm
          transaction={editTransaction}
          setEditTransaction={setEditTransaction}
          onCancel={() => setEditTransaction(null)}
        />}
    </>
  )
}

export default Transactions