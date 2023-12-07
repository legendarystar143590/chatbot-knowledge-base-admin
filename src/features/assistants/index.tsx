import { useState } from "react"
import SearchBar from "../../components/Input/SearchBar"
import AssistantCard from "./components/AssistantCard"

function Assistants() {

  const [searchText, setSearchText] = useState("")

  return (
    <>
      <SearchBar searchText={searchText} styleClass="ml-4" setSearchText={setSearchText} />
      <div className="grid mt-4 grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6">
        <AssistantCard />
        <AssistantCard />
        <AssistantCard />
        <AssistantCard />
        <AssistantCard />
        <AssistantCard />
        <AssistantCard />
        <AssistantCard />
      </div>
    </>
  )
}

export default Assistants