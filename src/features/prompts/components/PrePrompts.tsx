// import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
// import { showNotification } from "../common/headerSlice"
import TitleCard from "../../../components/Cards/TitleCard"
import SearchBar from "../../../components/Input/SearchBar"
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import PencilSquareIcon from "@heroicons/react/24/outline/PencilSquareIcon"
import PlusSmallIcon from '@heroicons/react/24/outline/PlusSmallIcon'
import { openModal } from "../../common/modalSlice"
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from "../../../utils/globalConstantUtil"
import { AppDispatch, RootState } from "../../../app/store"
import { getPromptsContent } from "../promptsSlice"

type PropTypes = {
  applySearch: Function
}

const TopSideButtons = ({ applySearch }: PropTypes) => {

  const dispatch = useDispatch()

  const [searchText, setSearchText] = useState("")

  const removeAppliedFilter = () => {
    setSearchText("")
  }

  const openAddNewPromptModal = () => {
    dispatch(openModal({ title: "Add New Prompt", bodyType: MODAL_BODY_TYPES.PROMPT_ADD_NEW }))
  }

  useEffect(() => {
    if (searchText == "") {
      removeAppliedFilter()
    } else {
      applySearch(searchText)
    }
  }, [searchText])

  return (
    <div className="flex items-center">
      <SearchBar searchText={searchText} styleClass="mr-4" setSearchText={setSearchText} />
      <button className="btn px-3 btn-sm normal-case btn-primary text-white sm:px-6" onClick={() => openAddNewPromptModal()}>
        <PlusSmallIcon className="w-6 h-6 sm:hidden" />
        <span className="hidden sm:block">Add New</span>
      </button>
    </div>
  )
}

function PrePrompts() {

  const { prompts } = useSelector((state: RootState) => state.prompt)
  const dispatch: AppDispatch = useDispatch()

  const [prePrompts, setPrePrompts] = useState([{
    id: "",
    title: "",
    prompt: "",
    date: ""
  }])

  useEffect(() => {
    dispatch(getPromptsContent())
  }, [])

  // Search according to name
  const applySearch = (value: string) => {
    let filteredPrompts = prompts.filter((t) => { return t.title.toLowerCase().includes(value.toLowerCase()) || t.title.toLowerCase().includes(value.toLowerCase()) })
    setPrePrompts(filteredPrompts)
  }

  const deleteCurrentPrompt = (index: string) => {
    dispatch(openModal({
      title: "Confirmation", bodyType: MODAL_BODY_TYPES.CONFIRMATION,
      extraObject: { message: `Are you sure you want to delete this prompt?`, type: CONFIRMATION_MODAL_CLOSE_TYPES.PROMPT_DELETE, index }
    }))
  }

  const editCurrentPrompt = (index: string) => {
    dispatch(openModal({
      title: "Confirmation", bodyType: MODAL_BODY_TYPES.CONFIRMATION,
      extraObject: { message: `Are you sure you want to delete this lead?`, type: CONFIRMATION_MODAL_CLOSE_TYPES.PROMPT_DELETE, index }
    }))
  }

  return (
    <>
      <TitleCard title="PrePrompts" topMargin="mt-2" TopSideButtons={<TopSideButtons applySearch={applySearch} />}>

        {/* Team Member list in table format loaded constant */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Title</th>
                <th>Prompt</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                prePrompts.map((l, k) => {
                  return (
                    <tr key={k}>
                      <td>
                        <div className="font-bold">{l.title}</div>
                      </td>
                      <td>{l.prompt}</td>
                      <td>{l.date}</td>
                      <td>
                        <div className="flex">
                          <button className="btn btn-square btn-ghost btn-sm" onClick={() => editCurrentPrompt(l.id)}><PencilSquareIcon className="w-5" /></button>
                          <button className="btn btn-square btn-ghost btn-sm" onClick={() => deleteCurrentPrompt(l.id)}><TrashIcon className="w-5" /></button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  )
}


export default PrePrompts