import React from 'react';
import ApolloClient, {gql} from 'apollo-boost';

const client = new ApolloClient({
  uri: 'http://graphql-base.herokuapp.com/graphql'
})

const GET_POST = gql`
 query getpost($id: ID!){
    post(id:$id){
      id
      title
      description
      author{
        name
        posts(first: 2){
          nodes{
            title
            description
          }
        }
      }
    }
  }`

const LOGIN = gql`
  mutation login($username: String!, $password: String!){
    signInUser(input:{credentials:{
      username: $username,
        password: $password
    }})
    {
      user{
        name
      }
      token
    }
  }`
const onFetchData = () => {
  client.query({
    query: GET_POST,
    variables:{
      id: '1'
    }
  }).then(result => {
    console.log(result);
  })
}


const onClickGetPost = event => {
  event.preventDefault();
  onFetchData();
}

const login = event => {
  event.preventDefault();
  client.mutate({
    mutation: LOGIN,
    variables:{
      username: "Admin",
      password: "123456"
    }
  }).then(result => {
    console.log(result);
  })
}



const ApolloClientGraphQL = () => {
  return (
          <div>
        {/* <input id='input' type='text' value={input} onChange={this.onChangeinput} /> */}
          <button id='btnGetPost' onClick={onClickGetPost}>GET POST</button> <br/>
          <button id='btnLogin' onClick={login}>LOGIN</button>
      </div>
  )
}

export default ApolloClientGraphQL
