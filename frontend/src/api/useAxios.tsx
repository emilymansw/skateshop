import { useState, useEffect } from 'react';
import axios, { Method, AxiosError } from 'axios';
import { auth } from '../auth/firebaseUtil';

const getAuthToken = async () => {
  const { currentUser } = auth;
  if (currentUser) {
    return currentUser.getIdToken();
  }
};

export const useAxios = <T, D = undefined>(
  method: Method,
  url: string,
  path: string,
  params: object,
  requestData: object,
  autoFetch = true
) => {
  const [data, setData] = useState<T | undefined>();
  const [error, setError] = useState<AxiosError | null>(null);
  const [loading, setLoading] = useState<boolean | undefined>(autoFetch);

  const fetchData = (
    fetchPath: string,
    fetchParams: object,
    fetchRequestData: object
  ) => {
    setLoading(true);
    setError(null);
    getAuthToken()
      .then((accessToken) => {
        if (accessToken) {
          return axios.request<T>({
            method,
            url: url + fetchPath,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            params: fetchParams,
            data: fetchRequestData,
          });
        }
        return axios.request<T>({
          method,
          url: url + fetchPath,
          params: fetchParams,
          data: fetchRequestData,
        });
      })
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((e: AxiosError) => {
        setError(e);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (method === 'GET' && autoFetch) {
      setLoading(true);
      fetchData(path, params, requestData);
    }
  }, []);

  return { fetchData, data, error, loading };
};
