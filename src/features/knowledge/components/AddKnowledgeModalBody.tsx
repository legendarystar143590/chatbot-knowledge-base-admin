import { useState } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../../components/Input/InputText'
import ErrorText from '../../../components/Typography/ErrorText'
import { showNotification } from "../../common/headerSlice"
import { addNewKnowledge, updateKnowledge } from "../knowledgeSlice"
import { AppDispatch } from "../../../app/store"

const INITIAL_KNOWLEDGE_OBJ = {
  name: "",
  type: "",
  status: "",
  date: ""
}

type PropTypes = {
  closeModal: () => void,
  extraObject: {
    id?: string
    name: string,
    type: string,
    status: string,
    assistant_id: string
  }
}

function AddKnowledgeModalBody({ closeModal, extraObject }: PropTypes) {
  const dispatch: AppDispatch = useDispatch()
  // const [loading, setLoading] = useState(false)

  const isNew = extraObject?.id ? false : true

  const [errorMessage, setErrorMessage] = useState("")
  const [knowledge, setKnowledge] = useState(extraObject ? extraObject : INITIAL_KNOWLEDGE_OBJ)

  const saveNewKnowledge = () => {
    if (knowledge.name.trim() === "") return setErrorMessage("Incorrect Input!")
    else {
      let newKnowledge = {
        name: knowledge.name,
        type_of_knowledge: knowledge.type,
        assistant_id: extraObject.assistant_id,
        status: "pending",
      }

      if (isNew) {
        dispatch(addNewKnowledge(newKnowledge))
          .then(res => {
            if (res.payload)
              dispatch(showNotification({ message: "New Knowledge Base Added!", status: 1 }))
            else dispatch(showNotification({ message: "Fail!", status: 0 }))
          })
          .catch(err => {
            console.log(err)
            dispatch(showNotification({ message: "Fail!", status: 0 }))
          })
      } else {
        dispatch(updateKnowledge(newKnowledge))
          .then(res => {
            if (res.payload)
              dispatch(showNotification({ message: "Knowledge Base Updated!", status: 1 }))
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

  const updateFormValue = (updateType: string, value: string) => {
    setErrorMessage("")
    setKnowledge({ ...knowledge, [updateType]: value })
  }

  return (
    <>
      {
        knowledge.type === "URL" ? (
          <InputText type="text" defaultValue={knowledge.name} updateType="name" containerStyle="mt-4" labelTitle="URL" updateFormValue={updateFormValue} />
        ) : (
          <InputText type="file" defaultValue={knowledge.name} updateType="name" containerStyle="mt-4" labelTitle="File" updateFormValue={updateFormValue} />
        )
      }

      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
        <button className="btn btn-primary px-6" onClick={() => saveNewKnowledge()}>Save</button>
      </div>
    </>
  )
}

export default AddKnowledgeModalBody