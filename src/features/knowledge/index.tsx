// import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
// import { showNotification } from "../common/headerSlice"
import TitleCard from "../../components/Cards/TitleCard"
// import { RECENT_TRANSACTIONS } from "../../utils/dummyData"
import SearchBar from "../../components/Input/SearchBar"
import { CheckIcon } from "@heroicons/react/24/solid"
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon"
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import PlusSmallIcon from '@heroicons/react/24/outline/PlusSmallIcon'
import { FaceFrownIcon } from "@heroicons/react/24/outline"
import { openModal } from "../common/modalSlice"
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from "../../utils/globalConstantUtil"
import { AppDispatch, RootState } from "../../app/store"
import { getKnowledgeContent } from "./knowledgeSlice"

type PropTypes = {
  applySearch: Function
}

const TopSideButtons = ({ applySearch }: PropTypes) => {

  const dispatch = useDispatch()

  const [searchText, setSearchText] = useState("")

  const removeAppliedFilter = () => {
    setSearchText("")
  }

  const openAddNewKnowledgeModal = (type: string) => {
    dispatch(openModal({ title: "Add New Knowledge", bodyType: MODAL_BODY_TYPES.KNOWLEDGE_ADD_NEW, extraObject: { type: type } }))
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
      <div className="dropdown dropdown-bottom dropdown-end">
        <button tabIndex={0} className="btn px-3 btn-sm normal-case btn-primary text-white sm:px-6">
          <PlusSmallIcon className="w-6 h-6 sm:hidden" />
          <span className="hidden sm:block">Add New</span>
        </button>
        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32 bg-primary text-white mt-1 rounded-xl">
          <li><button onClick={() => openAddNewKnowledgeModal('URL')}>URL</button></li>
          <li><button onClick={() => openAddNewKnowledgeModal('file')}>File</button></li>
        </ul>
      </div>
    </div>
  )
}


function KnowledgeBase() {

  const { knowledge, isLoading } = useSelector((state: RootState) => state.knowledge)
  const dispatch: AppDispatch = useDispatch()

  const [knowledges, setKnowledges] = useState(knowledge)

  useEffect(() => {
    dispatch(getKnowledgeContent());
  }, [])

  useEffect(() => {
    setKnowledges(knowledge)
  }, [knowledge])

  // Search according to name
  const applySearch = (value: string) => {
    let filteredKnowledges = knowledge.filter((t) => { return t.name.toLowerCase().includes(value.toLowerCase()) || t.name.toLowerCase().includes(value.toLowerCase()) })
    setKnowledges(filteredKnowledges)
  }

  const getStatus = (status: string) => {
    switch (status) {
      case 'pending':
        return <span className="loading loading-spinner text-primary"></span>
      case 'success':
        return <CheckIcon className="w-8 h-8 text-accent" />
      case 'fail':
        return <XMarkIcon className="w-8 h-8 text-secondary" />
      default:
        return null
    }
  }

  const deleteCurrentKnowledge = (index: string) => {
    dispatch(openModal({
      title: "Confirmation", bodyType: MODAL_BODY_TYPES.CONFIRMATION,
      extraObject: { message: `Are you sure you want to delete this lead?`, type: CONFIRMATION_MODAL_CLOSE_TYPES.PROMPT_DELETE, index }
    }))
  }

  if (isLoading) {
    return (
      <span className="loading loading-infinity loading-lg"></span>
    );
  }

  return (
    <TitleCard title="Knowledge Base" topMargin="mt-2" TopSideButtons={<TopSideButtons applySearch={applySearch} />}>

      {/* Team Member list in table format loaded constant */}
      {
        knowledge.length > 1 ? (
          <div className="overflow-x-auto w-full">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th className="w-12"></th>
                </tr>
              </thead>
              <tbody>
                {
                  knowledges.map((l, k) => l.id && (
                    <tr key={k}>
                      <td>{l.id}</td>
                      <td>
                        <div className="font-bold">{l.name}</div>
                      </td>
                      <td>{l.type}</td>
                      <td>{getStatus(l.status)}</td>
                      <td>{l.date}</td>
                      <td><button className="btn btn-square btn-ghost" onClick={() => deleteCurrentKnowledge(l.id)}><TrashIcon className="w-5" /></button></td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-2xl flex justify-center items-center gap-2 text-center">
            <FaceFrownIcon className="w-12 h-12" />
            No Knowledge Base
          </div>
        )}
    </TitleCard>
  )
}


export default KnowledgeBase