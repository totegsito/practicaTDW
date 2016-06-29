@extends('layouts.admin.management')

@section('management-content')

    <div class="alert alert-success hidden" role="alert" id="alert">
        {{--<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>--}}
    </div>
    <article>
        <header>
            <h1>Courts</h1>
        </header>
        <div class="row" id="courts-space">
            <div class="col-xs-4" id="add-court">
                <div class="panel panel-primary">
                    <div class="panel-heading">
                        <h4>Add Court</h4>
                    </div>
                    <table class="table table-bordered court">
                        <tr>
                            <td><span class="glyphicon glyphicon-user"></span></td>
                            <td><span class="glyphicon glyphicon-user"></span></td>
                        </tr>
                        <tr>
                            <td><span class="glyphicon glyphicon-user"></span></td>
                            <td><span class="glyphicon glyphicon-user"></span></td>
                        </tr>
                    </table>
                    <div class="panel-footer">
                        <div class="btn-group" role="group">
                        <button id="add" type="button" class="btn  btn-raised btn-primary center">
                            <span class="glyphicon glyphicon-plus"></span>
                        </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>


    </article>

    <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">Delete Court</h4>
                </div>
                <div class="modal-body">
                    <p>Do you really want to delete the court?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn  btn-raised btn-default" data-dismiss="modal">Close</button>
                    <button type="button" class="btn  btn-raised btn-danger" id="apply-delete">Delete</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->

    <div class="modal fade" id="editModal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">Edit Court</h4>
                </div>
                <div class="modal-body">
                    <p>Do you really want to <strong id="edit-confirm"></strong> the court?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn  btn-raised btn-default" data-dismiss="modal">Close</button>
                    <button type="button" class="btn  btn-raised btn-warning" id="apply-edit">Update</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div>

@endsection
@section('scripts')
<script src="{{asset("js/admin-courts.js")}}"></script>
@endsection