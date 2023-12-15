import { useState } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../../components/Input/InputText'
import ErrorText from '../../../components/Typography/ErrorText'
import { showNotification } from "../../common/headerSlice"
import { AppDispatch } from "../../../app/store"
import { addNewAssistant, updateAssistant } from "../assistantsSlice"

const INITIAL_ASSISTANT_OBJ = {
  id: "",
  assistant_name: "",
  prompt: "",
  use_sql: false
}

type PropTypes = {
  closeModal: () => void,
  extraObject?: {
    id?: string
    assistant_name: string,
    prompt: string,
    use_sql: false
  }
}

function AddAssistantModalBody({ closeModal, extraObject }: PropTypes) {
  const dispatch: AppDispatch = useDispatch()
  // const [loading, setLoading] = useState(false)

  const isNew = extraObject ? false : true

  const [errorMessage, setErrorMessage] = useState("")
  const [assistant, setAssistant] = useState(extraObject ? extraObject : INITIAL_ASSISTANT_OBJ)

  const saveNewAssistant = () => {
    if (assistant.assistant_name.trim() === "") return setErrorMessage("Assistant Name required!")
    else if (assistant.prompt.trim() === "") return setErrorMessage("Assistant Prompt required!")
    else {
      let newAssistant = {
        id: assistant.id,
        assistant_name: assistant.assistant_name,
        prompt: assistant.prompt,
        use_sql: assistant.use_sql
      }

      if (isNew) {
        dispatch(addNewAssistant(newAssistant))
          .then(res => {
            if (res.payload?.id)
              dispatch(showNotification({ message: "New Assistant Added!", status: 1 }))
            else dispatch(showNotification({ message: "Fail!", status: 0 }))
          })
          .catch(err => {
            console.log(err)
            dispatch(showNotification({ message: "Fail!", status: 0 }))
          })
      } else {
        dispatch(updateAssistant(newAssistant))
          .then(res => {
            if (res.payload)
              dispatch(showNotification({ message: "Assistant Updated!", status: 1 }))
            else dispatch(showNotification({ message: "Fail!", status: 0 }))
          })
          .catch(err => {
            console.log(err)
            dispatch(showNotification({ message: "Fail!", status: 0 }))
          })
      }

      closeModal()
    }
  }

  const updateFormValue = (updateType: string, value: string | boolean) => {
    setErrorMessage("")
    setAssistant({ ...assistant, [updateType]: value })
  }

  return (
    <>
      <InputText type="text" defaultValue={assistant.assistant_name} updateType="assistant_name" containerStyle="mt-4" labelTitle="Name" updateFormValue={updateFormValue} />

      <div className="form-control w-full mt-4">
        <label className="label">
          <span className="label-text text-base-content">Prompt</span>
        </label>
        <textarea className="textarea textarea-bordered min-h-[300px]" value={assistant.prompt} onChange={(e) => updateFormValue('prompt', e.target.value)}></textarea>
      </div>

      <div className="form-control mt-4">
        <label className="label cursor-pointer justify-start gap-2">
          <span className="label-text text-lg">Use SQL</span>
          <input type="checkbox" checked={assistant.use_sql} className="checkbox checkbox-primary" onChange={() => updateFormValue('use_sql', !assistant.use_sql)} />
        </label>
      </div>

      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
        <button className="btn btn-primary px-6" onClick={() => saveNewAssistant()}>Save</button>
      </div>
    </>
  )
}

export default AddAssistantModalBody