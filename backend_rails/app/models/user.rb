class User < ApplicationRecord

  def self.authenticate_with_credentials(email, password)
    user = self.find_by_email(email)
    if user && user.authenticate(password)
      return user
    else
      nil
    end
  end

end
