import moment from "moment"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { showNotification } from "../common/headerSlice"
import TitleCard from "../../components/Cards/TitleCard"
import { RECENT_TRANSACTIONS } from "../../utils/dummyData"
import FunnelIcon from '@heroicons/react/24/outline/FunnelIcon'
import SearchBar from "../../components/Input/SearchBar"

type PropTypes = {
  removeFilter: Function,
  applyFilter: Function,
  applySearch: Function
}

const TopSideButtons = ({ removeFilter, applyFilter, applySearch }: PropTypes) => {

  const [searchText, setSearchText] = useState("")
  const locationFilters = ["Paris", "London", "Canada", "Peru", "Tokyo"]

  const showFiltersAndApply = (params: string) => {
    applyFilter(params)
  }

  const removeAppliedFilter = () => {
    removeFilter()
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

  const removeFilter = () => {
    setTrans(RECENT_TRANSACTIONS)
  }

  const applyFilter = (params: string) => {
    let filteredTransactions = RECENT_TRANSACTIONS.filter((t) => { return t.location == params })
    setTrans(filteredTransactions)
  }

  // Search according to name
  const applySearch = (value: string) => {
    let filteredTransactions = RECENT_TRANSACTIONS.filter((t) => { return t.email.toLowerCase().includes(value.toLowerCase()) || t.email.toLowerCase().includes(value.toLowerCase()) })
    setTrans(filteredTransactions)
  }

  return (
    <>

      <TitleCard title="Knowledge Base" topMargin="mt-2" TopSideButtons={<TopSideButtons applySearch={applySearch} applyFilter={applyFilter} removeFilter={removeFilter} />}>

        {/* Team Member list in table format loaded constant */}
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email Id</th>
                <th>Location</th>
                <th>Amount</th>
                <th>Transaction Date</th>
              </tr>
            </thead>
            <tbody>
              {
                trans.map((l, k) => {
                  return (
                    <tr key={k}>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="mask mask-circle w-12 h-12">
                              <img src={l.avatar} alt="Avatar" />
                            </div>
                          </div>
                          <div>
                            <div className="font-bold">{l.name}</div>
                          </div>
                        </div>
                      </td>
                      <td>{l.email}</td>
                      <td>{l.location}</td>
                      <td>${l.amount}</td>
                      <td>{moment(l.date).format("D MMM")}</td>
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