# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_08_24_080436) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accounts", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "crypto_id"
    t.string "slug"
    t.decimal "balance", default: "0.0"
    t.string "cached_crypto_symbol"
    t.string "cached_crypto_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "wallet"
    t.index ["crypto_id"], name: "index_accounts_on_crypto_id"
    t.index ["user_id"], name: "index_accounts_on_user_id"
  end

  create_table "contacts", force: :cascade do |t|
    t.string "subject"
    t.string "email"
    t.text "message"
    t.integer "reviewed_by_user"
    t.datetime "reviewed_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["reviewed_by_user"], name: "index_contacts_on_reviewed_by_user"
  end

  create_table "cryptos", force: :cascade do |t|
    t.string "slug"
    t.string "name"
    t.string "symbol"
    t.string "url"
    t.string "status", default: "active"
    t.bigint "masternodes"
    t.decimal "node_price", default: "0.0"
    t.decimal "daily_reward", default: "0.0"
    t.decimal "price", default: "0.0"
    t.decimal "sellable_price", default: "0.0"
    t.decimal "estimated_node_price", default: "0.0"
    t.decimal "flat_setup_fee", default: "0.0"
    t.decimal "percentage_setup_fee", default: "0.05"
    t.decimal "percentage_hosting_fee", default: "0.0295"
    t.decimal "percentage_conversion_fee", default: "0.03"
    t.integer "stake", default: 1000
    t.decimal "purchasable_price", default: "0.0"
    t.string "explorer_url"
    t.string "ticker_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "events", force: :cascade do |t|
    t.bigint "node_id"
    t.string "event_type"
    t.string "description"
    t.decimal "value", default: "0.0"
    t.datetime "timestamp"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["node_id"], name: "index_events_on_node_id"
  end

  create_table "node_price_histories", force: :cascade do |t|
    t.bigint "node_id"
    t.jsonb "data", default: {}, null: false
    t.string "source"
    t.decimal "value", default: "0.0"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["node_id"], name: "index_node_price_histories_on_node_id"
  end

  create_table "nodes", force: :cascade do |t|
    t.bigint "account_id"
    t.bigint "crypto_id"
    t.bigint "user_id"
    t.integer "created_by_admin_id"
    t.string "cached_crypto_name"
    t.string "cached_crypto_symbol"
    t.string "cached_user_slug"
    t.string "slug"
    t.string "status", default: "new"
    t.string "ip"
    t.decimal "cost"
    t.decimal "balance", default: "0.0"
    t.decimal "wallet_balance", default: "0.0"
    t.datetime "online_at"
    t.datetime "sold_at"
    t.string "wallet"
    t.string "version"
    t.datetime "last_upgraded_at"
    t.string "vps_provider"
    t.string "vps_url"
    t.decimal "vps_monthly_cost"
    t.string "withdraw_wallet"
    t.integer "reward_setting", default: 0
    t.integer "sell_setting", default: 0
    t.string "sell_bitcoin_wallet"
    t.decimal "sell_price"
    t.string "stripe"
    t.datetime "sell_priced_at"
    t.datetime "buy_priced_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_nodes_on_account_id"
    t.index ["crypto_id"], name: "index_nodes_on_crypto_id"
    t.index ["slug"], name: "index_nodes_on_slug"
    t.index ["user_id"], name: "index_nodes_on_user_id"
  end

  create_table "rewards", force: :cascade do |t|
    t.bigint "node_id"
    t.string "cached_crypto_name"
    t.string "cached_crypto_symbol"
    t.datetime "timestamp"
    t.string "txhash"
    t.decimal "amount"
    t.decimal "fee"
    t.decimal "total_amount"
    t.decimal "usd_value", default: "0.0"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["node_id"], name: "index_rewards_on_node_id"
  end

  create_table "transactions", force: :cascade do |t|
    t.bigint "account_id"
    t.bigint "reward_id"
    t.bigint "withdrawal_id"
    t.string "txn_type"
    t.string "slug"
    t.decimal "amount"
    t.string "cached_crypto_name"
    t.string "cached_crypto_symbol"
    t.string "notes"
    t.string "status", default: "pending"
    t.datetime "cancelled_at"
    t.datetime "processed_at"
    t.integer "last_modified_by_admin_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_transactions_on_account_id"
    t.index ["reward_id"], name: "index_transactions_on_reward_id"
    t.index ["withdrawal_id"], name: "index_transactions_on_withdrawal_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first"
    t.string "last"
    t.string "email"
    t.string "password_digest"
    t.string "nickname"
    t.boolean "admin"
    t.boolean "accessible", default: true
    t.string "slug"
    t.datetime "confirmed_at"
    t.string "reset_token"
    t.datetime "reset_at"
    t.datetime "deleted_at"
    t.string "new_email"
    t.string "avatar"
    t.string "facebook"
    t.string "google"
    t.string "linkedin"
    t.string "address"
    t.string "city"
    t.string "state"
    t.string "zipcode"
    t.string "country"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "affiliate_user_id_tier1"
    t.integer "affiliate_user_id_tier2"
    t.integer "affiliate_user_id_tier3"
    t.string "affiliate_key"
    t.datetime "affiliate_key_created_at"
    t.index ["affiliate_key"], name: "index_users_on_affiliate_key", unique: true
  end

  create_table "withdrawals", force: :cascade do |t|
    t.bigint "user_id"
    t.string "slug"
    t.json "balances", default: {}
    t.decimal "amount_btc", default: "0.0"
    t.decimal "amount_usd", default: "0.0"
    t.string "status", default: "reserved"
    t.integer "last_modified_by_admin_id"
    t.datetime "processed_at"
    t.datetime "cancelled_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_withdrawals_on_user_id"
  end

  add_foreign_key "accounts", "cryptos"
  add_foreign_key "accounts", "users"
  add_foreign_key "events", "nodes"
  add_foreign_key "node_price_histories", "nodes"
  add_foreign_key "rewards", "nodes"
  add_foreign_key "transactions", "accounts"
  add_foreign_key "transactions", "rewards"
  add_foreign_key "transactions", "withdrawals"
  add_foreign_key "withdrawals", "users"
end
