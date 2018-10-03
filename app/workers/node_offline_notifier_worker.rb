class NodeOfflineNotifierWorker
  include Sidekiq::Worker
  sidekiq_options retry: false, backtrace: true

  def perform(*args)
    Node.all.each do |node|
      if node.status != 'online'
        SupportMailerService.send_node_not_online_notification(node)
      elsif node.ip.present? && node.server_down?
        node.update_attribute(:status, :offline)
        SupportMailerService.send_node_offline_notification(node)
      end
    end
  end
end
