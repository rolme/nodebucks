class CryptoScraper

  def self.run
    self.scrape
  end

  def self.scrape(a_crypto=nil)
    cryptos = (a_crypto.present?) ? [a_crypto] : Crypto.all
    browser = Watir::Browser.new
    cryptos.each do |crypto|
      begin
        browser.goto "https://masternodes.pro/stats/#{crypto.symbol}/statistics"
        sleep 1
        crypto.annual_roi  = browser.wd.find_elements(tag_name: 'mnp-data-box')[3].text.split(/\n/).first.gsub(/[^\d\.]/, '').to_f / 100.0
        crypto.node_price  = browser.wd.find_elements(tag_name: 'mnp-data-box')[0].text.split(/\n/).first.gsub(/[^\d\.]/, '').to_f
        crypto.nodes       = browser.wd.find_elements(tag_name: 'mnp-data-box')[1].text.split(/\n/).first.gsub(/\D/,'').to_i
        crypto.price       = browser.wd.find_elements(tag_name: 'mnp-data-box')[4].text.split(/\n/).first.gsub(/[^\d\.]/, '').to_f
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
