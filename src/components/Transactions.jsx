import { useState, useContext, useEffect } from 'react'
import TransactionForm from './TransactionForm'
import { AuthContext } from '../contexts/AuthContext'

function Transactions() {
  const { transactions, loading, trm } = useContext(AuthContext)
  const [editTransaction, setEditTransaction] = useState(null)
  const [totalPurshed, setTotalPurshed] = useState(0)
  const [totalToday, setTotalToday] = useState(0)

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

  useEffect(() => {
    // Calculates total assets
    if (transactions) {
      let totalToday = 0,
          totalPurshed = 0,
          valueTodayInCOP = 0,
          valuePurshedInCOP = 0
  
      transactions.forEach(transaction => {

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

      setTotalPurshed(totalPurshed)
      setTotalToday(totalToday)
    }
  }, [transactions, trm])

  const totalPorcentage = ((totalToday - totalPurshed) * 100 / totalPurshed).toFixed(2)

  return (
    <>
      <div className="relative my-6 mx-4 px-4 pt-4 pb-12 rounded-lg bg-gradient-to-r from-green-500 from-40% via-green-600 via-70% to-emerald-500 to-90% ">
        <p  className='text-white text-base mb-2'>TRM: {trm}</p>
        <p className='text-white text-2xl font-bold'>{
          totalToday.toLocaleString('es-CO', currencyFormat.COP.format)
        }</p>
        <div className='absolute -bottom-4 shadow-lg right-6 bg-white rounded-2xl flex items-center justify-end w-4/5 h-14 px-4'>
          <p className='text-lg font-bold'>
            <div className='text-xs italic text-right'>Purchased: </div> 
            {totalPurshed.toLocaleString('es-CO', currencyFormat.COP.format)}
            <span className={`text-md text-${totalPorcentage < 0 ? 'red' : 'green'}-500`}>  ({totalPorcentage}%)</span>
          </p>
        </div>
      </div>
      {loading && <p>Loading...</p>}
      <h2 className='text-2xl font-bold text-gray-800 p-2'>Assets</h2>
      <table className="mx-auto">
        <tbody>
          {transactions && transactions.map(transaction => {
          const porcentage = ((transaction.currentPrice - transaction.value)  * 100 / transaction.value).toFixed(2)
          return (
            <tr
              key={transaction.id}
              className="border-b p-4"
              onClick={() => setEditTransaction(transaction)}
            >
              <td>
                <div className='text-lg'>
                    <strong>
                      {transaction.name}&nbsp;
                    </strong>
                    <span className='text-xs font-bold'>
                    ({transaction.currency})
                  </span> 
                </div>
                <div className='italic text-xs'>
                  {transaction.platform.name}
                </div>
                <div className='text-xs text-gray-500'>
                  Q: {transaction.quantity}
                </div>
              </td>
              <td className='text-right'>
                <div className='text-xs'>
                  <span className='italic'>Purchase price: </span>
                  <span className='font-bold text-gray-500'>
                    {transaction.value.toLocaleString(
                        currencyFormat[transaction.currency].local,
                        currencyFormat[transaction.currency].format
                    )}
                  </span>
                </div>
                <div>
                  <span className='italic'>Today </span>
                  <span className='font-bold'>
                    { 
                      transaction.currentPrice !== transaction.value &&
                      transaction.currentPrice.toLocaleString('es-CO', currencyFormat.COP.format)
                    }
                  </span>
                </div>
                <div className={`text-xs text-${porcentage < 0 ? 'red' : 'green'}-500`}>
                  {porcentage}%
                </div>
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