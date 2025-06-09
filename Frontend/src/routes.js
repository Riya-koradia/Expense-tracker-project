
import { FactCheckOutlined,  GroupAddOutlined, Insights,  PaymentsOutlined } from "@mui/icons-material"
import SignInController from './pages/signin/SignInController'
import { Navigate } from 'react-router-dom'

import AppContainer from './components/layouts/common/AppContainer'

import PagenotFound from './components/layouts/PagenotFound'

import DashboardListController from './pages/dashboard/DashboardListController'
import ExpenseListController from "./pages/expenses/ExpenseListController"
import CategoryListController from "./pages/Categories/CategoryListController"
import UserListController from "./pages/user/UserListController"


const defineRoutes = (user) => {
  const defaultRedirect = "/dashboard";
  return ([
    {
      path: "sign-in",
      element: !user.isLoggedIn ? <SignInController /> : <Navigate replace to={defaultRedirect} />,
      hideInPannel: true
    },
    {
      path: "",
      element: user.isLoggedIn ? <Navigate replace to={defaultRedirect} /> : <Navigate replace to="/sign-in" />,
      hideInPannel: true
    },
    {
      path: "dashboard",
      icon: <Insights />,
      title: "Dashboard",
      element: user.isLoggedIn ? <AppContainer ><DashboardListController /></AppContainer> : <Navigate replace to="/sign-in" />,
    },
    {
      path: "expenses",
      icon: <PaymentsOutlined />,
      title: "Expenses",
      element: user.isLoggedIn ? <AppContainer ><ExpenseListController /></AppContainer> : <Navigate replace to="/sign-in" />,
    },
    {
      path: "categories",
      icon: <FactCheckOutlined />,
      title: "Categories",
      element: user.isLoggedIn ? <AppContainer ><CategoryListController /></AppContainer> : <Navigate replace to="/sign-in" />,
    },
    {
      path: "users",
      icon: <GroupAddOutlined />,
      title: "Users",
      element: user.isLoggedIn ? <AppContainer ><UserListController /></AppContainer> : <Navigate replace to="/sign-in" />,
    },
   
    {
      path: "*",
      hideInPannel: true,
      element: !user.isLoggedIn ? <Navigate replace to={"/sign-in"} /> : <PagenotFound />,
    },
  ])
}

export default defineRoutes