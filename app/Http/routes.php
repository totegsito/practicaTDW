<?php




Route::group(['middleware'=>'auth.basic'], function(){
   Route::group(['prefix'=>'api'], function(){
       Route::resource('users', 'UsersController', ['except'=>['edit', 'create']]);
       Route::options('users', 'UsersController@options');
       Route::put('users/password/{id}', 'UsersController@changePassword');
       Route::get('users/reservations/{id}', "ReservationsController@getReservationsByUserId");
       Route::resource('courts', 'CourtsController', ['except'=>['edit', 'create']]);
       Route::options('courts', 'CourtsController@options');
       Route::resource('reservations', 'ReservationsController', ['except'=>['edit', 'create']]);
       Route::get('reservations/user/{users_id}/{reservation_date?}', 'ReservationsController@getReservationsByUserId');
   });

   Route::group(['prefix'=>'admin'], function (){
       Route::get('/', function (){
           return view('admin');
       });
       Route::get('users', function (){
           return view('layouts.admin.users');
       });
       Route::get('courts', function (){
           return view('layouts.admin.courts');
       });
       Route::get('profile', function (){
           return view('layouts.profile', ["id"=>Auth::user()->id]);
       });
       Route::get('reservations', function (){
           return view('layouts.admin.reservations');
       });
   }) ;

    Route::group(['prefix'=>'user'],function (){
        Route::get('/', function (){
            return view('layouts.user.user');
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
