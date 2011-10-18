class Feedback < ActiveRecord::Base
  
  def emotion
    case status
    when 1
      "happy"
    when 2
      "indifferent"
    when 3
      "sad"
    else
      "undefined"
    end
  end
  
  def trend
    previous_two_feedbacks = self.class.find(:all, :conditions => {"user_id" => self.user_id}, :limit => 2, :order => "id DESC")
    
    case 
    when previous_two_feedbacks.size != 2
      "undefined"
    when previous_two_feedbacks.last.status == self.status
      "stay"
    when previous_two_feedbacks.last.status > self.status
      "up"
    when previous_two_feedbacks.last.status < self.status
      "down"
    end
  end
  
end
