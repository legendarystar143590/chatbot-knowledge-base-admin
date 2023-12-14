// import { useEffect, useState } from "react"
// import { useDispatch, useSelector } from "react-redux"
// import SearchBar from "../../components/Input/SearchBar"
// import AssistantCard from "./components/AssistantCard"
// import { PlusSmallIcon } from "@heroicons/react/24/outline"
// import { AppDispatch, RootState } from "../../app/store"
// import { openModal } from "../common/modalSlice"
// import { MODAL_BODY_TYPES } from "../../utils/globalConstantUtil"
// import { getAssistantContent } from "./assistantsSlice"

// function Assistants() {

//   const { assistants, isLoading } = useSelector((state: RootState) => state.assistant)
//   const dispatch: AppDispatch = useDispatch()

//   const [assistant, setAssistant] = useState(assistants)
//   const [searchText, setSearchText] = useState("")

//   useEffect(() => {
//     dispatch(getAssistantContent());
//   }, [])

//   useEffect(() => {
//     setAssistant(assistants)
//   }, [assistants])

//   const openAddNewAssistantModal = () => {
//     dispatch(openModal({ title: "Add New Assistant", bodyType: MODAL_BODY_TYPES.ASSISTANT_ADD_NEW }))
//   }

//   // Search according to name
//   // const applySearch = (value: string) => {
//   //   let filteredAssistant = assistants.filter((t) => { return t.name.toLowerCase().includes(value.toLowerCase()) })
//   //   setAssistant(filteredAssistant)
//   // }

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center">
//         <span className="loading loading-infinity w-32 h-32"></span>
//       </div>
//     );
//   }

//   return (
//     <>
//       <div className="flex items-center justify-between">
//         <SearchBar searchText={searchText} styleClass="ml-4" setSearchText={setSearchText} />
//         <button tabIndex={0} className="btn px-3 btn-sm normal-case btn-primary text-white sm:px-6" onClick={() => openAddNewAssistantModal()}>
//           <PlusSmallIcon className="w-6 h-6 sm:hidden" />
//           <span className="hidden sm:block">Add New</span>
//         </button>
//       </div>
//       <div className="grid mt-4 grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">
//         {
//           assistant.map((a, k) => (
//             <AssistantCard key={k} assistant={a} />
//           ))
//         }
//       </div>
//     </>
//   )
// }

// export default Assistants
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
import { openModal } from "../common/modalSlice"
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from "../../utils/globalConstantUtil"
import { AppDispatch, RootState } from "../../app/store"
import { Assistant } from "../../utils/Type"
import { getAssistantContent } from "./assistantsSlice"

type TopSidePropTypes = {
  applySearch: Function,
  selected: string
}

type PropTypes = {
  assistant_id: string
}

const TopSideButtons = ({ applySearch, selected }: TopSidePropTypes) => {

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
  }, [searchText])

  return (
    <div className="flex items-center">
      <SearchBar searchText={searchText} styleClass="mr-4" setSearchText={setSearchText} />
      <button
        className="btn px-3 btn-sm normal-case btn-primary text-white sm:px-6"
        disabled={selected === '-1'}
        onClick={() => openAddNewAssistantModal()}
      >
        <PlusSmallIcon className="w-6 h-6 sm:hidden" />
        <span className="hidden sm:block">Add New</span>
      </button>
    </div>
  )
}

function Assistants({ assistant_id }: PropTypes) {

  const { assistants, isLoading } = useSelector((state: RootState) => state.assistant)
  const dispatch: AppDispatch = useDispatch()

  const [assistant, setAssistant] = useState(assistants)

  useEffect(() => {
    dispatch(getAssistantContent())
  }, [])

  useEffect(() => {
    setAssistant(assistants);
  }, [assistants])

  // Search according to name
  const applySearch = (value: string) => {
    let filteredAssistants = assistants.filter((t) => { return t.assistant_name.toLowerCase().includes(value.toLowerCase()) })
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-infinity w-32 h-32"></span>
      </div>
    );
  }

  return (
    <TitleCard title="Assistants" topMargin="mt-2" TopSideButtons={<TopSideButtons selected={assistant_id} applySearch={applySearch} />}>

      {/* Team Member list in table format loaded constant */}
      {
        assistant.length !== 1 || assistant[0].assistant_name !== "" ? (
          <div className="overflow-x-auto w-full">
            <table className="table w-full table-sm lg:table-lg">
              <thead>
                <tr className="text-sm">
                  <th className="w-12 text-center">No</th>
                  <th className="text-center">Name</th>
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
                      <td>{l.date}</td>
                      <td className="text-right">
                        <div className="flex">
                          <button className="btn btn-square btn-ghost btn-sm" onClick={() => editCurrentAssistant(l)}><PencilSquareIcon className="w-5" /></button>
                          <button className="btn btn-square btn-ghost btn-sm" onClick={() => deleteCurrentAssistant(l.id)}><TrashIcon className="w-5" /></button>
                        </div>
                      </td>
                    </tr>
                  )
                  )
                }
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-2xl flex justify-center items-center gap-2 text-center">
            <FaceFrownIcon className="w-12 h-12" />
            No Assistants
          </div>
        )
      }
    </TitleCard>
  )
}


export default Assistants