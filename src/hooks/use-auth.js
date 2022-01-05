import { getItem } from '../utils/cookie';
import { localStorage } from '../utils/storage';

function useAuth(compWithAuth, compWOAuth) {
  let tokens = typeof window !== "undefined" && localStorage.get('tokens');
  // tokens = tokens && JSON.parse(tokens);

  if (tokens?.shortsAuthToken && tokens?.accessToken) {
    return compWOAuth;
  }
  return compWithAuth;
}

export default useAuth;
