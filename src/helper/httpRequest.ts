import axios from 'axios';
import { ACCESS_TOKEN_KEY, API_ENDPOINT } from '../constants';
import { notification } from 'antd';

const HttpRequest = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN_KEY)}`,
  },
  timeout: 60000,
});
HttpRequest.interceptors.response.use(
  res => {
    return res.data.content;
  },
  error => {
    const {
      response: { data },
    } = error;
    if (data.content.error) {
      notification.error({
        message: data.content.error,
        description: data.content.message,
      });
    }
    if (data.statusCode === 401) {
      window.location.href = '/logout';
    }
  },
);

export default HttpRequest;
