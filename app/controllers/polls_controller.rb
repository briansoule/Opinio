class PollsController < ApplicationController
  # GET /polls
  # GET /polls.json
  def index
    @polls = Poll.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @polls }
    end
  end

  # GET /polls/1
  # GET /polls/1.json
  def show
    @poll = Poll.find(params[:id])

    #@yes_percentage = trues / @poll.answers.count.to_f
    #@username = @answer.number.last(4)

    trues = 0
    falses = 0
    @poll.answers.each do |a| 
      if a.affirmative == true
        trues = trues + 1
      else
        falses = falses + 1
      end
    end

    @yes_percentage = trues / @poll.answers.count.to_f
    @trues = trues
    @falses = falses
    @total = @poll.answers.count

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @poll }
    end
  end

  # GET /polls/new
  # GET /polls/new.json
  def new
    @poll = Poll.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @poll }
    end
  end

  # GET /polls/1/edit
  def edit
    @poll = Poll.find(params[:id])
  end

  # POST /polls
  # POST /polls.json
  def create
    @poll = Poll.new(params[:poll])

    respond_to do |format|
      if @poll.save
        format.html { redirect_to @poll, notice: 'Poll was successfully created.' }
        format.json { render json: @poll, status: :created, location: @poll }
      else
        format.html { render action: "new" }
        format.json { render json: @poll.errors, status: :unprocessable_entity }
      end
    end
  end
  
  def create_answer
    @answer = Answer.new
    logger.debug @answer
    return if params[:From].blank?
    if params[:Body] == true || params[:Body] =~ (/(true|True|TRUE|t|yes|Yes|YES|y|Y|1)$/i)
      @answer.affirmative = true
    elsif params[:Body] == false || params[:Body] =~ (/(false|False|FALSE|f|no|No|NO|n|N|0)$/i) 
      @answer.affirmative = false   
    end 
    @answer.number = params[:From]
    @poll = Poll.find(params[:id])
    @poll.answers << @answer
    @answer.save
    @poll.save

    #trues = @poll.answers.inject(0) { |sum, n| sum + (n ? 1 : 0) }
    trues = 0
    falses = 0
    @poll.answers.each do |a|
      if a.affirmative == true
        trues = trues + 1
      else
        falses = falses + 1
      end
    end

    logger.debug yes_percentage = trues / @poll.answers.count.to_f
    logger.debug username = @answer.number.last(4)

    Pusher['opinio'].trigger!('action_created', {:some => 'data', :vote => @answer.affirmative, :username => username, :trues => trues, :falses => falses, :yes_percentage => yes_percentage})
    respond_to do |format|
      format.html { redirect_to @poll, notice: 'Poll was successfully updated.' }
      format.json { render json: @poll }
    end
  end

  # PUT /polls/1
  # PUT /polls/1.json
  def update
    @poll = Poll.find(params[:id])

    respond_to do |format|
      if @poll.update_attributes(params[:poll])
        format.html { redirect_to @poll, notice: 'Poll was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @poll.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /polls/1
  # DELETE /polls/1.json
  def destroy
    @poll = Poll.find(params[:id])
    @poll.destroy

    respond_to do |format|
      format.html { redirect_to polls_url }
      format.json { head :no_content }
    end
  end
end

