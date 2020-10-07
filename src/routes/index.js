import UserList from '../pages/user/list'
import UserCreate from '../pages/user/create'
import MasterList from '../pages/master/list'
import MasterCreate from '../pages/master/create'
import Settings from '../pages/Settings'


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
  {
    path: '/master/create',
    component: MasterCreate
  },
  {
    path: '/settings',
    component: Settings
  },
]
