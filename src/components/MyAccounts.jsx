import React from "react";
import LoginAlert from "./LoginAlert";
import { graphData } from "../utils/graphData";
import { extractingNumbers } from "../utils/extractingNumbers";
import { Chart } from "react-google-charts";

const MyAccounts = ({ name, email, token, words }) => {
  const data = graphData(words);
  const maxGraphLength = extractingNumbers(data);
  const options = {
    title: "Words per languages",
    hAxis: {
      title: "Words Learnt",
      viewWindow: { min: 0, max: maxGraphLength },
    },
    vAxis: { title: "Languages", viewWindow: { min: 0, max: data.length } },
    legend: "Bottom",
    colors: ["#e7e488"],
    backgroundColor: "none",
    chartArea: { width: "50%" },
  };

  if (!token) return <LoginAlert />;

  return (
    <main className="pageContainer">
      <div className="titleBackground">
        <div className="titleContainer">
          <h3 className="titleHeader">Account</h3>
        </div>
      </div>
      <div className="contentBackground">
        <div className="contentContainer">
          <p className="accountName">{name}</p>
          <p className="accountEmail">{email}</p>
          <div className={"chartContainer"}>
            <Chart
              chartType="BarChart"
              options={options}
              data={data}
              width="100%"
              height="400px"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default MyAccounts;
