import { getItem } from '../../utils/cookie';
import { useFetcher } from './component-state-handler';

function CheckTokens(dataFetcher, onDataFetched) {
  const tokens = getItem('tokens');

  try {
    if (tokens) {
      const [fetchState, retry, data] = useFetcher(dataFetcher, onDataFetched);
      return [fetchState, retry, data];
    }
    if (tokens === null) {
      // throw to login
      // console.log("login called")
      // const result = await userLogin()
    }
  } catch (e) {
    console.log('catch');
    // 401, 403 hit with refresh token
  }
}

export default CheckTokens;
