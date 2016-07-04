@extends('layouts.admin.management')

@section('admin-navbar')
    <li><a href="{{ url('admin/users') }}">Users</a></li>
    <li><a href="{{ url('admin/courts') }}">Courts</a></li>
    <li class="active"><a href="{{ url('admin/reservations') }}">Reservations</a></li>
@endsection

@section('management-content')
    <div class="alert alert-success hidden" role="alert" id="alert">
        {{--<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>--}}
    </div>
    <article class="panel panel-success">
        <header class="panel-heading">
            <h1>Reservations</h1>
        </header>
        <div class="table-responsive">
            <table class="table table-striped" id="reservations-table">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Reservation date</th>
                    <th>User Id</th>
                    <th>Court Id</th>
                    <th>Player 1</th>
                    <th>Player 2</th>
                    <th>Player 3</th>
                    <th>Player 4</th>
                    <th>Created At</th>
                    <th>Options</th>
                </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>

        <footer class="panel-footer">
            <button type="button" class="btn btn-raised btn-primary" data-toggle="modal" data-target="#addModal">Add
                Reservation
            </button>
        </footer>

        <div class="modal fade" id="addModal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                    aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Add Reservation</h4>
                    </div>
                    <div class="modal-body">
                        <form id="formAddReservation" class="form-horizontal">
                            <div class="form-group">
                                <label for="add-date" class="control-label">Date:</label>
                                <input type="text" class="form-control" id="add-date">
                                <span>
                                    <strong id="addDateInfo" class="help-block hidden"></strong>
                                </span>
                            </div>
                            <div class="form-group">
                                    <div class="col-md-10">
                                        <div class="radio radio-primary">
                                            <label>
                                                <input type="radio" name="optionsRadios" id="optionsRadios1" value="10">10:00
                                            </label>
                                        </div>
                                        <div class="radio radio-primary">
                                            <label>
                                                <input type="radio" name="optionsRadios" id="optionsRadios2" value="11">11:00
                                            </label>
                                        </div>
                                        <div class="radio radio-primary">
                                            <label>
                                                <input type="radio" name="optionsRadios" id="optionsRadios3" value="12">12:00
                                            </label>
                                        </div>
                                        <div class="radio radio-primary">
                                            <label>
                                                <input type="radio" name="optionsRadios" id="optionsRadios4" value="13">13:00
                                            </label>
                                        </div>
                                        <div class="radio radio-primary">
                                            <label>
                                                <input type="radio" name="optionsRadios" id="optionsRadios5" value="17">17:00
                                            </label>
                                        </div>
                                        <div class="radio radio-primary">
                                            <label>
                                                <input type="radio" name="optionsRadios" id="optionsRadios6" value="18">18:00
                                            </label>
                                        </div>
                                        <div class="radio radio-primary">
                                            <label>
                                                <input type="radio" name="optionsRadios" id="optionsRadios7" value="19">19:00
                                            </label>
                                        </div>
                                        <div class="radio radio-primary">
                                            <label>
                                                <input type="radio" name="optionsRadios" id="optionsRadios8" value="20">20:00
                                            </label>
                                        </div>
                                        <div class="radio radio-primary">
                                            <label>
                                                <input type="radio" name="optionsRadios" id="optionsRadios9" value="21">21:00
                                            </label>
                                        </div>
                                    </div>
                            </div>
                            <div class="form-group">
                                <label for="add-user" class="control-label">User Id:</label>
                                <input type="number" class="form-control" id="add-user" min="1">
                                <span>
                                    <strong id="addUserInfo" class="help-block hidden"></strong>
                                </span>
                            </div>
                            <div class="form-group">
                                <label for="add-court" class="control-label">Court Id:</label>
                                <input type="number" class="form-control" id="add-court" min="1">
                                <span>
                                    <strong id="addCourtInfo" class="help-block hidden"></strong>
                                </span>
                            </div>
                            <div class="form-group">
                                <label for="add-first" class="control-label">1st Player:</label>
                                <input type="text" class="form-control" id="add-first">
                            </div>
                            <div class="form-group">
                                <label for="add-second" class="control-label">2nd Player:</label>
                                <input type="text" class="form-control" id="add-second">
                            </div>
                            <div class="form-group">
                                <label for="add-third" class="control-label">3rd Player:</label>
                                <input type="text" class="form-control" id="add-third">
                            </div>
                            <div class="form-group">
                                <label for="add-fourth" class="control-label">4th Player:</label>
                                <input type="text" class="form-control" id="add-fourth">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn  btn-raised btn-default" data-dismiss="modal">Close</button>
                        <button type="button" class="btn  btn-raised btn-success" id="apply-add">Add</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->


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
    </article>
@endsection

@section('scripts')
    <script src="{{asset('js/admin-reservations.js')}}"></script>
@endsection