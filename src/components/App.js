import React, { Component } from 'react';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import axios from 'axios';
import Post from './Post/Post'

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.createPost = this.createPost.bind(this);
    this.filterPost = this.filterPost.bind(this);
  }

  componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/posts')
      .then(res => this.setState({ posts: res.data }))

  }

  updatePost(id, text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, { text })
      .then(res => this.setState({ posts: res.data }))
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
      .then(res => this.setState({ posts: res.data }))
  }

  createPost(text) {
    axios.post('https://practiceapi.devmountain.com/api/posts', { text })
      .then(res => this.setState({ posts: res.data }))
  }

  filterPost(input) {
    // axios.get('https://practiceapi.devmountain.com/api/posts')
    //   .then(res => this.setState({
    //     posts: res.data.filter((element) => {
    //       element.text.includes(text)
    //     })
    //   }))
    const { posts } = this.state;
    const filterPosts = posts.filter(element => element.text.includes(input))
    const newPostsArray = [...filterPosts]
    this.setState({ posts: newPostsArray })
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent" >
        <Header />

        <section className="App__content">

          <Compose createPostFn={this.createPost} filterPostFn={this.filterPost} />

          {posts.map((element) => <Post key={element.id} date={element.date} text={element.text} updatePostFn={this.updatePost} id={element.id} deletePostFn={this.deletePost} />)
          }

        </section>


      </div >
    );
  }
}

export default App;
