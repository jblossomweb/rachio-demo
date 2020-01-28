import { fromJS } from 'immutable';
import concat from 'lodash/concat';
import { getInitialState } from 'core/store';

import mockPerson from 'app/__mocks__/person.json';
import mockErrors from 'app/__mocks__/errors.json';

import paths from './paths';
import * as selectors from './selectors';

describe('store/person/selectors', () => {

  describe('getPerson', () => {
    const path = concat(['app'], paths.person());
    const value = fromJS(mockPerson);
    const state = getInitialState().setIn(path, value);
    it('should select value from person', () => {
      const selected = selectors.getPerson(state);
      expect(selected).toEqual(value);
    });
  });

  describe('getPersonId', () => {
    const path = concat(['app'], paths.person());
    const person = fromJS(mockPerson);
    const state = getInitialState().setIn(path, person);
    it('should select value from id', () => {
      const selected = selectors.getPersonId(state);
      expect(selected).toEqual(mockPerson.id);
    });
  });

  describe('getThinking', () => {
    const path = concat(['app'], paths.thinking());
    const state = getInitialState().setIn(path, true);
    it('should select value from thinking', () => {
      const selected = selectors.getThinking(state);
      expect(selected).toEqual(true);
    });
  });

  describe('getErrors', () => {
    const path = concat(['app'], paths.errors());
    const { errors } = mockErrors;
    const state = getInitialState().setIn(path, fromJS(errors));
    it('should select value from errors', () => {
      const selected = selectors.getErrors(state);
      expect(selected).toEqual(fromJS(errors));
    });
  });

});
