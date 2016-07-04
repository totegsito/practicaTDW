@extends('layouts.user-authenticated')

@section('navbar')
    <li><a href="{{ url('/') }}">Home</a></li>
    @yield('user-navbar')
@endsection
