class NodePricer

  def self.run
    self.price
  end

  def self.price(a_crypto=nil)
    cryptos = (a_crypto.present?) ? [a_crypto] : Crypto.all
    cryptopia = Api::Cryptopia.new

    cryptos.each do |crypto|
      crypto.purchasable_price = cryptopia.node_price(crypto.symbol, crypto.stake)
      crypto.save
    end
  end
end
