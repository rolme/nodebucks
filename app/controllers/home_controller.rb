class HomeController < ActionController::Base
  include Reactable
  include Metable

  def index
    @title = 'NodeBucks - Build your Masternode and Collect Rewards'
    @description = 'Operate your very own masternode and collect rewards in exchange for the work your masternode performs on the blockchain, confirming and verifying transactions of cryptocurrencies.'
    @image = "https://nodebucks.com/assets/og_nodebucks.jpg"
    @url   = "https://nodebucks.com/"

    render :index
  end

  def masternodes
    @title = 'The 7 Best Masternodes in Which to Invest - NodeBucks'
    @description = 'Masternodes are the future. Invest on your own Masternode and collect rewards. You can choose between Blocknet, Dash, GoByte, PIVX, Phore, Polis and ZCoin.'
    @url   = "https://nodebucks.com/masternodes"

    render :index
  end

  def contact
    @title = 'Contact with our Team - NodeBucks'
    @description = 'Do you have doubts about the Crypto World, Masternodes or the Blockchain? Reach our team of curated professionals and get all your doubts solved. Be assisted by the best!'
    @url   = "https://nodebucks.com/contact"

    render :index
  end

  def masternodes_description
    @title = 'What is a Masternode in Cryptocurrency? - NodeBucks'
    @description = 'What is a Masternode? Learn the main concepts and how you can create your own masternode step by step. See the differences between them and the easiest way to get started.'
    @url   = "https://nodebucks.com/what-are-masternodes"

    render :index
  end

  def login
    @title = 'Login into your Account - NodeBucks'
    @description = 'Manage your Masternodes directly from your account, monitor their progress and see the results you have achieved. All the data is ready in your own Dashboard.'
    @url   = "https://nodebucks.com/login"

    render :index
  end

  def sign_up
    @title = 'Create your own Masternode | Sign Up - NodeBucks'
    @description = 'Are you interested in the Blockchain world? Sign up now for free and create your own Masternode, thanks to which you will be able to earn rewards.'
    @url   = "https://nodebucks.com/sign-up"

    render :index
  end

  def faq
    @title = 'Masternodes | Frequently Asked Questions - NodeBucks'
    @description = 'Do you have questions about Masternodes? How they work and which one you should use? Check out our Frequently Asked Questions that will provide you with all the answers.'
    @url   = "https://nodebucks.com/faq"

    render :index
  end

  def terms
    @title = 'Terms of Use - NodeBucks'
    @description = 'The use of services provided by Nodebucks (hereafter referred to as "NB") is subject to the following Terms and Conditions.'
    @url   = "https://nodebucks.com/terms"

    render :index
  end

  def privacy
    @title = 'Privacy Notice - NodeBucks'
    @description = 'This privacy notice discloses the privacy practices for Nodebucks.com. This privacy notice applies solely to information collected by this website. It will notify you of the following.'
    @url   = "https://nodebucks.com/privacy"

    render :index
  end

  def disclaimer
    @title = 'Disclaimer - NodeBucks'
    @description = 'Before using this site, please make sure that you note the following important information added in this page.'
    @url   = "https://nodebucks.com/disclaimer"

    render :index
  end

  def masternode
    @masternode = Crypto.find_by(slug: params[:slug])

    if @masternode.present?
      name = @masternode.name
      symbol = @masternode.symbol

      @title = "#{name} (#{symbol}) Masternode Price and Information | NodeBucks"
      @description = "Build your own #{name} (#{symbol}) Masternode and earn rewards for the work your masternode performs on the blockchain, confirming and verifying transactions of this cryptocurrency."
      @image = "https://nodebucks.com/assets/logos/#{@masternode.slug}.png"
      @url = "https://nodebucks.com/masternodes/#{@masternode.slug}"
    end

    render :index
  end

  def sitemap
    respond_to do |format|
      format.xml { render body: Rails.root.join('public/sitemap.xml').read, layout: false }
    end
  end

  def forgot_password
    @noindex = true
    render :index
  end
end
