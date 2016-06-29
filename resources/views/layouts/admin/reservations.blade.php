@extends('layouts.admin.management')

@section('management-content')
    <div class="alert alert-success hidden" role="alert" id="alert">
        {{--<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>--}}
    </div>
    <article class="panel panel-primary">
        <header class="panel-heading">
            <h1>Reservations</h1>
        </header>
        <div class="table-responsive">

            <table class="table table-striped" id="reservations-table">
                <thead>
                <tr><th>Id</th>
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


        <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog">
            <div class="modal-dialog modal-sm">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
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
                        <form id="form-edit">
                            <input type="hidden" id="reservation-id">
                            <div class="form-group">
                                <label for="reservation-date" class="control-label">Date:</label>
                                <input type="text" class="form-control" id="reservation-date"
                                       pattern="^\d\d\d\d-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01]) (1(1|2|3||7|8|9)|2(0|1)):00:00$">
                                <span>
                                    <strong id="dateInfo" class="help-block hidden"></strong>
                                </span>
                            </div>
                            <div class="form-group">
                                <label for="reservation-user" class="control-label">User Id:</label>
                                <input type="number" class="form-control" id="reservation-user" min="1">
                            </div>
                            <div class="form-group">
                                <label for="reservation-court" class="control-label">Court Id:</label>
                                <input type="number" class="form-control" id="reservation-court" min="1">
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
    <script src="{{asset('js/admin-reservations.js')}}" ></script>
@endsection