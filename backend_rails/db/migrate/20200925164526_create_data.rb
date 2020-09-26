class CreateData < ActiveRecord::Migration[6.0]
  def change
    create_table :data do |t|
      t.string :key
      t.string :value

      t.timestamps
    end
  end
end
