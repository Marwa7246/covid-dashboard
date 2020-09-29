class CreateCountries < ActiveRecord::Migration[6.0]
  def change
    create_table :countries do |t|
      t.string :name
      t.string :iso3
      t.string :latitude
      t.string :longitude

      t.timestamps
    end
  end
end
