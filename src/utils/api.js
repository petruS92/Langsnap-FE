import axios from "axios";
import * as wordsListFunctions from "../utils/wordsListFunctions";

const baseURL = "https://langsnap-be.herokuapp.com/api";

export const fetchTranslation = (englishWord, translationLanguage) => {
  return axios
    .post(`${baseURL}/translate`, {
      word: englishWord,
      langpair: `en|${translationLanguage}`,
    })
    .then(({ data: { message } }) => {
      return message;
    });
};
export const fetchAssociatedWords = (staticEnglishWord) => {
  const associations = ["verb", "adverb", "adjective"];
  const associatedWordsRequests = associations.map((association) => {
    return axios
      .post(`${baseURL}/associations`, {
        text: staticEnglishWord,
        lang: "en",
        filter: association,
      })
      .then(
        ({
          data: {
            message: { wordsArray },
          },
        }) => {
          return wordsArray;
        }
      );
  });
  return Promise.all(associatedWordsRequests);
};

export const fetchGameWords = (body) => {
  return axios
    .post("https://langsnap-be.herokuapp.com/api/associations/game", body)
    .then(({ data: { message } }) => {
      const { wordsArray } = message;
      return wordsArray;
    });
};

export const updateDatabase = (
  translationLanguage,
  translatedWord,
  englishWord
) => {
  const correctedWord = wordsListFunctions.correctWord(englishWord);
  return axios
    .post(`${baseURL}/user/words`, {
      language: translationLanguage,
      englishWord: correctedWord,
      translatedWord: translatedWord,
    })
    .then((response) => {
      const {
        data: { wordsList },
      } = response;
      return wordsList;
    });
};

export const createUser = (name, email, password) => {
  return axios
    .post(`${baseURL}/user`, {
      name: name,
      email: email,
      password: password,
    })
    .then(({ data }) => {
      return data;
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
    });
};
