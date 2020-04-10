# SP10

SP10 is a financial analysis tool that tracks the average return of the top 10 stock constituents of the S&P 500 against the S&P 500 index itself. The website was built with React and Rails and uses the AlphaVantange API and web scraping via Nokogiri to fetch data on a daily basis.

### Production URL

www.sp10.gilberthsu.com

### Local Setup

1. `git clone https://github.com/sketchbook21/sp10-tracker.git`
2. `bundle install && yarn install`
3. Get a free AlphaVantage API key here: `https://www.alphavantage.co/support/#api-key`
4. Create an ENV file in the main directory called: `.env`
5. Add the following value to the `.env` file: `API_KEY1={YOUR_ALPHA_VANTAGE_API_KEY}`
6. In your terminal to set up the database, migrate and seed: `rake db:create && rake db:migrate && rake db:seed`
7. In your terminal to backfill 1 year's worth of data: `rake fetch_records_data`
8. In your terminal run: `rails s`
9. In another terminal run: `yarn start`
10. Visit url: `http://localhost:3000/`

### Important Notes / Limitations

1. SP10 uses a Nokogiri web scraper to determine the top 10 constituents of the S&P 500 index from `www.slickcharts.com/sp500`
2. The data from SlickCharts is current, and specifically non-historic so a 1-year backfill will extrapolate the average return of a fixed set of constituents based on the latest data. However since the top 10 constituents can fluctuate day-to-day, this backfill will be intrinsically different than data on the production SP10 website. In production, the top 10 constituent data is collected daily and a new record is created using the average return of those constituents.
3. Production uses a Job Scheduler built into Heroku to fetch data daily. For a local build, the `fetch_records_data` rake task must be run daily to stay up-to-date.
4. AlphaVantage has a limitation of 5 API calls per minute so you will experience a short 3-minute wait during the `fetch_records_data` rake task. The rake task has a built-in delay timer if the maximum calls are exceeded and will continue with the backfill once the throttle has ended.
5. AlphaVantage has a bug that occasionally returns very inaccurate values S&P 500 symbols ("SPX, "INX"). To prevent recording inaccurate data, there is a built-in validity checker that refetches from the API if it believes the data is bad.
