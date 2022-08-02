import { gql } from '@apollo/client'

const GET_CATEGORY = gql`
query CATEGORY($id: ID!) {
    category(id: $id) {
      data {
        id
        attributes {
          name
          products {
            data {
              id
              attributes {
                name
                description
                price
                image {
                  data {
                    attributes {
                      width
                      height
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

const GET_CATEGORIES = gql `
query CATEGORIES {
    categories {
      data {
        id
        attributes {
          name
          description
        }
      }
    }
  }
  `

  const GET_PRODUCTS = gql`
  query PRODUCTS {
    products {
      data {
        id
        attributes {
          name
          description
          price
          image {
            data {
              attributes {
                url
                height
                width
              }
            }
          }
        }
      }
    }
  }`

  const GET_PRODUCT = gql`
  query Product($id: ID!) {
    product(id: $id) {
      data {
        id
        attributes {
          name
          description
          price
          image {
            data {
              attributes {
                width
                height
                url
              }
            }
          }
        }
      }
    }
  }`

const SIGNUP = gql`
  mutation($username: String!, $email: String!, $password: String!) {
      register(
        input: { username: $username, email: $email, password: $password }
      ) {
        jwt
        user {
          username
          email
        }
      }
    }
`

const LOGIN = gql`
mutation($identifier: String!, $password: String!) {
    login(
      input: {identifier: $identifier, password: $password }
    ) {
      jwt
      user {
        id
        username
        email
      }
    }
  }
`

const CREATE_CART_LOGOUT = gql`
mutation($products: [ID]) {
  createCart(data: { products: $products }) {
    data {
      id
      attributes {
        products {
          data {
            attributes {
              name
              price
              image {
                data {
                  attributes {
                    width
                    height
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`
const CREATE_CART_LOGIN = gql`
mutation($users_permissions_user: ID!) {
  createCart(data: { users_permissions_user: $users_permissions_user }) {
    data {
      id
      attributes {
        users_permissions_user {
          data {
            id
            attributes {
              username
            }
          }
        }
      }
    }
  }
}`

export { GET_CATEGORY, GET_CATEGORIES, GET_PRODUCTS, GET_PRODUCT, SIGNUP, LOGIN, CREATE_CART_LOGOUT, CREATE_CART_LOGIN }


