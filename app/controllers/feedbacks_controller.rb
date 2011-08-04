class FeedbacksController < ApplicationController
  
  def show
    @feedback = Feedback.find_by_uid(params[:uid])
    
    respond_to do |format|
      format.json { render :text => @feedback.to_json }
    end
  end
  
  def create
    @feedback = Feedback.create(params)
    
    respond_to do |format|
      format.json { render :text => @feedback.to_json }
    end
  end
  
  def update
    @feedback = Feedback.find(params[:id])
    @feedback.update_attributes(params)
    
    respond_to do |format|
      format.json { render :text => @feedback.to_json }
    end
  end
  
  def new
  end
end
