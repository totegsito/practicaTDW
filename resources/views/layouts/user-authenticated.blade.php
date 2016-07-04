@extends('layouts.app')

@section('user-nav')
    <li class="dropdown">
        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
            {{ Auth::user()->name }} <span class="caret"></span>
        </a>

        <ul class="dropdown-menu" role="menu">
            @if (Auth::user()->enabled == 1)
                <li><a href="{{ url( (Auth::user()->roles == 1 ? 'admin' : 'user').'/profile') }}"><i class="fa fa-btn fa-user"></i>My profile</a></li>
            @endif
            <li><a href="{{ url('/logout') }}"><i class="fa fa-btn fa-sign-out"></i>Logout</a></li>
        </ul>
    </li>
@endsection