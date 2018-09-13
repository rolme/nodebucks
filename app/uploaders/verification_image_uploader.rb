class VerificationImageUploader < CarrierWave::Uploader::Base
  def store_dir
    "uploads/verification_images"
  end
end
