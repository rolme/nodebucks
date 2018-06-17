json.admin user.admin? # NOTE: This info is not part of token (JWT)
json.avatar user.avatar
json.confirmedAt user.confirmed_at&.to_formatted_s(:db)
json.createdAt user.created_at.to_formatted_s(:db)
json.deletedAt user.deleted_at&.to_formatted_s(:db)
json.email user.email
json.first user.first
json.fullName user.full_name
json.id user.id
json.last user.last
json.newEmail user.new_email
json.nickname user.nickname
json.slug user.slug
json.updatedAt user.updated_at.to_formatted_s(:db)
