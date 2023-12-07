import { useDispatch } from 'react-redux'
import { CONFIRMATION_MODAL_CLOSE_TYPES } from '../../../utils/globalConstantUtil'
import { showNotification } from '../headerSlice'

type PropTypes = {
  extraObject: {
    message: string,
    type: string,
    _id: string,
    index: number
  },
  closeModal: () => void
}

function ConfirmationModalBody({ extraObject, closeModal }: PropTypes) {

  const dispatch = useDispatch()

  const { message, type } = extraObject


  const proceedWithYes = async () => {
    if (type === CONFIRMATION_MODAL_CLOSE_TYPES.PROMPT_DELETE) {
      // positive response, call api or dispatch redux function
      dispatch(showNotification({ message: "Lead Deleted!", status: 1 }))
    }
    closeModal()
  }

  return (
    <>
      <p className=' text-xl mt-8 text-center'>
        {message}
      </p>

      <div className="modal-action mt-12">

        <button className="btn btn-outline" onClick={() => closeModal()}>Cancel</button>

        <button className="btn btn-primary w-36" onClick={() => proceedWithYes()}>Yes</button>

      </div>
    </>
  )
}

export default ConfirmationModalBody