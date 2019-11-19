class Stock < ApplicationRecord
  validates :name, presence: true

  def poop
    puts "poop"
  end
end
