class AuthenticateUser
  prepend SimpleCommand
  attr_accessor :email, :password

  def initialize(email, password)
    @email = email
    @password = password
  end

  def call
    # TODO: This code also exists in users_controller.rb
    JsonWebToken.encode({
      address: user.address,
      avatar: user.avatar,
      city: user.city,
      confirmedAt: user.confirmed_at&.to_formatted_s(:db),
      country: user.country,
      createdAt: user.created_at.to_formatted_s(:db),
      email: user.email,
      first: user.first,
      fullName: user.full_name,
      last: user.last,
      newEmail: user.new_email,
      nickname: user.nickname,
      slug: user.slug,
      affiliateKey: user.affiliate_key,
      affiliateKeyCreatedAt: user.affiliate_key_created_at&.to_formatted_s(:db),
      state: user.state,
      updatedAt: user.updated_at.to_formatted_s(:db),
      zipcode: user.zipcode,
      verified: user.verified_at,
      admin: user.admin,
      enabled2FA: @user.two_fa_secret.present?,
    }) if user
  end

  def user
    if email.present? && password.present?
      @user ||= User.find_by_email(email)
      return @user if @user && @user.authenticate(password)
    end

    errors.add :user_authentication, 'Invalid credentials'
    nil
  end
end
