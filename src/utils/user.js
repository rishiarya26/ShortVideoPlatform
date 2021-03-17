import { GUEST_TOKEN } from '../constants';
import { generateUUID } from './app';
import { getItem } from './cookie';

// check user status login or not
export const getUserId = () => (getItem(GUEST_TOKEN) || (generateUUID(true)));
