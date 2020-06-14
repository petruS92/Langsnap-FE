import React from "react";
import Loading from "./Loading";
import * as api from "../utils/api";
import * as wordsListFunctions from "../utils/wordsListFunctions";

class AssociatedWords extends React.Component {
  state = {
    isLoading: true,
    moreAssociatedWords: true,
    associatedPairWords: [],
    staticEnglishWord: this.props.staticEnglishWord,
  };

  componentDidMount() {
    this.setState({ isLoading: false });
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousProps.translatedWord !== this.props.translatedWord) {
      this.setState({ moreAssociatedWords: true });
      console.log("changed translatedWord");
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
        console.log(pairedWords);
        this.setState({
          moreAssociatedWords: false,
          isLoading: false,
        });
      });
  };

  render() {
    const {
      translatedWord,
      translationLanguage,
      staticEnglishWord,
    } = this.props;
    const { moreAssociatedWords, isLoading } = this.state;
    if (isLoading) return <Loading />;
    console.log(staticEnglishWord, translatedWord, translationLanguage);
    return (
      <section>
        <h4>AssociatedWords</h4>
        <p>
          If you want to learn more about words in {translationLanguage} related
          to '{translatedWord}' in {translationLanguage} to help you form
          sentences, then click the button below!
        </p>
        {moreAssociatedWords && (
          <button onClick={this.handleAssociatedWords}>
            Click to learn more words in {translationLanguage}
          </button>
        )}
        {!moreAssociatedWords && (
          <p>
            Now keep translating words to find more {translationLanguage} words!
          </p>
        )}
      </section>
    );
  }
}

export default AssociatedWords;
