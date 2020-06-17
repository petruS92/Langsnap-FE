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
    const { isLoggedIn, words } = this.props;
    if (isLoggedIn && words) {
      this.setState({
        selectedDisplayLanguage: "German",
        selectedDisplayWords: words.German,
        isLoading: false,
      });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }

  handleLanguageChange = (event) => {
    this.setState({ isLoading: true });
    const {
      target: { value },
    } = event;

    const { words } = this.props;
    if (words !== null) {
      if (value === "German" && words.German) {
        this.setState({
          selectedDisplayLanguage: value,
          selectedDisplayWords: words.German,
          isLoading: false,
        });
      } else if (value === "French" && words.French) {
        this.setState({
          selectedDisplayLanguage: value,
          selectedDisplayWords: words.French,
          isLoading: false,
        });
      } else if (value === "Spanish" && words.Spanish) {
        this.setState({
          selectedDisplayLanguage: value,
          selectedDisplayWords: words.Spanish,
          isLoading: false,
        });
      } else {
        this.setState({
          selectedDisplayLanguage: "",
          selectedDisplayWords: [],
          isLoading: false,
        });
      }
    } else {
      this.setState({
        selectedDisplayLanguage: "",
        selectedDisplayWords: [],
        isLoading: false,
      });
    }
  };

  render() {
    const { isLoggedIn, words } = this.props;
    const {
      selectedDisplayLanguage,
      selectedDisplayWords,
      isLoading,
    } = this.state;
    if (!isLoggedIn) return <h4>Please log in</h4>;
    if (isLoading) return <Loading />;
    return (
      <div className="pageContainer">
        <div className="titleBackground">
          <div className="titleContainer">
            <h3 className="titleHeader">Words</h3>
          </div>
        </div>
        <div className="contentBackground">
          <section className="contentContainer">
            <div className="wordsLabelContainer">
              <select
                onChange={this.handleLanguageChange}
                className="wordsLabel"
                default={"German"}
              >
                {/* <option>Choose language ...</option> */}
                <option default value="German">
                  German
                </option>
                <option value="French">French</option>
                <option value="Spanish">Spanish</option>
              </select>
              <span
                role="img"
                aria-label="select-arrow"
                className="dropDownArrowWordList"
              >
                ▼
              </span>
            </div>
            {selectedDisplayWords.length > 0 ? (
              <LanguageList selectedDisplayWords={selectedDisplayWords} />
            ) : (
              <p className="wordsListMessage">
                Please translate words to view your words.
              </p>
            )}
          </section>
        </div>
      </div>
    );
  }
}

export default WordsList;
