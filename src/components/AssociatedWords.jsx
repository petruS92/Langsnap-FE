import React from "react";
import Loading from "./Loading";

class AssociatedWords extends React.Component {
  state = {
    translatedAssociatedWords: "",
    moreAssociatedWords: true,
    isLoading: true,
  };

  componentDidMount() {
    this.setState({ isLoading: false });
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousProps.translatedWord !== this.props.translatedWord) {
      this.setState({ moreAssociatedWords: true });
      console.log("change words");
    }
  }

  handleAssociatedWords = () => {
    /*
    add api calls to get the associated words
    and translate them here
    */
    this.setState({
      translatedAssociatedWords: "",
      moreAssociatedWords: false,
    });
  };

  render() {
    const { translatedWord, translationLanguage } = this.props;
    const { moreAssociatedWords, isLoading } = this.state;
    if (isLoading) return <Loading />;
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
          <button>
            Now keep translating words to find more words{translationLanguage}
          </button>
        )}
      </section>
    );
  }
}

export default AssociatedWords;
