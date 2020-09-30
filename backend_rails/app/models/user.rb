class User < ApplicationRecord
  encrypted_password
  
  def self.authenticate_with_credentials(email, password)
    user = self.find_by_email(email)
    # byebug
    if user && user.authenticate(password)
      return user
    else
      nil
    end
  end

end
