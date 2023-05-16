import { gql } from '@apollo/client'

export const GET_TRANSACTIONS = gql`
  query transactions {
    transactions {
      id
      name
      cod
      value
      createdAt
      quantity
      currency
      currentPrice
      purchaseTRM
      platformId
      owner
      box
      platform {
        name
      }
    }
  }`

export const GET_PLATFORMS = gql`
  query {
    platforms {
      id
      name
    }
  }`

export const ADD_TRANSACTION = gql`
  mutation CreateTransaction($newInput: NewTransaction!) {
    createTransaction(newInput: $newInput) {
      id
    }
  }`

export const EDIT_TRANSACTION = gql`
  mutation UpdateTransaction($id: ID!, $updateInput: UpdateTransaction!) {
    updateTransaction(id: $id, updateInput: $updateInput) {
      id
    }
  }`

export const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($id: ID!) {
    deleteTransaction(id: $id)
  }`

export const ADD_PLATFORM = gql`
  mutation CreatePlatform($newInput: NewPlatform!) {
    createPlatform(newInput: $newInput) {
      id
    }
  }`

  