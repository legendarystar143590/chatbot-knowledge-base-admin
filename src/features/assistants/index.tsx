// import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
// import { showNotification } from "../common/headerSlice"
import TitleCard from "../../components/Cards/TitleCard"
import SearchBar from "../../components/Input/SearchBar"
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import PencilSquareIcon from "@heroicons/react/24/outline/PencilSquareIcon"
import PlusSmallIcon from '@heroicons/react/24/outline/PlusSmallIcon'
import { FaceFrownIcon } from "@heroicons/react/24/outline"
import { CheckIcon } from "@heroicons/react/24/solid"
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon"
import { openModal } from "../common/modalSlice"
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from "../../utils/globalConstantUtil"
import { AppDispatch, RootState } from "../../app/store"
import { Assistant } from "../../utils/Type"
import { getAssistantContent } from "./assistantsSlice"
import { toast } from "react-toastify"

type TopSidePropTypes = {
  applySearch: (value: string) => void
}

const CHAT_ENDPOINT = import.meta.env.VITE_CHAT_ENDPOINT;

const TopSideButtons = ({ applySearch }: TopSidePropTypes) => {

  const dispatch = useDispatch()

  const [searchText, setSearchText] = useState("")

  const removeAppliedFilter = () => {
    setSearchText("")
  }

  const openAddNewAssistantModal = () => {
    dispatch(openModal({ title: "Add New Assistant", bodyType: MODAL_BODY_TYPES.ASSISTANT_ADD_NEW }))
  }

  useEffect(() => {
    if (searchText == "") {
      removeAppliedFilter()
    } else {
      applySearch(searchText)
    }
  }, [searchText, applySearch])

  return (
    <div className="flex items-center">
      <SearchBar searchText={searchText} styleClass="mr-4" setSearchText={setSearchText} />
      <button
        className="btn px-3 btn-sm normal-case btn-primary text-white sm:px-6"
        onClick={() => openAddNewAssistantModal()}
      >
        <PlusSmallIcon className="w-6 h-6 sm:hidden" />
        <span className="hidden sm:block">Add New</span>
      </button>
    </div>
  )
}

function Assistants() {

  const { assistants, isLoading } = useSelector((state: RootState) => state.assistant)
  const dispatch: AppDispatch = useDispatch()

  const [assistant, setAssistant] = useState(assistants)

  useEffect(() => {
    dispatch(getAssistantContent())
  }, [dispatch])

  useEffect(() => {
    setAssistant(assistants)
  }, [assistants])

  // Search according to name
  const applySearch = (value: string) => {
    const filteredAssistants = assistants.filter((t) => { return t.assistant_name.toLowerCase().includes(value.toLowerCase()) })
    setAssistant(filteredAssistants)
  }

  const deleteCurrentAssistant = (id: string) => {
    dispatch(openModal({
      title: "Confirmation", bodyType: MODAL_BODY_TYPES.CONFIRMATION,
      extraObject: { message: `Are you sure you want to delete this assistant?`, type: CONFIRMATION_MODAL_CLOSE_TYPES.ASSISTANT_DELETE, id }
    }))
  }

  const editCurrentAssistant = (assistant: Assistant) => {
    dispatch(openModal({ title: "Edit Assistant", bodyType: MODAL_BODY_TYPES.ASSISTANT_UPDATE, extraObject: assistant }))
  }

  const handleAssistantShare = (id: string) => {
    navigator.clipboard.writeText(CHAT_ENDPOINT + '/' + id);
    toast.success("Link Copied!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    })
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-infinity w-32 h-32"></span>
      </div>
    );
  }

  return (
    <TitleCard title="Assistants" topMargin="mt-2" TopSideButtons={<TopSideButtons applySearch={applySearch} />}>

      {/* Team Member list in table format loaded constant */}
      {
        assistant.length === 0 || assistant.length === 1 && assistant[0].assistant_name === "" ? (
          <div className="text-2xl flex justify-center items-center gap-2 text-center">
            <FaceFrownIcon className="w-12 h-12" />
            No Assistants
          </div>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="table w-full table-sm">
              <thead>
                <tr className="text-sm">
                  <th className="text-center p-1">No</th>
                  <th className="text-center">Name</th>
                  <th className="text-center">Prompt</th>
                  <th className="text-center w-12 p-1 wrap">Use <br /> Pinecone</th>
                  <th className="text-center">Use <br /> SQL</th>
                  <th className="text-center">Use <br /> SERP</th>
                  <th className="text-center">Date</th>
                  <th className="w-12 text-right"></th>
                </tr>
              </thead>
              <tbody>
                {
                  assistant.map((l, k) => (
                    <tr key={k}>
                      <td className="text-center">{k + 1}</td>
                      <td>
                        <div className="font-bold text-center">{l.assistant_name}</div>
                      </td>
                      <td>
                        <div className="h-32 overflow-auto">{l.prompt}</div>
                      </td>
                      <td className="w-12">
                        <div className="flex justify-center">
                          {
                            l.use_pinecone ? (
                              <CheckIcon className="w-8 h-8 text-accent" />
                            ) : (
                              <XMarkIcon className="w-8 h-8 text-secondary" />
                            )
                          }
                        </div>
                      </td>
                      <td>
                        <div className="flex justify-center">
                          {
                            l.use_sql ? (
                              <CheckIcon className="w-8 h-8 text-accent" />
                            ) : (
                              <XMarkIcon className="w-8 h-8 text-secondary" />
                            )
                          }
                        </div>
                      </td>
                      <td>
                        <div className="flex justify-center">
                          {
                            l.use_serp ? (
                              <CheckIcon className="w-8 h-8 text-accent" />
                            ) : (
                              <XMarkIcon className="w-8 h-8 text-secondary" />
                            )
                          }
                        </div>
                      </td>
                      <td>{l.date}</td>
                      <td className="text-right">
                        <div className="flex flex-col items-center gap-1">
                          <div className="flex">
                            <button className="btn btn-square btn-ghost btn-sm" onClick={() => editCurrentAssistant(l)}><PencilSquareIcon className="w-5" /></button>
                            <button className="btn btn-square btn-ghost btn-sm" onClick={() => deleteCurrentAssistant(l.id)}><TrashIcon className="w-5" /></button>
                          </div>
                          <button
                            className="btn btn-sm normal-case btn-primary text-white w-16"
                          // onClick={() => openAddNewAssistantModal()}
                          >
                            <span>Chat</span>
                          </button>
                          <button
                            className="btn btn-sm normal-case btn-primary text-white w-16"
                            onClick={() => handleAssistantShare(l.id)}
                          >
                            <span>Share</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                  )
                }
              </tbody>
            </table>
          </div>
        )
      }
    </TitleCard>
  )
}


export default Assistants