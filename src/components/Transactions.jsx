import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { PropTypes } from 'prop-types'

function Transactions({currencyFormat, children}) {
  const { transactions, loading, trm } = useContext(AuthContext)
  const [totalPurshed, setTotalPurshed] = useState(0)
  const [totalToday, setTotalToday] = useState(0)

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
            <span className='text-xs italic text-right'>Purchased: </span> 
            {totalPurshed.toLocaleString('es-CO', currencyFormat.COP.format)}
            <span className={`text-md text-${totalPorcentage < 0 ? 'red' : 'green'}-500`}>  ({totalPorcentage}%)</span>
          </p>
        </div>
      </div>
      {loading && <p>Loading...</p>}
      <h2 className='text-2xl font-bold text-gray-800 p-2'>Assets</h2>
      <table className="mx-auto">
        <tbody>
          {children}
        </tbody>
      </table>
    </>
  )
}

Transactions.propTypes = {
  currencyFormat: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
}

export default Transactions