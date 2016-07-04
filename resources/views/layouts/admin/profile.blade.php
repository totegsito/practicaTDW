@extends('layouts.profile')


@section('admin-navbar')
    <li><a href="{{ url('admin/users') }}">Users</a></li>
    <li><a href="{{ url('admin/courts') }}">Courts</a></li>
    <li><a href="{{ url('admin/reservations') }}">Reservations</a></li>
@endsection