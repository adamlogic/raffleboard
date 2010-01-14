require 'rubygems'
require 'sinatra'

get '/' do
  @prizes = []
  Dir.glob 'public/images/sponsors/*' do |filename|
    filename = filename.split('/').last
    @prizes << {:filename => filename,
                :name => filename.split('.').first.gsub('_', ' ') }
  end
  @prize_options = @prizes.map do |prize| 
    "<option value=\"#{prize[:filename]}\">#{prize[:name]}</option>"
  end
  
  haml :index
end

