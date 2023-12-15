import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../../app/store"
import { updatePrompt } from "../../assistants/assistantsSlice"
import { showNotification } from "../../common/headerSlice"

type PropTypes = {
  assistant_id: string
}

function Prompt({ assistant_id }: PropTypes) {
  const { assistants } = useSelector((state: RootState) => state.assistant)
  const dispatch: AppDispatch = useDispatch()

  const [prompt, setPrompt] = useState('')

  useEffect(() => {
    const selectedAssistance = assistants.filter(one => one.id.toString() === assistant_id)[0]

    if (selectedAssistance)
      setPrompt(selectedAssistance.prompt)
  }, [assistant_id])

  const handleSave = () => {
    let newAssistant = {
      id: assistant_id,
      prompt: prompt
    }

    dispatch(updatePrompt(newAssistant))
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

  return (
    <div className="form-control w-full mt-4 gap-8 items-end">
      <textarea className="textarea textarea-bordered min-h-[250px] w-full" value={prompt} onChange={(e) => setPrompt(e.target.value)}></textarea>
      <button className="btn btn-primary w-fit" disabled={assistant_id === '-1'} onClick={() => handleSave()}>Save</button>
    </div>
  )
}

export default Prompt