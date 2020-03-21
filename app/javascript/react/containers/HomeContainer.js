import React, { useState, useEffect } from "react";
import { StocksContainer } from "./StocksContainer";
import { ChartFlex } from "../tiles/ChartFlex";
import { TickerFlex } from "../tiles/TickerFlex";
import { DailyHistoryContainer } from "./DailyHistoryContainer";
import { Heatmap } from "../tiles/Heatmap";
import { Titlebar } from "../tiles/Titlebar";

export const HomeContainer = () => {
  const [loading, isLoading] = useState(true);
  const [data, setData] = useState({});
  const [records, setRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [chartData, setChartData] = useState([]);
  const recordsPerPage = 10;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    isLoading(true);
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
        setRecords(body.sp10_daily_history);
        setChartData(body.chartData20);
        isLoading(false);
      });
  };

  // resolves record reversing issue
  const recordsArray =
    records &&
    records[0] &&
    new Date(records[0].date) > new Date(records[records.length - 1].date)
      ? records
      : records.reverse();

  // get current Daily History Records for pagination
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = recordsArray.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  // trigger to change chart data
  const changeChartData = range => {
    if (range === 20) {
      setChartData(data.chartData20);
    } else if (range === 62) {
      setChartData(data.chartData62);
    } else if (range === 125) {
      setChartData(data.chartData125);
    } else if (range === 253) {
      setChartData(data.chartData253);
    }
  };

  // if (loading) {
  //   return <h1>Page Loading...</h1>;
  // }

  return (
    <div>
      <Titlebar
        loading={loading}
        sp10={data.sp10}
        stockData={data.indivStockData}
      />
      <div className="row">
        <div className="outline small-12 large-8 columns">
          <div className="row">
            <div className="outline small-12 large-6 columns">
              <TickerFlex
                loading={loading}
                title={data.last_update}
                sp10={data.sp10}
                sp500={data.sp500}
                delta={data.delta}
              />
            </div>
            <div className="outline small-12 large-6 columns">
              <TickerFlex
                loading={loading}
                title="Last Year"
                sp10={data.sp10_year}
                sp500={data.sp500_year}
                delta={data.delta_year}
              />
            </div>
            <div className="outline small-12 columns">
              <ChartFlex
                loading={loading}
                data={chartData}
                changeChartData={changeChartData}
              />
            </div>
          </div>
        </div>
        <div className="outline small-12 large-4 columns container">
          <StocksContainer loading={loading} stockData={data.indivStockData} />
        </div>
        <div className="small-12 columns outline container">
          <Heatmap loading={loading} records={records} />
        </div>
        <div className="small-12 columns container">
          <div className="outline">
            <DailyHistoryContainer
              loading={loading}
              records={records}
              currentRecords={currentRecords}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              recordsPerPage={recordsPerPage}
              totalRecords={recordsArray.length}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
