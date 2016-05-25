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
        Users::create(
            [
                'email'=>'test@test.es',
                'username'=>'test',
                'password'=> Hash::make('abc123'),
                'roles'=>0
            ]);
        Users::create(
            [
                'email'=>'admin@admin.es',
                'username'=>'admin',
                'password'=>Hash::make('admin123'),
                'roles'=>1
            ]
        );

    }
}