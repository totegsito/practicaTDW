<?php

namespace App\Http\Controllers;

use App\Http\Requests;

class AdminController extends Controller
{
    //


    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('admin');
    }
    
    public function users()
    {
        return view('layouts.users');
    }
    
    public function courts(){
        return view('layouts.courts');
    }
    
    public function profile(){
        return view('layouts.profile');
    }
}
