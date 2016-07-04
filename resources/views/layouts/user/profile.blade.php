@extends('layouts.profile')


@section('user-navbar')
    <li><a href="{{ url('user/padel') }}">Padel Courts</a></li>
    <li><a href="{{ url('user/history') }}">My history</a></li>
@endsection