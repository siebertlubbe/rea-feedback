class Feedback < ActiveRecord::Base
  
  def emotion
    case status
    when 0
      "happy"
    when 1
      "indifferent"
    when 2
      "sad"
    else
      "undefined"
    end
  end
  
end
