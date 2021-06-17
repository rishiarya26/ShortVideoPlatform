import { getItem } from '../utils/cookie';

function useAuth(compWithAuth, compWOAuth) {
  let tokens = getItem('tokens');
  tokens = tokens && JSON.parse(tokens);

  if (tokens?.shortsAuthToken && tokens?.accessToken) {
    return compWOAuth;
  }
  return compWithAuth;
}

export default useAuth;
