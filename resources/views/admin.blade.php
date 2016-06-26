@extends('layouts.app')

@section('content')

    <main class="container">
        <section class="col-md-4 col-lg-4 col-lg-offset-4 col-md-offset-4">
            <article class="panel panel-primary">
                <header class="panel-heading">
                    Administración
                </header>
                <main class="list-group">
                    <a class="list-group-item" href="{{url('admin/users')}}">Gestión de usuarios</a>
                    <a class="list-group-item" href="{{url('admin/courts')}}">Gestión de pistas</a>
                    <a class="list-group-item" href="{{url('admin/profile')}}">Mi perfil</a>
                </main>
            </article>

        </section>

    </main>
@endsection