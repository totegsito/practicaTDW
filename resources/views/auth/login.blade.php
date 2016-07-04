@extends('layouts.guest-user')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-success">
                <div class="panel-heading">
                    <h3>Login</h3>
                </div>
                <div class="panel-body">
                    <form class="form-horizontal" role="form" method="POST" action="{{ url('/login') }}">
                        {{ csrf_field() }}

                        <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                            <!--<label for="email" class="col-md-4 control-label">Email</label>-->
                            {!! Form::label('email', 'Email', ['class'=>'col-md-4 control-label']) !!}

                            <div class="col-md-6">

                                {!! Form::email('email', old('email'), ['class'=>'form-control', 'type'=>'email'] ) !!}
                                <!--<input id="email" type="text" class="form-control" name="email" value="{{ old('email') }}">-->

                                @if ($errors->has('email'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('email') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                            <!--<label for="password" class="col-md-4 control-label">Password</label>-->
                            {!! Form::label('password', 'Password', ['class'=>'col-md-4 control-label']) !!}

                            <div class="col-md-6">
                                {!! Form::password('password', ['class'=>'form-control'] ) !!}

                                <!--<input id="password" type="password" class="form-control" name="password">-->

                                @if ($errors->has('password'))
                                    <span class="help-block">
                                        <strong>{{ $errors->first('password') }}</strong>
                                    </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <div class="checkbox">
                                    <label>
                                        <input type="checkbox" name="remember"> Remember Me
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-raised btn-primary">
                                    <i class="fa fa-btn fa-sign-in"></i> Login
                                </button>

                                <a class="btn btn-raised btn-link" href="{{ url('/password/reset') }}">Forgot Your Password?</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection
@section("scripts")
    <script>
        $(document).ready(function () {
            $.material.init();
        });
    </script>
@endsection