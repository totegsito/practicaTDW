<?php

use Illuminate\Database\Seeder;
use App\Court;
class CourtsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker\Factory::create();
        
        for($i = 0; $i<6; $i++){
            Court::create(['avaliable'=>$faker->boolean(90)]);
        }
    }
}
