import React, { useState, useEffect } from "react";
import { StocksContainer } from "./StocksContainer";
import { Chart } from "../tiles/Chart";
import { Ticker } from "../tiles/Ticker";
import { DailyHistoryContainer } from "./DailyHistoryContainer";

export const HomeContainer = () => {
  const [data, setData] = useState({});
  const [loading, isLoading] = useState(false);

  useEffect(() => {
    isLoading(true);
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(`/api/v1/fetch/`, {
      method: "POST",
      body: JSON.stringify(),
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw error;
        }
      })
      .then(response => response.json())
      .then(body => {
        setData(body);
        isLoading(false);
      });
  };

  return (
    <div>
      <div className="row">
        <div className="small-6 columns" id="sp10-title">
          SP10
        </div>
        <div className="small-6 columns right" id="sp10-updated">
          Last Updated
          <br />
          {data.last_update}
        </div>
      </div>
      <div className="row">
        <div className="outline small-12 medium-4 columns">
          <div className="row">
            <div className="outline small-12 columns">
              Today
              <Ticker sp10={data.sp10} sp500={data.sp500} delta={data.delta} />
            </div>
          </div>
          <div className="row">
            <div className="outline small-12 columns">
              Last Year (253 Trading Days)
              <Ticker
                sp10={data.sp10_year}
                sp500={data.sp500_year}
                delta={data.delta_year}
              />
            </div>
          </div>
          <div className="row">
            <div className="outline small-12 columns">
              <StocksContainer stockData={data.indivStockData} />
            </div>
          </div>
        </div>
        <div className="outline small-12 medium-8 columns">
          <Chart />
        </div>
        <div className="small-12 columns">
          <div className="outline">
            <DailyHistoryContainer
              sp10_daily_history={data.sp10_daily_history}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
