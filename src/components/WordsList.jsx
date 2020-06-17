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
    this.setState({
      selectedDisplayLanguage: "German",
      selectedDisplayWords: this.props.words.German,
      isLoading: false,
    });
  }

  handleLanguageChange = (event) => {
    this.setState({ isLoading: true });
    const {
      target: { value },
    } = event;

    const {
      words: { German, French, Spanish },
    } = this.props;

    if (value === "German") {
      this.setState({
        selectedDisplayLanguage: value,
        selectedDisplayWords: German,
        isLoading: false,
      });
    } else if (value === "French") {
      this.setState({
        selectedDisplayLanguage: value,
        selectedDisplayWords: French,
        isLoading: false,
      });
    } else if (value === "Spanish") {
      this.setState({
        selectedDisplayLanguage: value,
        selectedDisplayWords: Spanish,
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
            <div className="gameLabelContainer">
              <select
                onChange={this.handleLanguageChange}
                className="gameLabel"
                default={"German"}
              >
                {/* <option>Choose language ...</option> */}
                <option default value="German">
                  German
                </option>
                <option value="French">French</option>
                <option value="Spanish">Spanish</option>
              </select>
            </div>
            <LanguageList selectedDisplayWords={selectedDisplayWords} />
          </section>
        </div>
      </div>
    );
  }
}

export default WordsList;
