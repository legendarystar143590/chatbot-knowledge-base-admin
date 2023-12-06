import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { showNotification } from "../common/headerSlice"
import TitleCard from "../../components/Cards/TitleCard"
import { RECENT_TRANSACTIONS } from "../../utils/dummyData"
import SearchBar from "../../components/Input/SearchBar"
import { CheckIcon } from "@heroicons/react/24/solid"
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon"

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


function KnowledgeBase() {


  const [trans, setTrans] = useState(RECENT_TRANSACTIONS)

  // Search according to name
  const applySearch = (value: string) => {
    let filteredTransactions = RECENT_TRANSACTIONS.filter((t) => { return t.name.toLowerCase().includes(value.toLowerCase()) || t.name.toLowerCase().includes(value.toLowerCase()) })
    setTrans(filteredTransactions)
  }

  return (
    <>

      <TitleCard title="Knowledge Base" topMargin="mt-2" TopSideButtons={<TopSideButtons applySearch={applySearch} />}>

        {/* Team Member list in table format loaded constant */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Status</th>
                <th>Date</th>
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
                      <td>
                        {
                          l.status === 'pending' && (
                            <span className="loading loading-spinner text-primary"></span>
                          )
                        }
                        {
                          l.status === 'success' && (
                            <CheckIcon className="w-8 h-8 text-accent" />
                          )
                        }
                        {
                          l.status === 'fail' && (
                            <XMarkIcon className="w-8 h-8 text-secondary" />
                          )
                        }
                      </td>
                      <td>{l.date}</td>
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


export default KnowledgeBase