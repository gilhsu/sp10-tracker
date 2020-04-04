module Helper
  class << self
    def timer(time)
      n = time
      rep = time
      print "#{time} second timer"
      rep.times do 
        print "."
        n = n - 1
        sleep 1
      end
      puts
    end

    def business_days_between(start_date, end_date)
      business_days = 0
      while end_date > start_date
        business_days = business_days + 1 unless end_date.saturday? or end_date.sunday?
        end_date = end_date - 1.day
      end
      business_days
    end
  end
end
