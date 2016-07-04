@extends('layouts.user.user')
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
                <a href="{{url('user/padel')}}" role="button" class="btn btn-raised btn-success">Reserve</a>
                <a  href="{{url('user/history')}}" role="button" class="btn btn-raised btn-success">My Reservations</a>
            </footer>
        </section>
    </main>
@endsection

@section('navbar')
    <li class="active"><a href="{{ url('/') }}">Home</a></li>
    <li><a href="{{ url('user/padel') }}">Padel Courts</a></li>
    <li><a href="{{ url('user/history') }}">My history</a></li>
@endsection