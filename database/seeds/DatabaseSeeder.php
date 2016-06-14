<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent;
use App\Court;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UsersTableSeeder::class);
        $this->call(CourtsTableSeeder::class);
    }
}
