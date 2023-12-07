import { useState } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../../components/Input/InputText'
import ErrorText from '../../../components/Typography/ErrorText'
import { showNotification } from "../../common/headerSlice"
import { addNewPrompt } from "../promptsSlice"

const INITIAL_PROMPT_OBJ = {
  title: "",
  prompt: ""
}

type PropTypes = {
  closeModal: () => void,
  extraObject?: {}
}

function AddPromptModalBody({ closeModal }: PropTypes) {
  const dispatch = useDispatch()
  // const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [leadObj, setLeadObj] = useState(INITIAL_PROMPT_OBJ)


  const saveNewPrompt = () => {
    if (leadObj.title.trim() === "") return setErrorMessage("First Name is required!")
    else if (leadObj.prompt.trim() === "") return setErrorMessage("Email id is required!")
    else {
      let newLeadObj = {
        "id": 7,
        "title": leadObj.title,
        "prompt": leadObj.prompt,
      }
      dispatch(addNewPrompt({ newLeadObj }))
      dispatch(showNotification({ message: "New Prompt Added!", status: 1 }))
      closeModal()
    }
  }

  const updateFormValue = (updateType: string, value: string) => {
    setErrorMessage("")
    setLeadObj({ ...leadObj, [updateType]: value })
  }

  return (
    <>
      <InputText type="text" defaultValue={leadObj.title} updateType="title" containerStyle="mt-4" labelTitle="Title" updateFormValue={updateFormValue} />

      <InputText type="text" defaultValue={leadObj.prompt} updateType="prompt" containerStyle="mt-4" labelTitle="Prompt" updateFormValue={updateFormValue} />

      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
        <button className="btn btn-primary px-6" onClick={() => saveNewPrompt()}>Save</button>
      </div>
    </>
  )
}

export default AddPromptModalBody