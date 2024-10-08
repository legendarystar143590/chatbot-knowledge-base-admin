import { ChangeEvent, useState } from "react"
import { useDispatch } from "react-redux"
import { FaceSmileIcon } from "@heroicons/react/24/outline"
import InputText from '../../../components/Input/InputText'
import { showNotification } from "../../common/headerSlice"
import { AppDispatch } from "../../../app/store"
import { addNewAssistant, testPinecone, testSQLDatabase, updateAssistant } from "../assistantsSlice"

const INITIAL_ASSISTANT_OBJ = {
  id: "",
  assistant_name: "",
  prompt: "",
  use_sql: false,
  sql_host: "",
  sql_db_name: "",
  sql_port: "",
  sql_username: "",
  sql_password: "",
  use_pinecone: false,
  pinecone_index_name: "",
  pinecone_environment: "",
  pinecone_api_key: "",
  use_serp: false,
  facebook_enable: false,
  instagram_enable: false,
  image_enable: false,
  weather_api: false,
  user_avatar: "",
  assistant_avatar: "",
}

type PropTypes = {
  closeModal: () => void,
  extraObject?: {
    id?: string
    assistant_name: string,
    prompt: string,
    use_sql: boolean,
    sql_host: string,
    sql_db_name: string,
    sql_port: string,
    sql_username: string,
    sql_password: string,
    use_pinecone: boolean,
    pinecone_index_name: string,
    pinecone_environment: string,
    pinecone_api_key: string,
    use_serp: boolean,
    facebook_enable: boolean,
    instagram_enable: boolean,
    image_enable: boolean,
    weather_api: boolean,
    user_avatar: string,
    assistant_avatar: string,
  }
}

