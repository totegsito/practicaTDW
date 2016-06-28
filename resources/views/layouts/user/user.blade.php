@extends('layouts.app')

@section('content')
    <main class="container">
        <section class="panel panel-success">
            <header class="panel-heading">
                <h3>Welcome to your Padel Courts Reservation System</h3>
            </header>
            <article class="panel-body">
                <h5>Here you can manage your reservations and reserve Padel Courts</h5>
            </article>
            <footer class="panel-footer">
                <input type="button" class="btn btn-success" value="My Reservations">
                <input type="button" class="btn btn-success" value="Reserve">
            </footer>
        </section>
    </main>


@endsection