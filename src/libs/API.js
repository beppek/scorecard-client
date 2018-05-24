import API_URL from './API_URL';
import axios from 'axios';

export const post = (url, data) => {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API_URL}/${url}`, data)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export const request = (url, config) => {
  return new Promise((resolve, reject) => {
    config.url = `${API_URL}/${url}`;
    axios(config)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
};
