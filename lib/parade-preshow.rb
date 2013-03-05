require "parade-preshow/version"

module Parade
  module Preshow
    extend self

    module Server
      def self.included(server)
        server.get "/preshow" do
          Dir.glob("#{settings.presentation_directory}/preshow/*").map { |path| File.basename(path) }.to_json
        end
      end
    end

    def asset(filename)
      File.expand_path(File.join(File.dirname(__FILE__),"parade-preshow",filename))
    end

    def stylesheet_file
      asset "parade-preshow.css"
    end

    def javascript_file
      asset "parade-preshow.js"
    end

  end

  Server.register Preshow::Server
  Server.register_javascript Preshow.javascript_file
  Server.register_stylesheet Preshow.stylesheet_file
end