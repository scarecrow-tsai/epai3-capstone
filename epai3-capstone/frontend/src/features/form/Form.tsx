import "twin.macro"
import { useHistory } from "react-router-dom"
import { useState } from "react"
import { useAppDispatch } from "../../app/hooks"

import { publishForm } from "./formSlice"

const Form = () => {
  let history = useHistory()
  const dispatch = useAppDispatch()
  const [formState, setFormState] = useState<string[]>([""])

  const handleAddQuestion = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    console.log(formState)
    setFormState([...formState, ""])
  }

  const handleUpdateQuestion = (
    idx: number,
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const questions = [...formState]
    questions[idx] = event.target.value
    setFormState(questions)
  }

  const handlePublishForm = () => {
    const questions = [...formState]
    dispatch(publishForm({ questions }))
    history.push("/form/published")
  }

  return (
    <div tw="flex flex-col h-screen w-full items-center">
      <h1 tw="text-2xl">Create new form</h1>
      <form tw="flex flex-col" onSubmit={handlePublishForm}>
        {formState.map((field, idx) => (
          <input
            key={idx}
            tw="border my-1"
            value={field}
            onChange={event => handleUpdateQuestion(idx, event)}
          />
        ))}
        <div>
          <button tw="border" onClick={event => handleAddQuestion(event)}>
            add question
          </button>
        </div>
        <div tw="flex flex-row justify-around my-2">
          <button tw="mx-2 border" onClick={() => history.goBack()}>
            cancel
          </button>
          <button tw="border" type="submit">
            publish
          </button>
        </div>
      </form>
    </div>
  )
}

export default Form
