class FeedbacksController < ApplicationController
  
  def show
    @feedback = Feedback.find_by_user_id(params[:id])
    
    respond_to do |format|
      format.json { render :text => @feedback.to_json }
    end
  end

  def by_user_id
    @feedback = Feedback.find(
	:first,
	:conditions => [ "user_id = :u", {:u => params[:user_id]} ],
	:order => "created_at DESC"
    )
    render_json @feedback.to_json
  end

  def create
    @feedback = Feedback.create(params[:feedback])
    render_json @feedback.to_json
  end

  def update
    @feedback = Feedback.find(params[:id])
    @feedback.update_attributes(params[:feedback])
    
    respond_to do |format|
      format.json { render :text => @feedback.to_json }
    end
  end
  
  def new
    @feedback = Feedback.new
  end
  
  def index
    
    size = params[:size] ? params[:size] : 5
    
    @feedbacks = Feedback.find(:all, :limit => size, :order => "id DESC")
    
    respond_to do |format|
      format.html
      format.js { render :partial => 'index' }
    end
  end


  def render_json(json, options={})
    callback, variable = params[:callback], params[:variable]
    response = begin
      if callback && variable
        "var #{variable} = #{json};\n#{callback}(#{variable});"
      elsif variable
        "var #{variable} = #{json};"
      elsif callback
        "#{callback}(#{json});"
      else
        json
      end
    end
    render({:content_type => :js, :text => response}.merge(options))
  end
  
  def stats
    time = Time.now
    happy_feedbacks = Feedback.find(:all, :conditions => ['created_at > ? and status = ?', time - 1.hour, 1])
    indifferent_feedbacks = Feedback.find(:all, :conditions => ['created_at > ? and status = ?', time - 1.hour, 2])
    sad_feedbacks = Feedback.find(:all, :conditions => ['created_at > ? and status = ?', time - 1.hour, 3])
    
    @grouped_happy_feedbacks = group_feedbacks(happy_feedbacks)
    @grouped_indifferent_feedbacks = group_feedbacks(indifferent_feedbacks)
    @grouper_sad_feedbacks = group_feedbacks(sad_feedbacks)
  end
  
  private 
  
  def group_feedbacks(feedbacks)
    grouped_feedbacks = []
    
    current_minute = Time.now.min
    minute_offset = 60 - current_minute    
    
    for i in 0..59 do
      grouped_feedbacks[i] = [i, 0]
    end
    
    feedbacks.each do |feedback|
      minute = feedback.created_at.min
      
      position = (minute - current_minute - 1 + 60) % 60
      
      grouped_feedbacks[position][1] = grouped_feedbacks[position][1] + 1
    end
    return grouped_feedbacks
  end
  
end
