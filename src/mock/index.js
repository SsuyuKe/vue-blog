import Mock from "mockjs";
import posts from './data/posts.json'
import hotPosts from './data/hotPost.json'

Mock.mock('/mock/posts', {
  code: 200,
  data: posts
})
Mock.mock('/mock/hot-posts', {
  code: 200,
  data: hotPosts
})