import { AppReducers, combineAllReducers } from 'core/store';
import extend from 'lodash/extend';

/* import your reducers here. */
import menuReducers from 'app/store/menu/action/reducers';
import personReducers from 'app/store/person/action/reducers';

const appReducers: AppReducers = extend({},
  /* register your reducers here. */
  menuReducers,
  personReducers,
) as AppReducers;

export default combineAllReducers(appReducers);
