import React from 'react'
import{ ApolloProvider, Query } from 'react-apollo'
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';

const httpLink = new HttpLink({
  uri: 'http://graphql-base.herokuapp.com/graphql'
})

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httpLink,
  cache,
})

const GET_POST = gql`
 query getpost{
    post(id:1){
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


const PostList = () => (
  <Query query={GET_POST}>
    {
      ({data}) => {
        if(!data){
          return null;
        }
        const {post} = data;
        return(
          <div>
            {post.title} {post.description}
          </div>
        )
      }
    }
  </Query>
)

const ApolloWithReact = () => {
  return (
    <ApolloProvider client={client}>
      <PostList/>
    </ApolloProvider>
  )
}

export default ApolloWithReact
