import {
  createContext, useState
} from 'react';


export const CacheAdContext = createContext(
  {
    cacheContext: () => { }
  }
);

export const CacheAdProvider = ({ children }) => {
  const [state, setState] = useState({});


  const cacheContext = {
    getCacheAd: () => state,
    feedCacheAd: data => {
      setState({...data});
    }
  };

  return (
    <CacheAdContext.Provider value={cacheContext}>
      {children}
    </CacheAdContext.Provider>
  );
};


<CacheAdProvider>
    
</CacheAdProvider>


