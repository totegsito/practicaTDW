@extends('layouts.management')

@section('management-content')

    <article>
        <header>
            <h1>Courts</h1>
        </header>
        <div class="row" id="courts-space">
            <div class="col-xs-6" id="add-court">
                <div class="panel panel-primary">
                    <div class="panel-heading">
                        <h3>Add Court</h3>
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
                        <button id="add" type="button" class="btn btn-primary center"><span
                                    class="glyphicon glyphicon-plus"></span></button>
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
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-danger" id="apply-delete">Delete</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
@endsection