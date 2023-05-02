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
  let total = 0
  if (transactions) {
    transactions.forEach(transaction => {
      const valueInCOP = transaction.currency === 'COP' ? transaction.value : transaction.value * trm
      total += valueInCOP
    })
  }
  return (
    <>
      <div className="my-6 mx-4 p-4 rounded-lg bg-gradient-to-r from-green-500 from-40% via-green-600 via-70% to-emerald-500 to-90% ">
        <p  className='text-white text-xs'>TRM: {trm}</p>
        <p className='text-white text-2xl font-bold'>{
          total.toLocaleString('es-CO', currencyFormat.COP.format)
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
                {transaction.cod??transaction.platform.name}
                <br/>{transaction.quantity}
              </td>
              <td className="p-2 w-14">{transaction.name}
                <br/>{transaction.currency}
              </td>
              <td>
                {transaction.value.toLocaleString(
                  currencyFormat[transaction.currency].local,
                  currencyFormat[transaction.currency].format
                )}
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