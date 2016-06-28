@extends('layouts.app')

@section('content')

    <main class="container">
        <section class="col-md-4 col-lg-4 col-lg-offset-4 col-md-offset-4">
            <article class="panel panel-primary">
                <header class="panel-heading">
                    Management
                </header>
                <main class="list-group">
                    <a class="list-group-item" href="{{url('admin/users')}}">Users Management</a>
                    <a class="list-group-item" href="{{url('admin/courts')}}">Courts Management</a>
                    <a class="list-group-item" href="{{url('admin/reservations')}}">Reservations Management</a>
                    <a class="list-group-item" href="{{url('admin/profile')}}">My profile</a>
                </main>
            </article>

        </section>

    </main>
@endsection