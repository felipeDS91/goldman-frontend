import axios from 'axios';
import { signOut, refreshTokenSuccess } from '~/store/modules/auth/actions';
import { store } from '~/store';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest.__isRetryRequest) {
      originalRequest.__isRetryRequest = true;

      const state = store.getState();

      const { refreshToken, token } = state.auth;

      try {
        axios.defaults.headers.Authorization = `Baerer ${token}`;
        const { data } = await axios.post(
          `${originalRequest.baseURL}/refresh-token`,
          {
            refreshToken,
          }
        );

        api.defaults.headers.Authorization = `Baerer ${data.token}`;
        originalRequest.headers.Authorization = `Baerer ${data.token}`;

        store.dispatch(refreshTokenSuccess(data.token));

        return api(originalRequest);
      } catch (e) {
        store.dispatch(signOut());
      }
    }

    return Promise.reject(error);
  }
);

export default api;
