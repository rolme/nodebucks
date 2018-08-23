json.partial! 'user', user: @referrer
json.affiliateKey @affiliate_key
json.tier1_referrals @tier1_referrals.each do |t1_ref|
    json.name t1_ref.first
    json.createdAt t1_ref.created_at.to_formatted_s(:db)
end
json.tier2_referrals @tier2_referrals.each do |t2_ref|
    json.name t2_ref.first
    json.createdAt t2_ref.created_at.to_formatted_s(:db)
end
json.tier3_referrals @tier3_referrals.each do |t3_ref|
    json.name t3_ref.first
    json.createdAt t3_ref.created_at.to_formatted_s(:db)
end
