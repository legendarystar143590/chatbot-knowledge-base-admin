import { useState } from "react"
import { useDispatch } from "react-redux"
import InputText from '../../../components/Input/InputText'
import ErrorText from '../../../components/Typography/ErrorText'
import { showNotification } from "../../common/headerSlice"
import { addNewKnowledge } from "../knowledgeSlice"

const INITIAL_KNOWLEDGE_OBJ = {
  name: "",
  type: "",
  status: "",
  date: ""
  // prompt: ""
}

type PropTypes = {
  closeModal: () => void,
  extraObject?: {
    message?: string,
    type?: string,
    id?: string
  }
}

function AddKnowledgeModalBody({ closeModal, extraObject }: PropTypes) {
  const dispatch = useDispatch()
  // const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [knowledgeObj, setKnowledgeObj] = useState(INITIAL_KNOWLEDGE_OBJ)
  const knowledgeType = extraObject?.type


  const saveNewKnowledge = () => {
    if (knowledgeObj.name.trim() === "") return setErrorMessage("Incorrect Input!")
    else {
      let newKnowledgeObj = {
        "id": 7,
        "name": knowledgeObj.name,
        "type": knowledgeType,
        "status": "pending",
        "date": "2023-12-07"
      }
      dispatch(addNewKnowledge({ newKnowledgeObj }))
      dispatch(showNotification({ message: "New Knowledge Base Added!", status: 1 }))
      closeModal()
    }
  }

  const updateFormValue = (updateType: string, value: string) => {
    setErrorMessage("")
    setKnowledgeObj({ ...knowledgeObj, [updateType]: value })
  }

  return (
    <>
      {
        knowledgeType === "URL" ? (
          <InputText type="text" defaultValue={knowledgeObj.name} updateType="name" containerStyle="mt-4" labelTitle="URL" updateFormValue={updateFormValue} />
        ) : (
          <InputText type="file" defaultValue={knowledgeObj.name} updateType="name" containerStyle="mt-4" labelTitle="File" updateFormValue={updateFormValue} />
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