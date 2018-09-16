class AvatarUploader < CarrierWave::Uploader::Base
  def store_dir
    "avatars"
  end
end
