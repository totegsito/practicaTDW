<?php
use Illuminate\Database\Seeder;



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

        $usernameValidator = function($user){
            return preg_match('/[a-zA-Z0-9-_]*/', $user) === 1;
        };
        
        Users::create([
            'email'=>'admin@admin.es',
            'name'=>'admin',
            'password'=>Hash::make('admin123'),
            'firstname' => $faker->firstName,
            'surname' => $faker->lastName,
            'telephone' => $faker->phoneNumber,
            'roles'=>'1',
            'enabled'=>'1'
        ]);
        
        
        for($i = 0; $i<5; $i++){

            Users::create(
                [
                    'email'=> $faker->unique()->email,
                    'firstname' => $faker->firstName,
                    'surname' => $faker->lastName,
                    'telephone' => $faker->phoneNumber,
                    'name'=>  str_replace('.', '_', $faker->unique()->userName),
                    'password'=> Hash::make('abc123'),
                    'enabled'=>$faker->boolean(),
                    'roles'=> '0'
                ]);
            Users::create(
                [
                    'email'=> $faker->unique()->email,
                    'firstname' => $faker->firstName,
                    'surname' => $faker->lastName,
                    'telephone' => $faker->phoneNumber,
                    'name'=>  str_replace('.', '_', $faker->unique()->userName),
                    'password'=>Hash::make('admin123'),
                    'roles'=> '1'
                ]
            );
        }

    }
}