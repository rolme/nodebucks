class Withdrawal < ApplicationRecord
  include Sluggable

  belongs_to :user

  belongs_to :admin,
             foreign_key: :last_modified_by_admin_id,
             class_name: 'User',
             optional: true
end
