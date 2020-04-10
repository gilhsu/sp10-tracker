# SP10

SP10 is a financial analysis tool that tracks the average return of the top 10 stock constituents of the S&P 500 against the S&P 500 index itself. The website was built with React and Rails and uses the AlphaVantange API and web scraping via Nokogiri to fetch data on a daily basis.

## Production URL

www.sp10.gilberthsu.com

### Local Setup

1. `git clone https://github.com/sketchbook21/sp10-tracker.git`
2. `bundle install && yarn install`
3. `rake fetch_records_data`
4. In one terminal: `rails s`
5. In another terminal: `yarn start`
6. Visit url: `http://localhost:3000/`

### Important Notes to Consider

1.
