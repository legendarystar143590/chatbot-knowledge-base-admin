import { lazy } from 'react'

const Dashboard = lazy(() => import('../pages/protected/Dashboard'))
const KnowledgeBase = lazy(() => import('../pages/protected/KnowledgeBase'))

const routes = [
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  },
  {
    path: '/knowledge-base', // the url
    component: KnowledgeBase, // view rendered
  },
]

export default routes