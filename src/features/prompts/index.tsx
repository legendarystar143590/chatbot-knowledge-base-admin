import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import CloserPrompts from "./components/CloserPrompts"
import PrePrompts from "./components/PrePrompts"
import PushPrompts from "./components/PushPrompts"
import { AppDispatch, RootState } from "../../app/store"
import { getAssistantContent } from "../assistants/assistantsSlice"
import Prompt from "./components/Prompt"

function Prompts() {
  const { assistants } = useSelector((state: RootState) => state.assistant)
  const dispatch: AppDispatch = useDispatch()

  const [selectedAssistance, setSelectedAssistance] = useState("-1")

  useEffect(() => {
    dispatch(getAssistantContent())
  }, [])

  const changeSelectedAssistant = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAssistance(e.target.value)
  }

  return (
    <div className="grid gap-3">
      <select className="select select-primary max-w-xs w-full" value={selectedAssistance} onChange={e => changeSelectedAssistant(e)}>
        <option disabled value='-1'>Choose Assistant</option>
        {
          assistants.map(assistant => assistant.assistant_name && (
            <option className="text-lg p-2 m-2" key={assistant.id} value={assistant.id}>{assistant.assistant_name}</option>
          ))
        }
      </select>

      <div role="tablist" className="tabs tabs-lifted justify-self-start w-full lg:tabs-lg">
        <input type="radio" name="my_tabs" role="tab" className="tab" aria-label="PrePrompts" defaultChecked />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
          <PrePrompts assistant_id={selectedAssistance} />
        </div>

        <input type="radio" name="my_tabs" role="tab" className="tab" aria-label="CloserPrompts" />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
          <CloserPrompts assistant_id={selectedAssistance} />
        </div>

        <input type="radio" name="my_tabs" role="tab" className="tab" aria-label="PushPrompts" />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
          <PushPrompts assistant_id={selectedAssistance} />
        </div>

        <input type="radio" name="my_tabs" role="tab" className="tab" aria-label="Prompt" />
        <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">
          <Prompt assistant_id={selectedAssistance} />
        </div>
      </div>
    </div>
  )
}

export default Prompts