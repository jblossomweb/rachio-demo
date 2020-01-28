import { AppReducers, combineAllReducers } from 'core/store';
import extend from 'lodash/extend';

/* import your reducers here. */
import menuReducers from 'app/store/menu/action/reducers';
import rachioReducers from 'app/store/rachio/action/reducers';

const appReducers: AppReducers = extend({},
  /* register your reducers here. */
  menuReducers,
  rachioReducers,
) as AppReducers;

export default combineAllReducers(appReducers);
