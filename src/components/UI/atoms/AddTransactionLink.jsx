import { useState } from 'react'
import TransactionForm from '../molecules/TransactionForm'
import PlusSVG from '../../../assets/icons/plus.svg'

function AddTransactionLink() {
  const [newTransaction, setNewTransaction] = useState(false);

  return (
    <>
      <div className="w-full h-16 my-4 flex items-center justify-center">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            setNewTransaction(true)
          }}
          className="w-5/6 h-12 my-4 rounded-md text-lime-600 flex items-center justify-center text-1xl shadow-md"
        >
          <span>Add Transaction&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <img src={PlusSVG} alt="+" width={24} height={24} />
        </a>
      </div>
      {newTransaction && (
        <TransactionForm onCancel={() => setNewTransaction(false)} />
      )}
    </>
  );
}

export default AddTransactionLink;
