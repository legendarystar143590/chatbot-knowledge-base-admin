import { useDispatch } from 'react-redux'
import { CONFIRMATION_MODAL_CLOSE_TYPES } from '../../../utils/globalConstantUtil'
import { showNotification } from '../headerSlice'
import { deletePrePrompt } from '../../prompts/prePromptsSlice'
import { deleteCloserPrompt } from '../../prompts/closerPromptsSlice'
import { deletePushPrompt } from '../../prompts/pushPromptsSlice'
import { AppDispatch } from '../../../app/store'

type PropTypes = {
  extraObject: {
    message: string,
    type: string,
    id: string
  },
  closeModal: () => void
}

function ConfirmationModalBody({ extraObject, closeModal }: PropTypes) {

  const dispatch: AppDispatch = useDispatch()

  const { message, type, id } = extraObject


  const proceedWithYes = async () => {
    switch (type) {
      case CONFIRMATION_MODAL_CLOSE_TYPES.PRE_PROMPT_DELETE:
        dispatch(deletePrePrompt(id))
          .then(res => {
            console.log(res);
            dispatch(showNotification({ message: "PrePromt Deleted!", status: 1 }))
          })
          .catch(err => console.log(err));
        break;
      case CONFIRMATION_MODAL_CLOSE_TYPES.CLOSER_PROMPT_DELETE:
        dispatch(deleteCloserPrompt(id))
          .then(res => {
            console.log(res);
            dispatch(showNotification({ message: "CloserPromt Deleted!", status: 1 }))
          })
          .catch(err => console.log(err));
        break;
      case CONFIRMATION_MODAL_CLOSE_TYPES.PUSH_PROMPT_DELETE:
        dispatch(deletePushPrompt(id))
          .then(res => {
            console.log(res);
            dispatch(showNotification({ message: "PushPromt Deleted!", status: 1 }))
          })
          .catch(err => console.log(err));
        break;
      default: break;
    }
    closeModal()
  }

  return (
    <>
      <p className=' text-xl mt-0 text-center'>
        {message}
      </p>

      <div className="modal-action mt-8 gap-8">

        <button className="btn btn-outline" onClick={() => closeModal()}>Cancel</button>

        <button className="btn btn-primary w-20" onClick={() => proceedWithYes()}>Yes</button>

      </div>
    </>
  )
}

export default ConfirmationModalBody