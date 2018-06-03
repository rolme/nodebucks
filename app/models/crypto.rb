class Crypto < ApplicationRecord
  include Sluggable

  # This is run on :before_create as part of Sluggable
  def generate_slug(force=false)
    self.slug = name.parameterize if slug.nil? || force
  end
end
