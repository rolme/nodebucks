class CryptoScraper

  def self.run
    self.scrape
  end

  def self.scrape(a_crypto=nil)
    cryptos = (a_crypto.present?) ? [a_crypto] : Crypto.all

    if Rails.env != 'development'
      self.server_scrape(cryptos)
    else
      self.local_scrape(cryptos)
    end
  end

  def self.server_scrape(cryptos)
    options = Selenium::WebDriver::Chrome::Options.new
    options.binary = ENV['GOOGLE_CHROME_SHIM']
    options.add_argument('--headless')

    browser = Selenium::WebDriver.for :chrome, options: options
    cryptos.each do |crypto|
      path = "https://masternodes.pro/stats/#{crypto.symbol}/statistics"
      begin
        browser.navigate.to path
        sleep 1
        crypto.annual_roi  = browser.find_elements(tag_name: 'mnp-data-box')[5].text&.split(/\n/).first.gsub(/[^\d\.]/, '').to_f / 100.0
        crypto.node_price  = browser.find_elements(tag_name: 'mnp-data-box')[2].text&.split(/\n/).first.gsub(/[^\d\.]/, '').to_f
        crypto.nodes       = browser.find_elements(tag_name: 'mnp-data-box')[3].text&.split(/\n/).first.gsub(/\D/,'').to_i
        crypto.price       = browser.find_elements(tag_name: 'mnp-data-box')[6].text&.split(/\n/).first.gsub(/[^\d\.]/, '').to_f
        crypto.stake       = browser.find_elements(tag_name: 'mnp-data-box')[4].text&.split(/\s/).first.gsub(/\D/,'').to_i
        crypto.url         = browser.find_elements(tag_name: 'a').find{ |a| a.attribute('title') == 'WebSite' }.attribute('href').split("r=")[1]
        crypto.save
      rescue => error
        Rails.logger.error "SCRAPE ERROR: #{error}"
        Rails.logger.error "SCRAPE ERROR PATH: #{path}"
      end
    end
    browser.close
  end

  def self.local_scrape(cryptos)
    browser = Watir::Browser.new
    cryptos.each do |crypto|
      path = "https://masternodes.pro/stats/#{crypto.symbol}/statistics"
      begin
        browser.goto path
        sleep 1
        crypto.annual_roi  = browser.wd.find_elements(tag_name: 'mnp-data-box')[5].text&.split(/\n/).first.gsub(/[^\d\.]/, '').to_f / 100.0
        crypto.node_price  = browser.wd.find_elements(tag_name: 'mnp-data-box')[2].text&.split(/\n/).first.gsub(/[^\d\.]/, '').to_f
        crypto.nodes       = browser.wd.find_elements(tag_name: 'mnp-data-box')[3].text&.split(/\n/).first.gsub(/\D/,'').to_i
        crypto.price       = browser.wd.find_elements(tag_name: 'mnp-data-box')[6].text&.split(/\n/).first.gsub(/[^\d\.]/, '').to_f
        crypto.stake       = browser.wd.find_elements(tag_name: 'mnp-data-box')[4].text&.split(/\s/).first.gsub(/\D/,'').to_i
        crypto.url         = browser.a(title: 'WebSite').href.split("r=")[1]
        crypto.save
      rescue => error
        Rails.logger.error "SCRAPE ERROR: #{error}"
        Rails.logger.error "SCRAPE ERROR PATH: #{path}"
      end
    end
    browser.close
  end
end
