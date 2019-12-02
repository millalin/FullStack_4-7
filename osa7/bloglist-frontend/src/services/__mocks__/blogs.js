import { jsxEmptyExpression } from "@babel/types"

const blogs = [
    {
      id: '5a451df7571c224a31b5c8ce',
      title: 'otsikko',
      author: 'milla',
      url: 'url',
      likes: 2,
      user: {
        _id: '5a437a9e514ab7f168ddf138',
        username: 'milla',
        name: 'Milla'
      }
    },
    {
        id: '5a451df7571c224a31b53245',
        title: 'Jee jee',
        author: 'keijo',
        url: 'www',
        likes: 4,
        user: {
          _id: '5a437a9e514ab7f168ddf123',
          username: 'kalle',
          name: 'Kalle'
        }
    },
    {
        id: '5a451df7571c224a31b549t7',
        title: 'Päivä se on tämäkin',
        author: 'milla',
        url: 'www.fi',
        likes: 14,
        user: {
          _id: '5a437a9e514ab7f168ddf138',
          username: 'milla',
          name: 'Milla'
        }
    }
  ]
  
  const getAll = () => {
    return Promise.resolve(blogs)
  }

  const setToken = token => {
      jest.fn()
  }
  
  export default { getAll, setToken }