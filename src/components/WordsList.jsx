import React from "react";
import Loading from "./Loading";

import LanguageList from "../components/LanguageList";

class WordsList extends React.Component {
  state = {
    selectedDisplayLanguage: "",
    selectedDisplayWords: [],
    isLoading: true,
  };

  componentDidMount() {
    this.setState({ isLoading: false });
  }

  handleLanguageClick = (event) => {
    const {
      target: { value },
    } = event;
    const {
      words: { German, French, Spanish },
    } = this.props;
    if (value === "German")
      this.setState({
        selectedDisplayLanguage: value,
        selectedDisplayWords: German,
      });
    else if (value === "French")
      this.setState({
        selectedDisplayLanguage: value,
        selectedDisplayWords: French,
      });
    else if (value === "Spanish")
      this.setState({
        selectedDisplayLanguage: value,
        selectedDisplayWords: Spanish,
      });
  };

  render() {
    const { isLoggedIn } = this.props;
    const {
      selectedDisplayLanguage,
      selectedDisplayWords,
      isLoading,
    } = this.state;
    if (!isLoggedIn) return <h4>Please log in</h4>;
    if (isLoading) return <Loading />;
    return (
      <section>
        <h3>Words List</h3>
        <button onClick={this.handleLanguageClick} value="German">
          German
        </button>
        <button onClick={this.handleLanguageClick} value="French">
          French
        </button>
        <button onClick={this.handleLanguageClick} value="Spanish">
          Spanish
        </button>
        <LanguageList
          selectedDisplayLanguage={selectedDisplayLanguage}
          selectedDisplayWords={selectedDisplayWords}
        />
      </section>
    );
  }
}

export default WordsList;
