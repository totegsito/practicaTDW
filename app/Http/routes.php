<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/



Route::group(['middleware'=>'auth.basic'], function(){
   Route::group(['prefix'=>'api'], function(){
       Route::resource('users', 'UsersController');
       Route::options('users', 'UsersController@options');
       Route::resource('courts', 'CourtsController', ['except'=>['edit', 'create']]);
       Route::options('courts', 'CourtsController@options');
       Route::resource('reservations', 'ReservationsController', ['except'=>['edit', 'create']]);
   });

   Route::group(['prefix'=>'admin'], function (){
       Route::get('/', function (){
           return view('admin');
       });
       Route::get('users', function (){
           return view('layouts.users');
       });
       Route::get('courts', function (){
           return view('layouts.courts');
       });
       Route::get('profile', function (){
           return view('layouts.profile', ["id"=>Auth::user()->id]);
       });
   }) ;

    Route::group(['prefix'=>'user'],function (){
        Route::get('/', function (){
            return view('layouts.user');
        });
    });
});;

Route::auth();

Route::get('/', 'HomeController@index');


/*Route::group(['middleware'=>'auth.basic', 'prefix'=>'admin'], function (){
        Route::get('/', function (){
            return view('admin');
        });
        Route::get('users', function (){
            return view('layouts.users');
        });
        Route::get('courts', function (){
            return view('layouts.courts');
        });
        Route::get('profile', function (){
            return view('layouts.profile', ["id"=>Auth::user()->id]);
        });
});*/



/*Route::group(['middleware'=>'auth.basic', 'prefix'=>"api"],function (){
    Route::resource('users', 'UsersController', ['except'=>['edit', 'create']]);
    Route::options('users', 'UsersController@options');
    Route::resource('courts', 'CourtsController', ['except'=>['edit', 'create']]);
    Route::options('courts', 'CourtsController@options');
    Route::resource('reservations', 'ReservationsController', ['except'=>['edit', 'create']]);
});*/


/*
Route::get('admin', 'AdminController@index');
Route::get('admin/users', 'AdminController@users');
Route::get('admin/courts', 'AdminController@courts');
Route::get('admin/profile', 'AdminController@profile');*/
