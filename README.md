# Parade::Preshow

Adds a time configurable preshow to a Parade presentation, allowing you to present images before your presentation starts.

## Installation

Add this line to your application's Gemfile:

    gem 'parade-preshow'

And then execute:

    $ bundle

Or install it yourself as:

    $ gem install parade-preshow

## Usage

Require it in your `parade` file:

```ruby
require 'parade-preshow'

title "Example Presentation"

description "My Awesome Presentation"

section "Introduction" do
  slides "intro.md"
  slides "installation.md"
  slides "navigation.md"
end
```

Require it in your `config.ru` file:

```ruby
require "parade"
require "parade-preshow"
run Parade::Server.new
```

You can start the preshow by pressing the **p** key during your presentation

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request
