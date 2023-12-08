import { useState } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../../components/Input/InputText'
import ErrorText from '../../../components/Typography/ErrorText'
import { showNotification } from "../../common/headerSlice"
import { addNewCloserPrompt } from "../closerPromptsSlice"
import { AppDispatch } from "../../../app/store"

const INITIAL_CLOSER_PROMPT_OBJ = {
  id: "",
  prompt: ""
}

type PropTypes = {
  closeModal: () => void,
  extraObject?: {
    id: string,
    title: string,
    prompt: string
  }
}

function AddCloserPromptModalBody({ closeModal, extraObject }: PropTypes) {
  const dispatch: AppDispatch = useDispatch()
  // const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [promptObj, setPromptObj] = useState(extraObject ? extraObject : INITIAL_CLOSER_PROMPT_OBJ)

  const saveNewPrompt = () => {
    if (promptObj.prompt.trim() === "") return setErrorMessage("Prompt is required!")
    else {
      let newPrompt = {
        id: promptObj.id,
        prompt: promptObj.prompt,
      }
      dispatch(addNewCloserPrompt(newPrompt))
        .then(res => {
          console.log(res)
          dispatch(showNotification({ message: "New Prompt Added!", status: 1 }))
        })
        .catch(err => console.log(err))
      closeModal()
    }
  }

  const updateFormValue = (updateType: string, value: string) => {
    setErrorMessage("")
    setPromptObj({ ...promptObj, [updateType]: value })
  }

  return (
    <>
      <InputText type="text" defaultValue={promptObj.prompt} updateType="prompt" containerStyle="mt-4" labelTitle="Prompt" updateFormValue={updateFormValue} />

      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
        <button className="btn btn-primary px-6" onClick={() => saveNewPrompt()}>Save</button>
      </div>
    </>
  )
}

export default AddCloserPromptModalBody