import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import PencilSquareIcon from "@heroicons/react/24/outline/PencilSquareIcon"

function AssistantCard() {
  return (
    <div className="group relative">
      <div className="card card-compact bg-base-100 shadow-xl transition duration-300 ease-in-out group-hover:opacity-30 group">
        <figure><img className="w-48 h-48" src="/logo.png" alt="bot" /></figure>
        <div className="card-body">
          <h2 className="card-title">Support Chatbot(Webchat)</h2>
          <p>Last edited 3 days ago</p>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-full hidden justify-center group-hover:flex group-hover:block">
        <div className="flex items-center gap-4">
          <button className="btn btn-circle">
            <PencilSquareIcon className='w-6 h-6' />
          </button>
          <button className="btn btn-circle">
            <TrashIcon className='w-6 h-6' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default AssistantCard