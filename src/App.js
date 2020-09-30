import React, { Component } from 'react';
import './App.css';
import ApiAxios from './ApiAxios';
import ApolloClientGraphQL from './ApolloClientGraphQL';

const TITLE = 'React with GraphQL';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/* <h1>{TITLE}</h1> */}
          {/* <ApiAxios/> */}
          <ApolloClientGraphQL/>
        </header>
      </div>
    );
  }
}

