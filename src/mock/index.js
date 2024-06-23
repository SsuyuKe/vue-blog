import Mock from "mockjs";

import token from './data/login.json'

Mock.mock('/mock/login', {
  code: 200,
  data: token
})