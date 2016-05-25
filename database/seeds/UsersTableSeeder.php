<?php
use Illuminate\Database\Seeder;

// Hace uso del modelo de User.
use App\Users;

class UsersTableSeeder extends Seeder {

    /**
     * Run the database seeds.
     *
     * @return void
     */
    
    
    public function run()
    {

        $faker = Faker\Factory::create();
        
        Users::create(
            [
                'email'=>$faker->email,
                'name' => $faker->firstName,
                'surname' => $faker->lastName,
                'telephone' => $faker->phoneNumber,
                'username'=>$faker->userName,
                'password'=> Hash::make('abc123'),
                'roles'=>0
            ]);
        Users::create(
            [
                'email'=>$faker->email,
                'name' => $faker->firstName,
                'surname' => $faker->lastName,
                'telephone' => $faker->phoneNumber,
                'username'=>$faker->userName,
                'password'=>Hash::make('admin123'),
                'roles'=>1
            ]
        );

    }
}