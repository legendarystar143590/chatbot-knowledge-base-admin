import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import SearchBar from "../../components/Input/SearchBar"
import AssistantCard from "./components/AssistantCard"
import { PlusSmallIcon } from "@heroicons/react/24/outline"
import { AppDispatch, RootState } from "../../app/store"
import { openModal } from "../common/modalSlice"
import { MODAL_BODY_TYPES } from "../../utils/globalConstantUtil"
import { getAssistantContent } from "./assistantsSlice"

function Assistants() {

  const { assistants, isLoading } = useSelector((state: RootState) => state.assistant)
  const dispatch: AppDispatch = useDispatch()

  const [assistant, setAssistant] = useState(assistants)
  const [searchText, setSearchText] = useState("")

  useEffect(() => {
    dispatch(getAssistantContent());
  }, [])

  useEffect(() => {
    setAssistant(assistants)
  }, [assistants])

  const openAddNewAssistantModal = () => {
    dispatch(openModal({ title: "Add New Assistant", bodyType: MODAL_BODY_TYPES.ASSISTANT_ADD_NEW }))
  }

  // Search according to name
  // const applySearch = (value: string) => {
  //   let filteredAssistant = assistants.filter((t) => { return t.name.toLowerCase().includes(value.toLowerCase()) })
  //   setAssistant(filteredAssistant)
  // }

  if (isLoading) {
    return (
      <span className="loading loading-infinity loading-lg"></span>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <SearchBar searchText={searchText} styleClass="ml-4" setSearchText={setSearchText} />
        <button tabIndex={0} className="btn px-3 btn-sm normal-case btn-primary text-white sm:px-6" onClick={() => openAddNewAssistantModal()}>
          <PlusSmallIcon className="w-6 h-6 sm:hidden" />
          <span className="hidden sm:block">Add New</span>
        </button>
      </div>
      <div className="grid mt-4 grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {
          assistant.map((a, k) => (
            <AssistantCard key={k} assistant={a} />
          ))
        }
      </div>
    </>
  )
}

export default Assistants