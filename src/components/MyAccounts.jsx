import React from "react";
import { Chart } from "react-google-charts";
import { graphData } from "../utils/graphData";
import { extractingNumbers } from "../utils/extractingNumbers";
import LoginAlert from "./LoginAlert";

const MyAccounts = (props) => {
  const { name, email, token, words } = props;
  if (!token) return <LoginAlert />;

  const data = graphData(words);
  const maxGraphLength = extractingNumbers(data);

  console.log(data);
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

  return (
    <div className="pageContainer">
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
    </div>
  );
};

export default MyAccounts;
