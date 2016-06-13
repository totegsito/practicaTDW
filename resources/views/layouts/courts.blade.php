@extends('layouts.management')

@section('management-content')

    <article>
        <header>
            <h1>Courts</h1>
        </header>
        <div class="row" id="courts-space">


        </div>

            <form class="form-group">
                <button type="submit" class="btn btn-primary">Añadir pista</button>
            </form>


    </article>

    <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
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