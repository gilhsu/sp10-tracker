import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { StocksContainer } from "./StocksContainer";
import { ChartFlex } from "../tiles/ChartFlex";
import { TickerFlex } from "../tiles/TickerFlex";
import { DailyHistoryContainer } from "./DailyHistoryContainer";
import { Heatmap } from "../tiles/Heatmap";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "75%",
    padding: "35px"
  },
  overlay: {
    background: "rgba(0, 0, 0, 0.5)"
  }
};

export const HomeContainer = () => {
  const [loading, isLoading] = useState(true);
  const [data, setData] = useState({});
  const [records, setRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [chartData, setChartData] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
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

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
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

  if (loading) {
    return <h1>Page Loading...</h1>;
  }

  return (
    <div>
      <div className="row container">
        <div className="small-12 columns w7" id="sp10-title">
          SP10
        </div>
        <div className="small-12 columns" id="sp10-subtitle">
          <div>
            Top 10 S&P 500 Stock Tracker{" "}
            <a onClick={openModal}>
              <i className="fas fa-info-circle"></i>
            </a>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={customStyles}
              contentLabel="Example Modal"
              ariaHideApp={false}
            >
              <div className="section-title horizontal-spacer">
                SP10 Fund Thesis
              </div>
              <div className="horizontal-paragraph-spacer">
                The SP10 tracks the average return of the top 10 stock
                constituents of the S&P 500. These 10 stocks disproportionately
                combine to represent ~22.5% of the US market index.
              </div>
              <div className="horizontal-spacer">
                Therefore, if you believe that the US market will grow in the
                long-term, the highest-weighted stocks will be
                disproportionately responsible for this growth.
              </div>
            </Modal>
          </div>
          <a>Funds Calculator</a>
        </div>
      </div>
      <div className="row">
        <div className="outline small-12 large-8 columns">
          <div className="row">
            <div className="outline small-12 large-6 columns">
              <TickerFlex
                title={data.last_update}
                sp10={data.sp10}
                sp500={data.sp500}
                delta={data.delta}
              />
            </div>
            <div className="outline small-12 large-6 columns">
              <TickerFlex
                title="Last Year"
                sp10={data.sp10_year}
                sp500={data.sp500_year}
                delta={data.delta_year}
              />
            </div>
            <div className="outline small-12 columns">
              <ChartFlex data={chartData} changeChartData={changeChartData} />
            </div>
          </div>
        </div>
        <div className="outline small-12 large-4 columns container">
          <StocksContainer stockData={data.indivStockData} />
        </div>
        <div className="small-12 columns outline container">
          <Heatmap records={records} />
        </div>
        <div className="small-12 columns container">
          <div className="outline">
            <DailyHistoryContainer
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
