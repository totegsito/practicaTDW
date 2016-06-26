@extends('layouts.app')

@section('content')
    <main class="container">
        <section>
        @yield('management-content')
        </section>
        <aside>
            <article class="panel panel-primary">
                <div class="panel-heading">
                    Management
                </div>
                <div class="list-group">
                    <a href="{{url('admin/users')}}" class="list-group-item">Users<span class="badge"
                                                                                      id="enabled-request"></span> </a>
                    <a href="{{url('admin/courts')}}" class="list-group-item">Courts</a>
                    <a href="{{url('admin/profile')}}" class="list-group-item">My profile</a>
                    <a href="{{url('admin/reservations')}}" class="list-group-item">Reservations</a>
                </div>
            </article>
        </aside>
    </main>
    <script src="{{ asset('js/admin.js') }}"></script>

@endsection