import { useContext, useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import FieldInput from "./UI/atoms/FieldInput";
import { useMutation } from "@apollo/client";
import FieldSelectBox from "./UI/atoms/FieldSelectBox";
import { AuthContext } from "../contexts/AuthContext";
import { ADD_TRANSACTION, EDIT_TRANSACTION } from "../data/graphql.api";

function TransactionForm({ transaction, onCancel }) {
  const [name, setName] = useState("");
  const [value, setValue] = useState(0);
  const [cod, setCod] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [quantity, setQuantity] = useState(0);
  const [owner, setOwner] = useState("Sandra");
  const [box, setBox] = useState("SAFETY");
  const [platform, setPlatform] = useState(null);

  const{ platforms, loading } = useContext(AuthContext);

  useEffect(() => {

    if (transaction) {
      setName(transaction.name);
      setValue(transaction.value);
      setCod(transaction.cod);
      setCurrency(transaction.currency);
      setQuantity(transaction.quantity);
      setOwner(transaction.owner);
      setBox(transaction.box);
      setPlatform(transaction.platformId);
    }
  }, [transaction]);

  let op = null,
      variables = {}

  if (transaction) {
    op = EDIT_TRANSACTION
    variables = {
      variables: {
        id: transaction.id,
        updateInput: {
          name,
          value: parseFloat(value),
          currency,
          cod,
          quantity: parseFloat(quantity),
          platformId: platform,
          owner,
          box,
        }
      }
    }
  }
  else {
    op = ADD_TRANSACTION;
    variables = {
      variables: {
        newInput: {
          name,
          value: parseFloat(value),
          currency,
          cod,
          quantity: parseFloat(quantity),
          platformId: platform,
          owner,
          box,
        }
      }
    }
  }

  const [saveTransaction, { error }] = useMutation(op)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const result = await saveTransaction(variables)
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="z-10 absolute top-0 left-0 w-full h-full bg-white">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white p-4">
        Transaction Form
      </h2>
      <form onSubmit={handleSubmit}>
        <FieldInput
          name="name"
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
        />
        <FieldInput
          name="value"
          label="Value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="number"
        />
        <FieldInput
          name="cod"
          label="Cod"
          value={cod}
          onChange={(e) => setCod(e.target.value)}
          type="text"
        />
        {
        loading ?
          <p>Getting platforms...</p> :
          <FieldSelectBox
            label="Platform"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            options={platforms}
          />
        }
        <FieldSelectBox
          name="currency"
          label="Currency"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          options={[
            { id: 'USD',  name: 'USD' },
            { id: 'COP', name: 'COP' },
          ]}
        />
        <FieldInput
          name="quantity"
          label="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          type="number"
        />
        <FieldSelectBox
          label="Owner"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          options={[
            { id: 'Sandra',  name: 'Sandra' },
            { id: 'Dario', name: 'Dario' },
          ]}
        />
        <FieldSelectBox
          label="Box"
          value={box}
          onChange={(e) => setBox(e.target.value)}
          options={[
            { id: 'RISK',  name: 'Risk' },
            { id: 'SAFETY', name: 'Safety' },
          ]}
        />

        <div className="mt-4 px-4 align-middle margin-auto">
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Submit
          </button>
          <button
            type="button"
            className="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

TransactionForm.propTypes = {
  transaction: PropTypes.object,
  onCancel: PropTypes.func,
};

export default TransactionForm;