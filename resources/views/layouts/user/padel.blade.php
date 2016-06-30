@extends('layouts.app')


@section('content')
<aside class="well col-md-3">
    <form class="form-horizontal">
        <fieldset>
            <legend>Players</legend>

            <div class="col-md-10 col-md-offset-1">

                <div class="form-group label-static">
                    <label class="control-label" for="1st_player">Player 1</label>
                    <input type="text" class="form-control" id="1st_player">
                </div>
                <div class="form-group label-static">
                    <label class="control-label" for="2nd_player">Player 2</label>
                    <input type="text" class="form-control" id="2nd_player">
                </div>
                <div class="form-group label-static">
                    <label class="control-label" for="3rd_player">Player 3</label>
                    <input type="text" class="form-control" id="3rd_player">
                </div>
                <div class="form-group label-static">
                    <label class="control-label" for="4th_player">Player 4</label>
                    <input type="text" class="form-control" id="4th_player">
                </div>
            </div>
        </fieldset>
    </form>
</aside>

    <section class="col-md-8 col-md-offset-1">
        <header>
            <ul class="nav nav-tabs success">
                <li><a href="#monday" data-toggle="tab">Monday</a></li>
                <li><a href="#tuesday" data-toggle="tab">Tuesday</a></li>
                <li><a href="#wednesday" data-toggle="tab">Wednesday</a></li>
                <li><a href="#thursday" data-toggle="tab">Thursday</a></li>
                <li><a href="#friday" data-toggle="tab">Friday</a></li>
                <li><a href="#saturday" data-toggle="tab">Saturday</a></li>
                <li><a href="#sunday" data-toggle="tab">Sunday</a></li>
            </ul>
        </header>
        <article class="well tab-content">
            <div class="tab-pane fade" id="monday">
            </div>
            <div class="tab-pane fade" id="tuesday">
            </div>
            <div class="tab-pane fade" id="wednesday">
            </div>
            <div class="tab-pane fade" id="thursday">
            </div>
            <div class="tab-pane fade" id="friday">
            </div>
            <div class="tab-pane fade" id="saturday">
            </div>
            <div class="tab-pane fade" id="sunday">
            </div>

        </article>


    </section>

@endsection

@section('scripts')
    {!! Html::script('js/padel.js') !!}

    @endsection