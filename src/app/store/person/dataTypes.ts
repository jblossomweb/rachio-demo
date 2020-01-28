import { List, Record } from 'immutable';
import * as AppTypes from 'app/types';

export type Person = Record<Partial<AppTypes.Person>> | undefined;
export const defaultPerson: Person = undefined;

export type Id = AppTypes.Person['id'] | undefined;
export const defaultId: Id = undefined;

export type Thinking = boolean;
export const defaultThinking: Thinking = false;

export type Errors = List<AppTypes.Error> | null;
export const defaultErrors: Errors = null;