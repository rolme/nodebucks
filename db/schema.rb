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

ActiveRecord::Schema.define(version: 2018_06_15_212051) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "cryptos", force: :cascade do |t|
    t.string "slug"
    t.string "name"
    t.string "symbol"
    t.string "url"
    t.string "status"
    t.integer "nodes"
    t.decimal "node_price"
    t.decimal "price"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "stake"
    t.float "purchasable_price"
    t.decimal "estimated_node_price"
    t.decimal "flat_setup_fee", default: "0.0"
    t.decimal "percentage_setup_fee", default: "0.2"
    t.decimal "percentage_hosting_fee", default: "0.01"
    t.decimal "percentage_conversion_fee", default: "0.03"
    t.decimal "daily_reward"
  end

  create_table "nodes", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "crypto_id"
    t.string "status", default: "new"
    t.string "ip"
    t.decimal "cost"
    t.integer "created_by_admin_id"
    t.datetime "online_at"
    t.datetime "sold_at"
    t.string "version"
    t.datetime "last_upgraded_at"
    t.string "vps_provider"
    t.string "vps_url"
    t.decimal "vps_monthly_cost"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["crypto_id"], name: "index_nodes_on_crypto_id"
    t.index ["user_id"], name: "index_nodes_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first"
    t.string "last"
    t.string "email"
    t.string "password_digest"
    t.string "nickname"
    t.boolean "admin"
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
    t.string "location"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "nodes", "cryptos"
  add_foreign_key "nodes", "users"
end
