import React from "react";
import Loading from "./Loading";
import ErrorDisplay from "./ErrorDisplay";
import * as api from "../utils/api";
import * as wordsListFunctions from "../utils/wordsListFunctions";

class AssociatedWords extends React.Component {
  state = {
    isLoading: true,
    errorMessage: "",
    associatedPairWords: [],
    moreAssociatedWords: true,
    staticEnglishWord: this.props.staticEnglishWord,
  };

  render() {
    const { translatedWord, translationLanguage } = this.props;
    const {
      associatedPairWords,
      moreAssociatedWords,
      isLoading,
      errorMessage,
    } = this.state;
    const { handleAssociatedWords } = this;

    if (isLoading && !errorMessage) return <Loading />;
    if (errorMessage) return <ErrorDisplay errorMessage={errorMessage} />;

    return (
      <>
        <h1 className="associatedWordsTitle">Associated Words</h1>
        <section className="associatedMessageBackground">
          {!moreAssociatedWords && associatedPairWords ? (
            <p className="associatedWordsMessage">
              Now keep translating words to find more{" "}
              {translationLanguage + " "}
              words!
            </p>
          ) : (
            <p className="associatedWordsMessage">
              Click to learn more words related to <em>'{translatedWord}'</em>{" "}
              and help to form sentences in {translationLanguage}.
            </p>
          )}
        </section>

        {moreAssociatedWords && (
          <label className="associatedButtonContainer">
            <button
              onClick={handleAssociatedWords}
              className="associatedWordsButton"
            >
              Learn more {translationLanguage} words!
            </button>
          </label>
        )}
        {!moreAssociatedWords && associatedPairWords && (
          <>
            <ul className="langList">
              {associatedPairWords.map((pairObject, index) => {
                return (
                  <li key={index} className="langListItem">
                    {`${Object.keys(pairObject)} - ${Object.values(
                      pairObject
                    )}`}
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </>
    );
  }

  componentDidMount() {
    this.setState({ isLoading: false });
  }

  componentDidUpdate(previousProps, previousState) {
    const { translatedWord } = this.props;

    if (previousProps.translatedWord !== translatedWord) {
      this.setState({ moreAssociatedWords: true });
    }
  }

  handleAssociatedWords = () => {
    const { staticEnglishWord, translationLanguage } = this.props;
    this.setState({ isLoading: true });
    let englishAssociatedWords = "";
    let translatedAssociatedWords = "";

    api
      .fetchAssociatedWords(staticEnglishWord)
      .then((associatedWords) => {
        englishAssociatedWords = wordsListFunctions.orderAssociatedWords(
          associatedWords
        );
        return Promise.all(
          englishAssociatedWords.map((englishWord) => {
            return api.fetchTranslation(englishWord, translationLanguage);
          })
        );
      })
      .then((translatedWords) => {
        translatedAssociatedWords = translatedWords;

        const pairedWords = wordsListFunctions.pairAssociatedWords(
          englishAssociatedWords,
          translatedAssociatedWords
        );

        this.setState({
          associatedPairWords: pairedWords,
          moreAssociatedWords: false,
          isLoading: false,
        });
      })
      .catch((error) => {
        const {
          response: {
            data: {
              availableRoutes: { message },
            },
          },
        } = error;
        this.setState({ errorMessage: message });
      });
  };
}

export default AssociatedWords;
