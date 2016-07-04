@extends('layouts.app')

@section('user-nav')
    <li><a href="{{ url('/login') }}">Login</a></li>
    <li><a href="{{ url('/register') }}">Register</a></li>
@endsection