function AddAssistantModalBody({ closeModal, extraObject }: PropTypes) {
  const dispatch: AppDispatch = useDispatch()
  // const [loading, setLoading] = useState(false)

  const isNew = extraObject ? false : true

  const [assistant, setAssistant] = useState(extraObject ? extraObject : INITIAL_ASSISTANT_OBJ)

  const handleSaveAssistant = () => {
    if (assistant.assistant_name.trim() === "") return dispatch(showNotification({ message: "Assistant Name Required!", status: 0 }))
    if (assistant.prompt.trim() === "") return dispatch(showNotification({ message: "Assistant Prompt Required!", status: 0 }))

    if (assistant.use_sql) {
      if (assistant.sql_host.trim() === "") return dispatch(showNotification({ message: "Database Host Required!", status: 0 }))
      if (assistant.sql_port.trim() === "") return dispatch(showNotification({ message: "Database Port Required!", status: 0 }))
      if (assistant.sql_db_name.trim() === "") return dispatch(showNotification({ message: "Database Name Required!", status: 0 }))
      if (assistant.sql_username.trim() === "") return dispatch(showNotification({ message: "Database Username Required!", status: 0 }))
    }

    if (assistant.use_pinecone) {
      if (assistant.pinecone_environment.trim() === "") return dispatch(showNotification({ message: "Pinecone Environment Required!", status: 0 }))
      if (assistant.pinecone_index_name.trim() === "") return dispatch(showNotification({ message: "Pincone Index Name Required!", status: 0 }))
      if (assistant.pinecone_api_key.trim() === "") return dispatch(showNotification({ message: "Pinecone API Key Required!", status: 0 }))
    }

    if (assistant.use_sql) {
      dispatch(testSQLDatabase(assistant))
        .then(res => {
          if (!res.payload || res.payload.result !== true) {
            setAssistant({ ...assistant, use_sql: false })
            return dispatch(showNotification({ message: "SQL Database Connection Fail!", status: 0 }))
          }
          saveNewAssistant();
        })
        .catch(err => {
          console.log(err)
          setAssistant({ ...assistant, use_sql: false })
          return dispatch(showNotification({ message: "SQL Database Connection Fail!", status: 0 }))
        })
    }

    else if (assistant.use_pinecone) {
      dispatch(testPinecone(assistant))
        .then(res => {
          if (!res.payload || res.payload.result !== true) {
            setAssistant({ ...assistant, use_pinecone: false })
            return dispatch(showNotification({ message: "Pinecone Connection Fail!", status: 0 }))
          }
          saveNewAssistant();
        })
        .catch(err => {
          console.log(err)
          setAssistant({ ...assistant, use_pinecone: false })
          return dispatch(showNotification({ message: "Pinecone Connection Fail!", status: 0 }))
        })
    }

    else {
      saveNewAssistant();
    }
  }

  const saveNewAssistant = () => {
    if (isNew) {
      dispatch(addNewAssistant(assistant))
        .then(res => {
          if (res.payload?.id)
            dispatch(showNotification({ message: "New Assistant Added!", status: 1 }))
          else dispatch(showNotification({ message: "Fail! Duplicated Assistant Name", status: 0 }))
        })
        .catch(err => {
          console.log(err)
          dispatch(showNotification({ message: "Fail!", status: 0 }))
        })
    } else {
      dispatch(updateAssistant(assistant))
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

  const updateFormValue = (updateType: string, value: string | boolean) => {
    setAssistant({ ...assistant, [updateType]: value })
  }

  const handleUpload = (e: ChangeEvent<HTMLInputElement>, type: string) => {
    if (e.target?.files) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);

      reader.onloadend = function () {
        if (type === 'assistant_avatar')
          setAssistant({ ...assistant, assistant_avatar: reader.result as string });
        if (type === 'user_avatar')
          setAssistant({ ...assistant, user_avatar: reader.result as string });
      }
    }
  }

  return (
    <>
      <div className="overflow-y-auto max-h-[65vh] p-1">
        <InputText type="text" defaultValue={assistant.assistant_name} updateType="assistant_name" containerStyle="mt-4" labelTitle="Name" updateFormValue={updateFormValue} />

        <div className="form-control w-full mt-4 flex flex-row justify-center gap-20">
          <div>
            <label className="label">
              <span className="label-text text-base-content">Assistant Avatar</span>
            </label>
            <label
              htmlFor="assistant_avatar_upload"
              className="bg-transparent hover:opacity-50 text-white font-bold px-0 py-1 rounded cursor-pointer disabled:cursor-not-allowed"
            >
              {
                assistant.assistant_avatar ? <img className="rounded-md w-36 h-36" src={assistant.assistant_avatar} alt="Assistant Avatar" /> : <FaceSmileIcon className="h-36 w-36" />
              }
            </label>
            <input id="assistant_avatar_upload" type="file" className="hidden" accept="image/*" onChange={(e) => handleUpload(e, 'assistant_avatar')} />
          </div>

          <div>
            <label className="label">
              <span className="label-text text-base-content">User Avatar</span>
            </label>
            <label
              htmlFor="user_avatar_upload"
              className="bg-transparent hover:opacity-50 text-white font-bold px-0 py-1 rounded cursor-pointer disabled:cursor-not-allowed"
            >
              {
                assistant.user_avatar ? <img className="rounded-md w-36 h-36" src={assistant.user_avatar} alt="User Avatar" /> : <FaceSmileIcon className="h-36 w-36" />
              }
            </label>
            <input id="user_avatar_upload" type="file" className="hidden" accept="image/*" onChange={(e) => handleUpload(e, 'user_avatar')} />
          </div>
        </div>

        <div className="form-control w-full mt-4">
          <label className="label">
            <span className="label-text text-base-content">Prompt</span>
          </label>
          <textarea className="textarea textarea-bordered min-h-[300px]" value={assistant.prompt} onChange={(e) => updateFormValue('prompt', e.target.value)}></textarea>
        </div>

        <div className="form-control mt-4">
          <label className="label cursor-pointer justify-start gap-2">
            <span className="label-text text-lg">Use Pinecone</span>
            <input type="checkbox" checked={assistant.use_pinecone} className="checkbox checkbox-primary" onChange={() => updateFormValue('use_pinecone', !assistant.use_pinecone)} />
          </label>

          {
            assistant.use_pinecone && (
              <div className="flex flex-col gap-2 px-2">
                <div className="flex gap-2">
                  <InputText type="text" defaultValue={assistant.pinecone_environment} updateType="pinecone_environment" containerStyle="" labelTitle="Environment" updateFormValue={updateFormValue} />
                  <InputText type="text" defaultValue={assistant.pinecone_index_name} updateType="pinecone_index_name" containerStyle="" labelTitle="Index Name" updateFormValue={updateFormValue} />
                </div>
                <InputText type="text" defaultValue={assistant.pinecone_api_key} updateType="pinecone_api_key" containerStyle="" labelTitle="API Key" updateFormValue={updateFormValue} />
              </div>
            )
          }
        </div>

        <div className="form-control mt-4">
          <label className="label cursor-pointer justify-start gap-2">
            <span className="label-text text-lg">Use SQL</span>
            <input type="checkbox" checked={assistant.use_sql} className="checkbox checkbox-primary" onChange={() => updateFormValue('use_sql', !assistant.use_sql)} />
          </label>

          {
            assistant.use_sql && (
              <div className="flex flex-col gap-2 px-2">
                <div className="flex gap-2">
                  <InputText type="text" defaultValue={assistant.sql_host} updateType="sql_host" containerStyle="" labelTitle="Host" updateFormValue={updateFormValue} />
                  <InputText type="text" defaultValue={assistant.sql_port} updateType="sql_port" containerStyle="" labelTitle="Port" updateFormValue={updateFormValue} />
                  <InputText type="text" defaultValue={assistant.sql_db_name} updateType="sql_db_name" containerStyle="" labelTitle="Database Name" updateFormValue={updateFormValue} />
                </div>
                <div className="flex gap-2">
                  <InputText type="text" defaultValue={assistant.sql_username} updateType="sql_username" containerStyle="" labelTitle="Username" updateFormValue={updateFormValue} />
                  <InputText type="password" defaultValue={assistant.sql_password} updateType="sql_password" containerStyle="" labelTitle="Password" updateFormValue={updateFormValue} />
                </div>
              </div>
            )
          }
        </div>

        <div className="form-control mt-4">
          <label className="label cursor-pointer justify-start gap-2">
            <span className="label-text text-lg">Use SERP</span>
            <input type="checkbox" checked={assistant.use_serp} className="checkbox checkbox-primary" onChange={() => updateFormValue('use_serp', !assistant.use_serp)} />
          </label>
        </div>

        <div className="form-control mt-4">
          <label className="label cursor-pointer justify-start gap-2">
            <span className="label-text text-lg">Facebook Enable</span>
            <input type="checkbox" checked={assistant.facebook_enable} className="checkbox checkbox-primary" onChange={() => updateFormValue('facebook_enable', !assistant.facebook_enable)} />
          </label>
        </div>

        <div className="form-control mt-4">
          <label className="label cursor-pointer justify-start gap-2">
            <span className="label-text text-lg">Instagram Enable</span>
            <input type="checkbox" checked={assistant.instagram_enable} className="checkbox checkbox-primary" onChange={() => updateFormValue('instagram_enable', !assistant.instagram_enable)} />
          </label>
        </div>

        <div className="form-control mt-4">
          <label className="label cursor-pointer justify-start gap-2">
            <span className="label-text text-lg">Image Enable</span>
            <input type="checkbox" checked={assistant.image_enable} className="checkbox checkbox-primary" onChange={() => updateFormValue('image_enable', !assistant.image_enable)} />
          </label>
        </div>

        <div className="form-control mt-4">
          <label className="label cursor-pointer justify-start gap-2">
            <span className="label-text text-lg">Weather API</span>
            <input type="checkbox" checked={assistant.weather_api} className="checkbox checkbox-primary" onChange={() => updateFormValue('weather_api', !assistant.weather_api)} />
          </label>
        </div>
      </div>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>Cancel</button>
        <button className="btn btn-primary px-6" onClick={() => handleSaveAssistant()}>Save</button>
      </div>
    </>
  )
}

export default AddAssistantModalBody