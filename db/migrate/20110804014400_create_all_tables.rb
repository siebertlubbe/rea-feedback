class CreateAllTables < ActiveRecord::Migration
  def self.up
    create_table "feedbacks", :force => true do |t|
      t.string    "user_id", :null => false
      t.string    "url"
      t.datetime  "created_at", :null => false
      t.integer   "status"
      t.string    "comment", :default => nil
    end
    add_index(:feedbacks, [:id, :created_at], :name => "index_id_created_at")
    add_index(:feedbacks, [:user_id, :created_at], :name => "index_user_id_created_at")
  end

  def self.down
    drop_table(:feedbacks)
  end
end
