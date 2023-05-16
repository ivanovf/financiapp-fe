import { PropTypes } from 'prop-types'


export default function TransactionItem({transaction, setEditTransaction, currencyFormat}) {
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
}

TransactionItem.propTypes = {
  transaction: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    platform: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
    quantity: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    currentPrice: PropTypes.number,
  }).isRequired,
  setEditTransaction: PropTypes.func.isRequired,
  currencyFormat: PropTypes.object.isRequired,
}

