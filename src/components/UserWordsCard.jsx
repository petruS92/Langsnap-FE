import React from "react";
import Loading from "./Loading";

import LanguageList from "./LanguageList";
import LoginAlert from "./LoginAlert";

class UserWordsCard extends React.Component {
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
    const { isLoggedIn } = this.props;
    const { selectedDisplayWords, isLoading } = this.state;
    if (!isLoggedIn) return <LoginAlert />;
    if (isLoading) return <Loading />;
    return (
      <main className="pageContainer">
        <div className="titleBackground">
          <div className="titleContainer">
            <h1 className="titleHeader">Words</h1>
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
      </main>
    );
  }
}

export default UserWordsCard;
