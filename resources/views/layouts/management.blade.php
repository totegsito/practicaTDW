@extends('layouts.app')

@section('content')
    <main class="container">

        <section class="col-md-9 col-md-push-3">

        @yield('management-content')
        </section>
        <aside class="col-md-3 col-md-pull-9">

            <article class="panel panel-primary">
                <div class="panel-heading">
                    Administración
                </div>
                <div class="list-group">
                    <a href="{{url('admin/users')}}" class="list-group-item">Usuarios<span class="badge"
                                                                                      id="enabled-request"></span> </a>
                    <a href="{{url('admin/courts')}}" class="list-group-item">Pistas</a>
                </div>
            </article>
        </aside>
    </main>
@endsection