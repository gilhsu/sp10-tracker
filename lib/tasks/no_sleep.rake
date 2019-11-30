desc "Keeping SP10 tracker awake"
task no_sleep: :environment do
  puts "Keeping SP10 tracker awake"
  HTTParty.get("https://sp10-tracker.herokuapp.com/")
end