import React, { Component } from 'react';
import axios from 'axios';
import Post from './Post';
import User from './User';

const axiosGraphQL = axios.create({
  baseURL: 'http://graphql-base.herokuapp.com/graphql',
})

// const GET_POST = (idPost, first) => `{
//   post(id:${idPost}){
//     id
//     title
//     description
//     author{
//       name
//       posts(first: ${first}){
//         nodes{
//           title
//           description
//         }
//       }
//     }
//   }
// }`

const GET_POST  = `
query getPost($idPost:ID!, $first: Int)
{
  post(id:$idPost){
    id
    title
    description
    author{
      name
      posts(first: $first){
        nodes{
          id
          title
          description
        }
      }
    }
  }
}`


export default class ApiAxios extends Component {
  // constructor(props) {
  //   super(props)

  //   this.state = {
  //     input : '1',
  //     post: null,
  //     errors: null,
  //   }
  //   this.onChangeinput = this.onChangeinput.bind(this);
  // }

  state = {
    input: '1/2',
    data: null,
    errors: null,
  }

  componentDidMount() {
    //fetch data
    this.onFetchData(this.state.input);
  }

  onFetchData = (input) => {
    const [idPost, firstInput] = input.split('/');
    let first = parseInt(firstInput);
    // console.log(GET_POST(input));
    axiosGraphQL
      // .post('', { query: GET_POST(idPost, first) })
      .post('',
      {
        query: GET_POST,
        variables: {idPost, first}
      })
      .then(result => {
        // console.log(result.data);
        this.setState(() => ({
          data: result.data.data,
          errors: result.data.errors,
        }))
        // console.log(this.state.post)
      });
  };

  onChangeinput =  event => {
    event.preventDefault();
     this.setState({ input: event.target.value });
  }

  onClickGetPost = event => {
    event.preventDefault();
    this.onFetchData(this.state.input);
  }


  render() {
    const { input, data, errors } = this.state;
    return (
      <div>
        <input id='input' type='text' value={input} onChange={this.onChangeinput} />
          <button id='btnGetPost' onClick={this.onClickGetPost}>GET</button>
          {
            data ? 
            (
              <>
              <Post post={data.post}/>
              <User author={data.post.author}/>
              </>
            ) : 
            errors? 
            (<p>
              <strong>Something went wrong: </strong>
              {errors.map(error => error.message).join(' ')}
            </p>) : 
            (<p>No information yet</p>)
          }
      </div>
    );
  }
}
