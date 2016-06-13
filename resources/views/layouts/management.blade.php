@extends('layouts.app')

@section('content')
    <main class="container">

        <section>

        @yield('management-content')
        </section>
        <aside>

            <article class="panel panel-primary">
                <div class="panel-heading">
                    Administración
                </div>
                <div class="list-group">
                    <a href="{{url('admin/users')}}" class="list-group-item">Usuarios<span class="badge"
                                                                                      id="enabled-request"></span> </a>
                    <a href="{{url('admin/courts')}}" class="list-group-item">Pistas</a>
                    <a href="{{url('admin/profile')}}" class="list-group-item">Mi perfil</a>

                </div>
            </article>
        </aside>
    </main>
    <script src="{{ asset('js/admin.js') }}"></script>

@endsection