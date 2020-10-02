import UserList from '../pages/user/list'
import UserCreate from '../pages/user/create'
import MasterList from '../pages/master/list'



export const PrivateRoutes = [
  {
    path: '/user',
    component: UserList
  },
  {
    path: '/user/create',
    component: UserCreate
  },
  {
    path: '/master',
    component: MasterList
  },
]
