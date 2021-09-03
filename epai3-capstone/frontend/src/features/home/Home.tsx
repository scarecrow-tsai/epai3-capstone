import "twin.macro"
import { useHistory } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { logout, selectAuthUser } from "./../landing/landingSlice"

const formData = [
  {
    id: "abc1",
    name: "form1",
    description: "form for office",
    created: "1-9-2021",
    modified: "3-9-2021",
  },
  {
    id: "abc2",
    name: "form2",
    description: "form for school",
    created: "6-8-2021",
    modified: "10-8-2021",
  },
  {
    id: "abc3",
    name: "form3",
    description: "form for party",
    created: "18-7-2021",
    modified: "21-7-2021",
  },
]

interface TypeFormSavedPreview {
  id: string
  name: string
  description: string
  created: string
  modified: string
}

const FormSavedPreview = ({
  id,
  name,
  description,
  created,
  modified,
}: TypeFormSavedPreview) => {
  return (
    <article tw="flex flex-col p-2 border">
      <h1 tw="text-base">{name}</h1>
      <h2 tw="text-xs">{description}</h2>
      {/* <h2>{modified}</h2> */}
    </article>
  )
}

const NavBar = ({ username }: { username: string | null }) => {
  const dispatch = useAppDispatch()
  const attemptLogout = () => {
    dispatch(logout())
  }

  return (
    <nav tw="flex flex-row w-full bg-blue-500 p-2">
      <ul tw="flex flex-1 flex-row justify-between">
        <button tw="text-xs" onClick={attemptLogout}>
          log out
        </button>
        <li tw="text-xs"> {username} </li>
      </ul>
    </nav>
  )
}

const Home = () => {
  let history = useHistory()
  const authUser = useAppSelector(selectAuthUser)

  return (
    <div tw="flex flex-col h-screen w-full">
      <NavBar username={authUser} />
      <div tw="flex flex-1 flex-col p-1">
        <ul tw="grid grid-cols-2 gap-2">
          <button tw="border" onClick={() => history.push("/form/new")}>
            +
          </button>
          {formData.map(form => (
            <li key={form.id}>
              <FormSavedPreview
                id={form.id}
                name={form.name}
                description={form.description}
                created={form.created}
                modified={form.modified}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Home
