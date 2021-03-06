@extends('layouts.user-authenticated')

@section('content')

    <main class="container">
        <section class="col-md-4 col-lg-4 col-lg-offset-4 col-md-offset-4">
            <article class="panel panel-success">
                <header class="panel-heading">
                    <h3>Management</h3>
                </header>
                <main class="list-group">
                    <a class="list-group-item" href="{{url('admin/users')}}"><h5>Users Management</h5></a>
                    <a class="list-group-item" href="{{url('admin/courts')}}"><h5>Courts Management</h5></a>
                    <a class="list-group-item" href="{{url('admin/reservations')}}"><h5>Reservations Management</h5></a>
                </main>
            </article>

        </section>

    </main>
@endsection

@section('navbar')
    <li class="active"><a href="{{ url('/') }}">Home</a></li>
    <li><a href="{{ url('admin/users') }}">Users</a></li>
    <li><a href="{{ url('admin/courts') }}">Courts</a></li>
    <li><a href="{{ url('admin/reservations') }}">Reservations</a></li>
@endsection