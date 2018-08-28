class CryptoScraper

  def self.run
    self.scrape
  end

  def self.scrape(a_crypto=nil)
    cryptos = (a_crypto.present?) ? [a_crypto] : Crypto.active
    if Rails.env != 'development'
      options = Selenium::WebDriver::Chrome::Options.new
      options.binary = ENV['GOOGLE_CHROME_SHIM']
      options.add_argument('--headless')
      browser = Selenium::WebDriver.for :chrome, options: options
    else
      driver = Watir::Browser.new
    end

    cryptos.each do |crypto|
      path = "https://masternodes.pro/stats/#{crypto.symbol}/statistics"
      if Rails.env != 'development'
        browser.navigate.to path
      else
        driver.goto path
        browser = driver.wd
      end
      sleep 1

      begin
        crypto.daily_reward         = browser.find_elements(tag_name: 'mnp-data-box')[8].text&.split(/\n/).first.gsub(/[^\d\.]/, '').to_f
        # crypto.estimated_node_price = browser.find_elements(tag_name: 'mnp-data-box')[2].text&.split(/\n/).first.gsub(/[^\d\.]/, '').to_f
        crypto.masternodes          = browser.find_elements(tag_name: 'mnp-data-box')[3].text&.split(/\n/).first.gsub(/\D/,'').to_i
        crypto.price                = browser.find_elements(tag_name: 'mnp-data-box')[1].text&.split(/\n/).first.gsub(/[^\d\.]/, '').to_f
        crypto.stake                = browser.find_elements(tag_name: 'mnp-data-box')[2].text&.split(/\s/).first.gsub(/\D/,'').to_i

        el = browser.find_elements(tag_name: 'a')&.find{ |a| a.attribute('title') == 'WebSite' }
        crypto.url = el.attribute('href').split("r=")[1] if el.present?

        crypto.save
      rescue => error
        Rails.logger.error "SCRAPE ERROR: #{error}"
        Rails.logger.error "SCRAPE ERROR PATH: #{path}"
      end
    end
    browser.close
  end
end
