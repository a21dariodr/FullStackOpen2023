import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      author
      id
    }
  }
`

export const ADD_BOOK = gql`
  mutation add_book(
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      title
    }
  }
`

export const UPDATE_AUTHOR_BIRTHDATE = gql`
  mutation update_author_birthdate(
    $name: String!
    $birthdate: Int!
  ) {
    editAuthor (
      name: $name
      setBornTo: $birthdate
    ) {
      name
      id
    }
  }
`