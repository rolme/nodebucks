class AvatarUploader < CarrierWave::Uploader::Base
  def store_dir
    "uploads/avatars"
  end
end
