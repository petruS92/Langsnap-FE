import axios from "axios";

const baseURL = "https://langsnap-be.herokuapp.com/api";

export const fetchTranslation = (englishWord, translationLanguage) => {
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
  return axios
    .post(`${baseURL}/user/words`, {
      language: translationLanguage,
      englishWord: englishWord,
      translatedWord: translatedWord,
    })
    .then((response) => {
      const {
        data: { wordsList },
      } = response;
      return wordsList;
    })
    .catch((err) => {
      console.dir(err);
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

export const loginUser = (email, password) => {
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
