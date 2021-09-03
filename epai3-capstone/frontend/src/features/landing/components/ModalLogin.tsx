import "twin.macro"

import React, { useState } from "react"
import { useHistory } from "react-router-dom"

import { login } from "../landingSlice"
import { useAuthLoginMutation } from "../../api/apiSlice"
import { useAppDispatch } from "./../../../app/hooks"

import LandingButton from "./LandingButton"

const ModalLogin = () => {
  let history = useHistory()
  const dispatch = useAppDispatch()
  const [authLogin, { isLoading }] = useAuthLoginMutation()

  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const attemptLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (username !== "" && password !== "") {
      const credentials = { username, password }

      try {
        const { user, token } = await authLogin(credentials).unwrap()
        dispatch(login({ user, token }))
        history.push("/home")
      } catch (err) {
        console.log(err)
        setErrorMessage(err.data.detail)
      }
    } else {
      setErrorMessage("Username/password cannot be empty.")
    }
  }

  return (
    <div tw="flex flex-col border p-2">
      <h2 tw="text-lg font-semibold">Sign In</h2>
      <form tw="flex flex-col" onSubmit={attemptLogin}>
        <div tw="flex flex-col mb-4">
          <input
            tw="border my-1"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="username"
          />
          <input
            tw="border my-1"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="password"
          />
          <LandingButton type="submit" tw="mt-2">
            log in
          </LandingButton>
          {isLoading ?? <p>loading...</p>}
          <p tw="text-red-500 text-xs">{errorMessage}</p>
        </div>
        <hr />
        <div tw="flex flex-col mt-4">
          <p tw="text-xs italic">New to openform? sign up</p>
        </div>
      </form>
    </div>
  )
}

export default ModalLogin
