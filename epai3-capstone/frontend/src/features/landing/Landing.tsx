import "twin.macro"
import ModalLogin from "./components/ModalLogin"

const Landing = () => {
  return (
    <div tw="flex flex-col items-center justify-around h-screen w-full">
      <div tw="flex flex-col items-center justify-around">
        <h1 tw="text-4xl m-5"> openform </h1>
        <h2 tw="text-base"> A delightful form experience. </h2>
        <div tw="flex flex-row m-5">
          <ModalLogin />
        </div>
      </div>
    </div>
  )
}

export default Landing
