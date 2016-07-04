@extends('layouts.profile')


@section('navbar')
    <li><a href="{{ url('user/padel') }}">Padel Courts</a></li>
    <li><a href="{{ url('user/history') }}">My history</a></li>
@endsection