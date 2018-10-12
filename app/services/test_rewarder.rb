class TestRewarder
  @@browser = nil

  def initialize(crypto, wallet, date)
    @crypto = crypto
    @wallet = wallet
    @date = date
    @total_amount_scraped = 0
    @invalid_wallet = false
  end

  def check
    begin
      @url = "#{@crypto.explorer_url}#{@wallet}"
      scrape_rewards(init_browser)
      if  @invalid_wallet
        { status: :error, message: 'Unable to find wallet.' }
      elsif @total_amount_scraped === 0
        { status: :error, message: 'Unable to find rewards after given date.' }
      else
        { total_amount_scraped: @total_amount_scraped, url: @url }
      end
    rescue Watir::Exception
      { status: :error, message: 'Unable to scrape URL.' }
    rescue
      { status: :error, message: 'Unable to find wallet.' }
    end
  end

  private

  def init_browser
    if Rails.env != 'development'
      if @@browser.blank?
        options = Selenium::WebDriver::Chrome::Options.new
        options.binary = ENV['GOOGLE_CHROME_SHIM']
        options.add_argument('--headless')
        @@browser = Selenium::WebDriver.for :chrome, options: options
      end
      @@browser.navigate.to @url
      sleep 5
    else
      driver = Watir::Browser.new
      driver.goto @url
      sleep 5
      @@browser = driver.wd
    end
    @@browser
  end

  def scrape_rewards(browser)
    case @crypto.slug
      when 'polis'
        scrape_polis(browser)
      when 'gobyte'
        scrape_gobyte(browser)
      when 'phore'
        scrape_phore(browser)
      when 'dash'
        scrape_dash(browser)
      when 'zcoin'
        scrape_zcoin(browser)
      when 'pivx'
        scrape_pivx(browser)
      when 'blocknet'
        scrape_blocknet(browser)
      when 'stipend'
        scrape_stipend(browser)
      else
        not_supported
    end
  end

  def scrape_polis(browser)
    @invalid_wallet = true if browser.find_elements(class_name: 'alert-danger').length > 0
    rows = browser.find_elements(tag_name: 'table')[2].find_element(tag_name: 'tbody').find_elements(tag_name: 'tr')

    rows.each do |row|
      data = row.find_elements(tag_name: 'td')
      next if data.blank?

      timestamp = data[0].text
      amount    = data[2].text&.split(/\s/)[1]
      @total_amount_scraped += BigDecimal.new(amount) if Time.parse(timestamp) >= @date 
    end
  end

  def scrape_dash(browser)
    rows = browser.find_element(tag_name: 'tbody').find_elements(:class, 'direct')
    rows.each do |row|
      data = row.find_elements(tag_name: 'td')
      next if data.blank?

      timestamp = data[2].text
      amount    = data[3].text
      @total_amount_scraped += BigDecimal.new(amount) if Time.parse(timestamp) >= @date
    end
  end

  def scrape_zcoin(browser)
    @invalid_wallet = true if browser.find_elements(class_name: 'alert-danger').length > 0
    rows = browser.find_elements(tag_name: 'table')[2].find_element(tag_name: 'tbody').find_elements(tag_name: 'tr')
    rows.each do |row|
      data = row.find_elements(tag_name: 'td')
      next if data.blank?

      timestamp = data[0].text
      amount    = data[2].text&.split(/\s/)[1]
      @total_amount_scraped += BigDecimal.new(amount) if Time.parse(timestamp) >= @date
    end
  end

  def scrape_pivx(browser)
    rows = browser.find_elements(tag_name: 'tbody')[2].find_elements(tag_name: 'tr')
    rows.reverse!.each do |row|
      data = row.find_elements(tag_name: 'td')
      next if data.blank?

      timestamp = data[2].text
      amount    = data[3].text.gsub(/[A-Z ]/, '')
      @total_amount_scraped += BigDecimal.new(amount) if Time.parse(timestamp) >= @date
    end
  end

  def scrape_gobyte(browser)
    rows = browser.find_elements(tag_name: 'table')[2].find_element(tag_name: 'tbody').find_elements(tag_name: 'tr')

    rows.each do |row|
      data = row.find_elements(tag_name: 'td')
      next if data.blank?

      timestamp = data[0].text
      amount    = data[2].text&.split(/\s/)[1]
      @total_amount_scraped += BigDecimal.new(amount) if Time.parse(timestamp) >= @date
    end
  end

  def scrape_phore(browser)
    rows = browser.find_elements(tag_name: 'tbody')[2].find_elements(tag_name: 'tr')
    rows.each do |row|
      data = row.find_elements(tag_name: 'td')
      next if data.blank?

      timestamp = data[2].text
      amount    = data[3].text.gsub(/[+A-Z, ]/, '')
      @total_amount_scraped += BigDecimal.new(amount) if Time.parse(timestamp) >= @date
    end
  end

  def scrape_blocknet(browser)
    rows = browser.find_elements(tag_name: 'tbody')[2].find_elements(tag_name: 'tr')
    rows.each do |row|
      data = row.find_elements(tag_name: 'td')
      next if data.blank?

      timestamp = data[2].text
      amount    = data[3].text.gsub(/[A-Z ]/, '')
      @total_amount_scraped += BigDecimal.new(amount) if Time.parse(timestamp) >= @date
    end
  end

  def scrape_stipend(browser)
    rows = browser.find_elements(tag_name: 'table')[2].find_element(tag_name: 'tbody').find_elements(tag_name: 'tr')

    rows.each do |row|
      data = row.find_elements(tag_name: 'td')
      next if data.blank?

      timestamp = data[0].text
      amount    = data[2].text&.split(/\s/)[1]&.to_f
      @total_amount_scraped += BigDecimal.new(amount) if Time.parse(timestamp) >= @date
    end
  end

  def not_supported
    { status: :error, message: 'Reward scraping for this crypto is not supported.' }
  end
end
