import axios from "axios";

const baseURL = "https://langsnap-be.herokuapp.com/api";

export const seeTranslation = (englishWord, translationLanguage) => {
  console.log(translationLanguage);
  return axios
    .post(`${baseURL}/translate`, {
      word: englishWord,
      langpair: `en|${translationLanguage}`,
    })
    .then(({ data: { message } }) => {
      return message;
    })
    .catch((err) => {
      console.dir(err);
    });
};

export const updateDatabase = (
  translationLanguage,
  translatedWord,
  englishWord
) => {
  return axios.post(`${baseURL}/user/words`, {
    language: translationLanguage,
    englishWord: englishWord,
    translatedWord: translatedWord,
  });
};

export const createUser = (name, email, password) => {
  return axios
    .post(`${baseURL}/user`, {
      name: name,
      email: email,
      password: password,
    })
    .catch((err) => {
      console.dir(err);
    });
};

export const getUserInfo = (email, password) => {
  return axios
    .post(`${baseURL}/auth`, {
      email: email,
      password: password,
    })
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      console.dir(err);
    });
};
