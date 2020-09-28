import React, { Component } from 'react';
import axios from 'axios';
import Post from './Post';
import User from './User';
import Login from './Login';

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

const GET_POST = `
query getPost($idPost:ID!, $first: Int, $endCursor: String)
{
  post(id:$idPost){
    id
    title
    description
    author{
      name
      posts(first: $first, after: $endCursor){
        nodes{
          id
          title
          description
        }
        pageInfo{
          endCursor
          hasNextPage
        }
      }
    }
  }
}`

const resolveQuery = (result) => state => {
  const { data, errors } = result.data;
  // console.log(data.post.author.posts.pageInfo.endCursor)
  if (!data || !state.data) {
    return { data, errors };
  }
  // console.log(state.data.post.author.posts.nodes)
  const { nodes: oldPosts } = state.data.post.author.posts;
  const { nodes: newPosts } = data.post.author.posts;
  const updatePosts = [...oldPosts, ...newPosts];
  // console.log(updatePosts)

  return {
    data: {
      post: {
        ...data.post,
        author: {
          ...data.post.author,
          posts: {
            nodes: updatePosts,
            pageInfo: {
              ...data.post.author.posts.pageInfo,
            }
          }
        }
      }
    },
    errors,
  };
  // console.log(data);
  // return { data, errors };
};

const LOGIN = `
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
    username: null,
    password: null
  }

  componentDidMount() {
    //fetch data
    // this.onFetchData(this.state.input);
  }

  onFetchData = (input, endCursor = null) => {
    const [idPost, firstInput] = input.split('/');
    let first = parseInt(firstInput);
    // console.log(GET_POST(input));
    axiosGraphQL
      // .post('', { query: GET_POST(idPost, first) })
      .post('',
        {
          query: GET_POST,
          variables: { idPost, first, endCursor }
        })
      .then(result => {
        this.setState(resolveQuery(result))
        // console.log(result.data);
        // this.setState(() => ({
        //   data: result.data.data,
        //   errors: result.data.errors,
        // }))
        // console.log(this.state.post)
      });
  };

  onChangeinput = event => {
    event.preventDefault();
    this.setState({ input: event.target.value });
  }

  onClickGetPost = event => {
    event.preventDefault();
    this.onFetchData(this.state.input);
  }

  onClickLoadMorePost = event => {
    event.preventDefault();
    this.onFetchData(this.state.input, this.state.data.post.author.posts.pageInfo.endCursor);

  }

  onClickLogin = event => {
    event.preventDefault();
    console.log(this.state.username + "  " + this.state.password)
    const {username, password} = this.state
    axiosGraphQL
      .post('', 
      { query: LOGIN,
      variables:{username, password} })
      .then(result => {
        console.log(result.data.data);
        this.setState(() => ({
          data: result.data.data.signInUser,
          errors: result.data.errors,
        }))
      })
  }

  onChangeUsername = event => {
    event.preventDefault();
    this.setState({ username: event.target.value });
  }

  onChangePassword = event => {
    event.preventDefault();
    this.setState({ password: event.target.value });
  }

  render() {
    const { input, data, errors } = this.state;
    // const {username, password} = this.state;
    return (
      <div>
        {/* <div>{data && <p> {data.token} </p>}</div> */}
        <div>
          {
            data?
              <label>token: {data.token}</label> :
              errors ?
                (<p>
                  <strong>Something went wrong: </strong>
                  {errors.map(error => error.message).join(' ')}
                </p>) :
                (<p>No information yet</p>)
          }
        </div>
        <Login onChangeUsername={this.onChangeUsername} onChangePassword={this.onChangePassword} onClickLogin={this.onClickLogin} />
      </div>
      // <div>
      //   <input id='input' type='text' value={input} onChange={this.onChangeinput} />
      //     <button id='btnGetPost' onClick={this.onClickGetPost}>GET</button>
      //     {
      //       data.post ? 
      //       (
      //         <>
      //         <Post post={data.post}/>
      //         <User author={data.post.author} onClickLoadMorePost={this.onClickLoadMorePost}/>
      //         </>
      //       ) : 
      //       errors? 
      //       (<p>
      //         <strong>Something went wrong: </strong>
      //         {errors.map(error => error.message).join(' ')}
      //       </p>) : 
      //       (<p>No information yet</p>)
      //     }
      // </div>
    );
  }
}
