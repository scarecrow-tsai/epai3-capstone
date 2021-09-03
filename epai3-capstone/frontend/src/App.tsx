import React from "react"
import {
  BrowserRouter,
  Switch,
  Route,
  RouteProps,
  Redirect,
} from "react-router-dom"

import { useAppSelector } from "./app/hooks"
import { selectAuthUser } from "./features/landing/landingSlice"

import Home from "./features/home/Home"
import Form from "./features/form/Form"
import FormPublished from "./features/form/FormPublished"
import Landing from "./features/landing/Landing"

type ProtectedRouteProps = {
  user: string | null
} & RouteProps

const ProtectedRoute = ({ user, ...routeProps }: ProtectedRouteProps) => {
  if (user !== null) {
    return <Route {...routeProps} />
  } else {
    return <Redirect to="/" />
  }
}

const App: React.FC = () => {
  const authUser = useAppSelector(selectAuthUser)

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <ProtectedRoute user={authUser} path="/home">
            <Home />
          </ProtectedRoute>
          <ProtectedRoute user={authUser} path="/form/new">
            <Form />
          </ProtectedRoute>
          <Route path="/form/published">
            <FormPublished />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
