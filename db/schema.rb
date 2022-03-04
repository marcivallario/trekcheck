# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_03_03_195755) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accommodations", force: :cascade do |t|
    t.datetime "checkin"
    t.datetime "checkout"
    t.string "name"
    t.string "address_1"
    t.string "address_2"
    t.string "city"
    t.string "state"
    t.integer "zip"
    t.string "country"
    t.string "confirmation"
    t.string "phone"
    t.text "notes"
    t.integer "trip_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "ffnumbers", force: :cascade do |t|
    t.string "airline"
    t.string "number"
    t.string "string"
    t.integer "passenger_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "flights", force: :cascade do |t|
    t.string "leg"
    t.string "airline"
    t.string "flight_no"
    t.string "dep_airport"
    t.datetime "dep_time"
    t.string "arr_airport"
    t.datetime "arr_time"
    t.string "seat"
    t.string "confirmation"
    t.text "notes"
    t.integer "trip_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "passengers", force: :cascade do |t|
    t.integer "user_id"
    t.string "legal_first_name"
    t.string "legal_last_name"
    t.string "nickname"
    t.string "position"
    t.string "department"
    t.string "cell"
    t.string "email"
    t.string "dob"
    t.string "country_of_residence"
    t.string "state_of_residence"
    t.string "passport"
    t.string "license"
    t.string "tsa_precheck"
    t.string "global_entry"
    t.string "seat_assignment_pref"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "projects", force: :cascade do |t|
    t.string "job_no"
    t.string "job_name"
    t.string "production_co"
    t.string "agency"
    t.string "client"
    t.boolean "active"
    t.integer "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "transportations", force: :cascade do |t|
    t.string "direction"
    t.datetime "date"
    t.string "trans_mode"
    t.string "confirmation"
    t.text "notes"
    t.integer "trip_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "trips", force: :cascade do |t|
    t.date "depart"
    t.date "return"
    t.boolean "itinerary_sent"
    t.integer "project_id"
    t.integer "passenger_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

end
