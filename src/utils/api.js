import axios from "axios";

const baseURL = "https://langsnap-be.herokuapp.com/api/translate";

export const seeTranslation = (englishWord, translationLang) => {
  return axios
    .post(`${baseURL}`, {
      word: englishWord,
      langpair: `en|${translationLang}`,
    })
    .then(({ data: { message } }) => {
      return message;
    })
    .catch((err) => {
      console.dir(err);
    });
};
