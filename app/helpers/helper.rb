module Helper
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
end
