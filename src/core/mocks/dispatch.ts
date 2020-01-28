import { Dispatch, AnyAction } from 'redux';

const mockDispatch: Dispatch<AnyAction> = (
  action: AnyAction,
) => action.type;

export default mockDispatch;
