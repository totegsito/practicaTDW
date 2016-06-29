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
            if(Auth::user()->enabled == 1){
                return view('layouts.user.user');
            }else{
                return view('layouts.user.usernotenabled');
            }
        });
        Route::get('profile', function (){
            return view('layouts.profile', ["id"=>Auth::user()->id]);
        });
    });
});;

Route::auth();

Route::get('/', 'HomeController@index');

