require 'rubygems'
require 'sinatra'

get '/' do
  @prizes = []
  @prizes << { :item => 'Book from EdgeCase', :photo => 'ec.gif', :logo => 'ec.gif' }
  @prizes << { :item => 'Tickets to Mars', :photo => 'ec.gif', :logo => 'ec.gif' }
  @prizes << { :item => '7 Lbs of Jello', :photo => 'ec.gif', :logo => 'ec.gif' }
  @prize_options = @prizes.map { |p| "<option>#{p[:item]}</option>" }
  haml :index
end

