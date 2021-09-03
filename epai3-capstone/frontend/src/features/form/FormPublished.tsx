import "twin.macro"
import { useAppSelector } from "../../app/hooks"

import { selectQuestions } from "./formSlice"

const FormPublished = () => {
  const questions = useAppSelector(selectQuestions)

  return (
    <div tw="flex flex-col h-screen w-full items-center">
      <p>Pulished form</p>
      <ul tw="flex flex-col">
        {questions.map((q, idx) => (
          // <li key={idx}>{q}</li>
          <input key={idx} tw="border m-1" placeholder={q} />
        ))}
      </ul>
      <button tw="border my-2"> submit </button>
    </div>
  )
}

export default FormPublished
