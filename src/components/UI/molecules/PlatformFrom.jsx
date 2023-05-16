import { useState } from 'react'
import FieldInput from "../atoms/FieldInput"
import { useMutation } from "@apollo/client"
import { ADD_PLATFORM, GET_PLATFORMS } from '../../../data/graphql.api';

export default function PlatformFrom() {

  const [name, setName] = useState("");
  const [addPlatform] = useMutation(ADD_PLATFORM, {
    refetchQueries: [{ query: GET_PLATFORMS }]
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    addPlatform({ variables: { newInput: { name }}})
    setName("")
  }

  return (
    <>
      <h1 className='text-xl font-bold text-gray-900 dark:text-white p-4'>Add Platform</h1>
      <form onSubmit={handleSubmit} className="form">
        <FieldInput name="platform" label="Platform" value={name} onChange={(e) => setName(e.target.value)} />
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          type="submit">
          Submit
        </button>
      </form>
    </>
  )
}
