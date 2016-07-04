@extends('layouts.user.user')

@section('user-navbar')
    <li class="active"><a href="{{ url('user/padel') }}">Padel Courts</a></li>
    <li><a href="{{ url('user/history') }}">My history</a></li>
@endsection

@section('content')
    <div class="alert alert-success hidden" role="alert" id="alert">
        {{--<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>--}}
    </div>
    <section class="col-md-8 col-md-offset-1 col-md-push-3">
        <header>
            <ul id="nav-days" class="nav nav-tabs success">
                <li><a href="#sunday" data-toggle="tab">Sunday</a></li>
                <li><a href="#monday" data-toggle="tab">Monday</a></li>
                <li><a href="#tuesday" data-toggle="tab">Tuesday</a></li>
                <li><a href="#wednesday" data-toggle="tab">Wednesday</a></li>
                <li><a href="#thursday" data-toggle="tab">Thursday</a></li>
                <li><a href="#friday" data-toggle="tab">Friday</a></li>
                <li><a href="#saturday" data-toggle="tab">Saturday</a></li>
            </ul>
        </header>
        <article id="tabs" class="tab-content">
            <div class="tab-pane fade" id="sunday">
                <ul class="nav nav-tabs success">
                    <li><a href="#10" data-toggle="tab">10:00</a></li>
                    <li><a href="#11" data-toggle="tab">11:00</a></li>
                    <li><a href="#12" data-toggle="tab">12:00</a></li>
                    <li><a href="#13" data-toggle="tab">13:00</a></li>
                    <li><a href="#17" data-toggle="tab">17:00</a></li>
                    <li><a href="#18" data-toggle="tab">18:00</a></li>
                    <li><a href="#19" data-toggle="tab">19:00</a></li>
                    <li><a href="#20" data-toggle="tab">20:00</a></li>
                    <li><a href="#21" data-toggle="tab">21:00</a></li>
                </ul>
            </div>
            <div class="tab-pane fade" id="monday">
                <ul class="nav nav-tabs success">
                    <li><a href="#10" data-toggle="tab">10:00</a></li>
                    <li><a href="#11" data-toggle="tab">11:00</a></li>
                    <li><a href="#12" data-toggle="tab">12:00</a></li>
                    <li><a href="#13" data-toggle="tab">13:00</a></li>
                    <li><a href="#17" data-toggle="tab">17:00</a></li>
                    <li><a href="#18" data-toggle="tab">18:00</a></li>
                    <li><a href="#19" data-toggle="tab">19:00</a></li>
                    <li><a href="#20" data-toggle="tab">20:00</a></li>
                    <li><a href="#21" data-toggle="tab">21:00</a></li>
                </ul>
            </div>
            <div class="tab-pane fade" id="tuesday">
                <ul class="nav nav-tabs success">
                    <li><a href="#10" data-toggle="tab">10:00</a></li>
                    <li><a href="#11" data-toggle="tab">11:00</a></li>
                    <li><a href="#12" data-toggle="tab">12:00</a></li>
                    <li><a href="#13" data-toggle="tab">13:00</a></li>
                    <li><a href="#17" data-toggle="tab">17:00</a></li>
                    <li><a href="#18" data-toggle="tab">18:00</a></li>
                    <li><a href="#19" data-toggle="tab">19:00</a></li>
                    <li><a href="#20" data-toggle="tab">20:00</a></li>
                    <li><a href="#21" data-toggle="tab">21:00</a></li>
                </ul>
            </div>
            <div class="tab-pane fade" id="wednesday">
                <ul class="nav nav-tabs success">
                    <li><a href="#10" data-toggle="tab">10:00</a></li>
                    <li><a href="#11" data-toggle="tab">11:00</a></li>
                    <li><a href="#12" data-toggle="tab">12:00</a></li>
                    <li><a href="#13" data-toggle="tab">13:00</a></li>
                    <li><a href="#17" data-toggle="tab">17:00</a></li>
                    <li><a href="#18" data-toggle="tab">18:00</a></li>
                    <li><a href="#19" data-toggle="tab">19:00</a></li>
                    <li><a href="#20" data-toggle="tab">20:00</a></li>
                    <li><a href="#21" data-toggle="tab">21:00</a></li>
                </ul>
            </div>
            <div class="tab-pane fade" id="thursday">
                <ul class="nav nav-tabs success">
                    <li><a href="#10" data-toggle="tab">10:00</a></li>
                    <li><a href="#11" data-toggle="tab">11:00</a></li>
                    <li><a href="#12" data-toggle="tab">12:00</a></li>
                    <li><a href="#13" data-toggle="tab">13:00</a></li>
                    <li><a href="#17" data-toggle="tab">17:00</a></li>
                    <li><a href="#18" data-toggle="tab">18:00</a></li>
                    <li><a href="#19" data-toggle="tab">19:00</a></li>
                    <li><a href="#20" data-toggle="tab">20:00</a></li>
                    <li><a href="#21" data-toggle="tab">21:00</a></li>
                </ul>
            </div>
            <div class="tab-pane fade" id="friday">
                <ul class="nav nav-tabs success">
                    <li><a href="#10" data-toggle="tab">10:00</a></li>
                    <li><a href="#11" data-toggle="tab">11:00</a></li>
                    <li><a href="#12" data-toggle="tab">12:00</a></li>
                    <li><a href="#13" data-toggle="tab">13:00</a></li>
                    <li><a href="#17" data-toggle="tab">17:00</a></li>
                    <li><a href="#18" data-toggle="tab">18:00</a></li>
                    <li><a href="#19" data-toggle="tab">19:00</a></li>
                    <li><a href="#20" data-toggle="tab">20:00</a></li>
                    <li><a href="#21" data-toggle="tab">21:00</a></li>
                </ul>
            </div>
            <div class="tab-pane fade" id="saturday">
                <ul class="nav nav-tabs success">
                    <li><a href="#10" data-toggle="tab">10:00</a></li>
                    <li><a href="#11" data-toggle="tab">11:00</a></li>
                    <li><a href="#12" data-toggle="tab">12:00</a></li>
                    <li><a href="#13" data-toggle="tab">13:00</a></li>
                    <li><a href="#17" data-toggle="tab">17:00</a></li>
                    <li><a href="#18" data-toggle="tab">18:00</a></li>
                    <li><a href="#19" data-toggle="tab">19:00</a></li>
                    <li><a href="#20" data-toggle="tab">20:00</a></li>
                    <li><a href="#21" data-toggle="tab">21:00</a></li>
                </ul>
            </div>
        </article>
        <article id="tabs-text" class="well tab-content">
            <div class="tab-pane fade" id="10">
            </div>
            <div class="tab-pane fade" id="11">
            </div>
            <div class="tab-pane fade" id="12">
            </div>
            <div class="tab-pane fade" id="13">
            </div>
            <div class="tab-pane fade" id="17">
            </div>
            <div class="tab-pane fade" id="18">
            </div>
            <div class="tab-pane fade" id="19">
            </div>
            <div class="tab-pane fade" id="20">
            </div>
            <div class="tab-pane fade" id="21">
            </div>
            <footer>
                <button type="button" title="" id="save-btn" class="btn btn-info">Save</button>
                <button type="button" title="" id="recover-btn" class="btn btn-warning">Recover</button>
                <button type="button" title="" id="reserve-btn" class="btn btn-success">Reserve</button>
            </footer>
        </article>
    </section>
    <aside class="well col-md-3 col-md-pull-9 col-md-offset-0 col-sm-offset-4 col-xs-offset-1 col-xs-10 col-sm-4">
        <form class="form-horizontal">
            <fieldset>
                <legend>Players</legend>
                <div class="col-md-10 col-md-offset-1">
                    {!! Form::hidden('id', Auth::user()->id, ['class'=>'form-control', 'id'=>'user-id'] ) !!}
                    <div class="form-group label-static">
                        <label class="control-label" for="1st_player">Player 1</label>
                        <input type="text" class="form-control" id="1st_player">
                        <span>
                            <strong id="stInfo" class="help-block hidden"></strong>
                        </span>
                    </div>
                    <div class="form-group label-static">
                        <label class="control-label" for="2nd_player">Player 2</label>
                        <input type="text" class="form-control" id="2nd_player">
                        <span>
                            <strong id="ndInfo" class="help-block hidden"></strong>
                        </span>
                    </div>
                    <div class="form-group label-static">
                        <label class="control-label" for="3rd_player">Player 3</label>
                        <input type="text" class="form-control" id="3rd_player">
                        <span>
                            <strong id="rdInfo" class="help-block hidden"></strong>
                        </span>
                    </div>
                    <div class="form-group label-static">
                        <label class="control-label" for="4th_player">Player 4</label>
                        <input type="text" class="form-control" id="4th_player">
                        <span>
                            <strong id="thInfo" class="help-block hidden"></strong>
                        </span>
                    </div>
                </div>
            </fieldset>
        </form>
    </aside>
@endsection

@section('scripts')
    {!! Html::script('js/padel.js') !!}
@endsection