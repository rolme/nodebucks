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
      avatar: user.avatar,
      confirmedAt: user.confirmed_at&.to_formatted_s(:db),
      createdAt: user.created_at.to_formatted_s(:db),
      email: user.email,
      first: user.first,
      fullName: user.full_name,
      last: user.last,
      location: user.location,
      newEmail: user.new_email,
      nickname: user.nickname,
      slug: user.slug,
      updatedAt: user.updated_at.to_formatted_s(:db)
    }) if user
  end

  def user
    @user ||= User.find_by_email(email)
    return @user if @user && @user.authenticate(password)

    errors.add :user_authentication, 'Invalid credentials'
    nil
  end
end
