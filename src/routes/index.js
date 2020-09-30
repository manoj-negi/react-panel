import UserList from '../pages/user/list'
import UserCreate from '../pages/user/create'


export const PrivateRoutes = [
  {
    path: '/user',
    component: UserList
  },
  {
    path: '/user/create',
    component: UserCreate
  }
]
