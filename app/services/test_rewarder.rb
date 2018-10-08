class TestRewarder

  def initialize(crypto, wallet, date)
    @crypto = crypto
    @wallet = wallet
    @date = date
  end

  def check
    begin
      @url = "#{@crypto.explorer_url}#{@wallet}"
      @doc = Nokogiri::HTML(open("#{@crypto.explorer_url}#{@wallet}"))
      { status: :ok, doc: scrape_rewards }
    rescue OpenURI::HTTPError => e
      if e.message == '404 Not Found'
        { status: :error, message: 'Unable to find url with this wallet.' }
      else
        { status: :error, message: 'Unable to scrape url.' }
      end
    end
  end

  private

  def scrape_rewards
    case @crypto.slug
      when 'polis'
        scrape_polis
      else 
        not_supported
    end
  end

  def scrape_polis
    total_balance = @doc.css('.summary-table').css('td')[2].content
    { status: :ok, url: @url, total_balance: total_balance, message: 'Successfully scraped url.' }
  end

  def not_supported
    { status: :error, message: 'Reward scraping for this crypto is not supported.' }
  end
end
