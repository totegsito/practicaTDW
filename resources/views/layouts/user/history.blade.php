@extends('layouts.user.user')

@section('user-navbar')
    <li><a href="{{ url('user/padel') }}">Padel Courts</a></li>
    <li class="active"><a href="{{ url('user/history') }}">My history</a></li>
@endsection

@section('content')
    <div class="alert alert-success hidden" role="alert" id="alert">
        {{--<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>--}}
    </div>

    <section class="col-xs-12">
        <article class="panel panel-success">
            <header class="panel-heading">
                <h1>My reservations</h1>
                <h5>User: <strong id="user-id">{{ Auth::user()->id }}</strong></h5>
            </header>
            <main class="table-responsive">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Match Date</th>
                            <th>Court</th>
                            <th>1<sup>st</sup> Player</th>
                            <th>2<sup>nd</sup> Player</th>
                            <th>3<sup>rd</sup> Player</th>
                            <th>4<sup>th</sup> Player</th>
                            <th>Reservation date</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </main>

        </article>

        <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                    aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Delete User</h4>
                    </div>
                    <div class="modal-body">
                        <p>Do you really want to delete the user?</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn  btn-raised btn-default" data-dismiss="modal">Close</button>
                        <button type="button" class="btn  btn-raised btn-danger" id="apply-delete">Delete</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

        <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" data-id="">
            <div class="modal-dialog modal-sm" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                    aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title" id="editModal">Edit User</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizontal" id="form-edit">
                            <input type="hidden" id="reservation-id">
                            <div class="form-group">
                                <label for="reservation-date" class="control-label">Date:</label>
                                <input type="text" class="form-control" id="reservation-date">
                                <span>
                                    <strong id="dateInfo" class="help-block hidden"></strong>
                                </span>
                            </div>
                            <div class="form-group">
                                <div class="radio radio-primary">
                                    <label>
                                        <input type="radio" name="putRadios" id="putRadios1" value="10">10:00
                                    </label>
                                </div>
                                <div class="radio radio-primary">
                                    <label>
                                        <input type="radio" name="putRadios" id="putRadios2" value="11">11:00
                                    </label>
                                </div>
                                <div class="radio radio-primary">
                                    <label>
                                        <input type="radio" name="putRadios" id="putRadios3" value="12">12:00
                                    </label>
                                </div>
                                <div class="radio radio-primary">
                                    <label>
                                        <input type="radio" name="putRadios" id="putRadios4" value="13">13:00
                                    </label>
                                </div>
                                <div class="radio radio-primary">
                                    <label>
                                        <input type="radio" name="putRadios" id="putRadios5" value="17">17:00
                                    </label>
                                </div>
                                <div class="radio radio-primary">
                                    <label>
                                        <input type="radio" name="putRadios" id="putRadios6" value="18">18:00
                                    </label>
                                </div>
                                <div class="radio radio-primary">
                                    <label>
                                        <input type="radio" name="putRadios" id="putRadios7" value="19">19:00
                                    </label>
                                </div>
                                <div class="radio radio-primary">
                                    <label>
                                        <input type="radio" name="putRadios" id="putRadios8" value="20">20:00
                                    </label>
                                </div>
                                <div class="radio radio-primary">
                                    <label>
                                        <input type="radio" name="putRadios" id="putRadios9" value="21">21:00
                                    </label>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="reservation-user" class="control-label">User Id:</label>
                                <input type="number" class="form-control" id="reservation-user" min="1">
                                <span>
                                    <strong id="userInfo" class="help-block hidden"></strong>
                                </span>
                            </div>
                            <div class="form-group">
                                <label for="reservation-court" class="control-label">Court Id:</label>
                                <input type="number" class="form-control" id="reservation-court" min="1">
                                <span>
                                    <strong id="courtInfo" class="help-block hidden"></strong>
                                </span>
                            </div>
                            <div class="form-group">
                                <label for="reservation-first" class="control-label">1st Player:</label>
                                <input type="text" class="form-control" id="reservation-first">
                            </div>
                            <div class="form-group">
                                <label for="reservation-second" class="control-label">2nd Player:</label>
                                <input type="text" class="form-control" id="reservation-second">
                            </div>
                            <div class="form-group">
                                <label for="reservation-third" class="control-label">3rd Player:</label>
                                <input type="text" class="form-control" id="reservation-third">
                            </div>
                            <div class="form-group">
                                <label for="reservation-fourth" class="control-label">4th Player:</label>
                                <input type="text" class="form-control" id="reservation-fourth">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn  btn-raised btn-default" data-dismiss="modal">Cancel</button>
                        <button type="button" class="btn  btn-raised btn-warning" id="apply-edit">Apply Changes</button>
                    </div>
                </div>
            </div>
        </div>

    </section>
@endsection

@section('scripts')
    <script src="{{asset('js/history.js')}}"></script>
@endsection