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
    if params[:since]
      @feedbacks = Feedback.find(:all, :limit => 5, :conditions => ["id > ?", params[:since]], :order => "id DESC") 
    else
      @feedbacks = Feedback.find(:all, :limit => 5, :order => "id DESC")
    end
    
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
end
