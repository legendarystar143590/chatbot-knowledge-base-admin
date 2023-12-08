// import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
// import { showNotification } from "../common/headerSlice"
import TitleCard from "../../../components/Cards/TitleCard"
import { RECENT_TRANSACTIONS } from "../../../utils/dummyData"
import SearchBar from "../../../components/Input/SearchBar"
import { CheckIcon } from "@heroicons/react/24/solid"
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon"
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import { openModal } from "../../common/modalSlice"
import { CONFIRMATION_MODAL_CLOSE_TYPES, MODAL_BODY_TYPES } from "../../../utils/globalConstantUtil"

type PropTypes = {
  applySearch: Function
}

const TopSideButtons = ({ applySearch }: PropTypes) => {

  const [searchText, setSearchText] = useState("")

  const removeAppliedFilter = () => {
    setSearchText("")
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
      <button className="btn px-6 btn-sm normal-case btn-primary text-white">Add New</button>
    </div>
  )
}


function CloserPrompts() {

  const dispatch = useDispatch()

  const [trans, setTrans] = useState(RECENT_TRANSACTIONS)

  // Search according to name
  const applySearch = (value: string) => {
    let filteredTransactions = RECENT_TRANSACTIONS.filter((t) => { return t.name.toLowerCase().includes(value.toLowerCase()) || t.name.toLowerCase().includes(value.toLowerCase()) })
    setTrans(filteredTransactions)
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

  const deleteCurrentKnowledge = (id: string) => {
    dispatch(openModal({
      title: "Confirmation", bodyType: MODAL_BODY_TYPES.CONFIRMATION,
      extraObject: { message: `Are you sure you want to delete this lead?`, type: CONFIRMATION_MODAL_CLOSE_TYPES.PROMPT_DELETE, id }
    }))
  }

  return (
    <>

      <TitleCard title="CloserPrompts" topMargin="mt-2" TopSideButtons={<TopSideButtons applySearch={applySearch} />}>

        {/* Team Member list in table format loaded constant */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Status</th>
                <th>Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                trans.map((l, k) => {
                  return (
                    <tr key={k}>
                      <td>
                        <div className="font-bold">{l.name}</div>
                      </td>
                      <td>{l.type}</td>
                      <td>{getStatus(l.status)}</td>
                      <td>{l.date}</td>
                      <td><button className="btn btn-square btn-ghost" onClick={() => deleteCurrentKnowledge(l.id)}><TrashIcon className="w-5" /></button></td>
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


export default CloserPrompts