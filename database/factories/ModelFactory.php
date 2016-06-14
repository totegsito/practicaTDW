<?php

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| Here you may define all of your model factories. Model factories give
| you a convenient way to create models for testing and seeding your
| database. Just tell the factory how a default model should look.
|
*/

$factory->define(App\Users::class, function (Faker\Generator $faker) {
    return [
        'name' => $faker->userName,
        'email' => $faker->safeEmail,
        'telephone' => $faker->phoneNumber,
        'firstname'=> $faker->name,
        'surname' => $faker->word,
        'password' => bcrypt(str_random(10))
    ];
});

$factory->define(App\Court::class, function (Faker\Generator $faker){
    return [
        'avaliable' => $faker->boolean(90),
    ];
});
