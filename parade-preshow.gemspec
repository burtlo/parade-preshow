# -*- encoding: utf-8 -*-
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'parade-preshow/version'

Gem::Specification.new do |gem|
  gem.name          = "parade-preshow"
  gem.version       = Parade::Preshow::VERSION
  gem.authors       = ["Franklin Webber"]
  gem.email         = ["franklin.webber@gmail.com"]
  gem.description   = %q{Adds a time configurable preshow to a Parade presentation, allowing you to present images before your presentation starts.}
  gem.summary       = %q{Adds an image carousel of images to your Parade presentation}
  gem.homepage      = "https://github.com/burtlo/parade-preshow"
  gem.license       = "MIT"

  gem.files         = `git ls-files`.split($/)
  gem.executables   = gem.files.grep(%r{^bin/}).map{ |f| File.basename(f) }
  gem.test_files    = gem.files.grep(%r{^(test|spec|features)/})
  gem.require_paths = ["lib"]
end
