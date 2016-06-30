@extends('layouts.app')

@section('content')
        <section>
        @yield('management-content')
        </section>
        <aside>
            <article class="panel panel-success">
                <div class="panel-heading">
                    <h3>Management</h3>
                </div>
                <div class="list-group">
                    <a href="{{url('admin/users')}}" class="list-group-item"><h5>Users</h5><span class="badge"
                                                                                      id="enabled-request"></span> </a>
                    <a href="{{url('admin/courts')}}" class="list-group-item"><h5>Courts</h5></a>
                    <a href="{{url('admin/reservations')}}" class="list-group-item"><h5>Reservations</h5></a>
                </div>
            </article>
        </aside>

@endsection