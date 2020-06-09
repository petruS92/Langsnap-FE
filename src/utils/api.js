import axios from "axios";

const baseURL = "https://langsnap-be.herokuapp.com/api";

export const seeTranslation = (englishWord, translationLanguage) => {
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

export const createUser = (name, email, password) => {
  return axios
    .post(`${baseURL}/user`, {
      name: name,
      email: email,
      password: password,
    })
    .then(({ data: { token } }) => {
      console.log(token);
      console.log("created User triggered");
      // return message;
    })
    .catch((err) => {
      console.dir(err);
    });
};
