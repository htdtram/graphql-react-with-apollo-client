import React from 'react'

const User = (props) => {
  return (
    <div>
      <h4>Author: {props.author.name}</h4>
      <div>
        <label>Post of list: </label>
        <ul>
          {
            props.author.posts.nodes && props.author.posts.nodes.map((post, index) => (
              <li key={index}>
                <label>{post.title}</label>
                <p>{post.description}</p>
              </li>
            ))
          }
        </ul>
        {
          props.author.posts.pageInfo.hasNextPage && 
          <button id='btn-load-more' onClick={props.onClickLoadMorePost}>Load More</button>
        }
      </div>
    </div>
  )
}

export default User
