class CreateAllTables < ActiveRecord::Migration
  def self.up
    create_table "feedbacks", :force => true do |t|
      t.string    "user_id", :null => false
      t.string    "url"
      t.datetime  "created", :null => false
      t.integer   "status"
      t.string    "comment", :default => nil
    end
    add_index(:feedbacks, [:id, :created], :name => "index_id_created")
    add_index(:feedbacks, [:user_id, :created], :name => "index_user_id_created")
  end

  def self.down
    drop_table(:feedbacks)
  end
end
