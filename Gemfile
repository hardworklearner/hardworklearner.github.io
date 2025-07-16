source "https://rubygems.org"

ruby "3.1"

gem "jekyll", "~> 4.3"
gem "jekyll-theme-chirpy", "~> 7.3"
gem "jekyll-multiple-languages-plugin"
gem "jekyll-feed", "~> 0.12"
gem "jekyll-admin"

group :test do
  gem "html-proofer", "~> 4.4"
end

gem "nokogiri", "~> 1.15"
gem "webrick", "~> 1.7"

platforms :mingw, :x64_mingw, :mswin do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
  gem "wdm", "~> 0.1.1"
end

platforms :jruby do
  gem "http_parser.rb", "~> 0.6.0"
end
