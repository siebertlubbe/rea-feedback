class FeedbacksController < ApplicationController
  
  def show
    @feedback = Feedback.find_by_user_id(params[:id])
    
    respond_to do |format|
      format.json { render :text => @feedback.to_json }
    end
  end

  def by_user_id
    @feedback = Feedback.find_by_user_id(params[:user_id])
    
    respond_to do |format|
      format.json { render :text => @feedback.to_json }
    end
  end

  
  def create
    @feedback = Feedback.create(params[:feedback])   
    #respond_to do |format|
    #  format.json { 
     #   require 'ruby-debug'; debugger
        render :text => @feedback.to_json #}
    #end
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
    @feedbacks = Feedback.find(:all, :limit => 5) #, :conditions => ["id > ?", params[:id]])
    
    respond_to do |format|
      format.html
      format.json { render :text => @feedbacks.to_json }
    end
  end
end
