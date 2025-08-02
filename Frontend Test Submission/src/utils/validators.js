// src/utils/validators.js

export const isValidURL = (url) => {
  const pattern = /^(https?:\/\/)?([\w\d-]+\.)+\w{2,}(\/.*)?$/;
  return pattern.test(url);
};

export const isValidShortcode = (code) => {
  const pattern = /^[a-zA-Z0-9]{4,}$/;
  return pattern.test(code);
};