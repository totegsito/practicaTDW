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


Route::resource('api/users', 'UsersController');
Route::options('api/users', 'UsersController@options');
Route::resource('api/courts', 'CourtsController');
Route::options('api/courts', 'CourtsController@options');



Route::auth();

Route::get('/', 'HomeController@index');
Route::resource('home', 'HomeController@index');
Route::get('admin', 'AdminController@index');
Route::get('admin/users', 'AdminController@users');
Route::get('admin/courts', 'AdminController@courts');


