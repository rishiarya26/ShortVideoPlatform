import { getItem } from '../utils/cookie';

function useAuth(login, apiCall) {
  let tokens = getItem('tokens');
  tokens = tokens && JSON.parse(tokens);

  if (tokens?.shortsAuthToken && tokens?.accessToken) {
    return apiCall;
  }
  return login;
}

export default useAuth;
