// Whatever, idk

import { useHistory } from `react-router-dom`
 
export const TarotButton = () => {
  const history = useHistory()
 
  return (
    <button onClick={() => history.goBack()}>
      Go Back
    </button>
  )
}