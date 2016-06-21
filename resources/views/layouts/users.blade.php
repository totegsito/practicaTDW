@extends('layouts.management')

@section('management-content')

    <div class="alert alert-success hidden" role="alert" id="alert">
        {{--<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>--}}

    </div>
    <article class="panel panel-primary">
        <header class="panel-heading">
            <h1>Users</h1>
        </header>
        <div class="table-responsive">

            <table class="table table-striped" id="users-table">
                <thead>
                <tr><th>Id</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Telephone</th>
                    <th>Enabled</th>
                    <th>Role</th>
                    <th>Options</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
        <footer class="panel-footer">
            <form id="addUserForm">
                <div class="form-group row">
                    <div class="col-lg-6 col-md-6 col-sm-6">
                        <label for="newUser">User</label>
                        <input class="form-control" id="newUser" type="text"
                               pattern="[a-zA-Z0-9_-]{3,255}" required>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-6">

                        <label for="newPassword">Password</label>
                        <input class="form-control" id="newPassword" type="password"
                               pattern="[a-zA-Z0-9_-]{6,18}" required>
                    </div>
                    <div class="col-lg-12 col-md-12 col-sm-12">
                        <label for="newEmail">Email</label>
                        <input class="form-control" id="newEmail" type="email"
                               required>
                    </div>
                </div>
                <div class="form-group row">
                    <div class="col-lg-4 col-md-4 col-sm-4">
                        <label for="newFirstName">Name</label>
                        <input class="form-control" id="newFirstName" type="text"
                               pattern="[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ ]{3,50}" required>
                    </div>

                    <div class="col-lg-8 col-md-8 col-sm-8">
                        <label for="newLastName">Surname</label>
                        <input class="form-control" id="newLastName" type="text"
                               pattern="[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ \-]{5,100}" required>
                    </div>

                    <div class="col-lg-12 col-md-12 col-sm-12">
                        <label for="newTelephone">Telephone</label>
                        <input class="form-control" id="newTelephone" type="tel" required>
                    </div>
                </div>

                <button type="button" class="btn btn-primary" id="add-user">Add User</button>
            </form>
        </footer>
    </article>

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
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-danger" id="apply-delete">Delete</button>
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
                        <input type="hidden" id="user-id">
                        <div class="form-group">
                            <label for="user-username" class="control-label">Username:</label>
                            <input type="text" class="form-control" id="user-username">
                        </div>
                        <div class="form-group">
                            <label for="user-email" class="control-label">Email:</label>
                            <input type="email" class="form-control" id="user-email">
                        </div>
                        <div class="form-group">
                            <label for="user-name" class="control-label">Name:</label>
                            <input type="text" class="form-control" id="user-name">
                        </div>
                        <div class="form-group">
                            <label for="user-surname" class="control-label">Surname:</label>
                            <input type="text" class="form-control" id="user-surname">
                        </div>
                        <div class="form-group">
                            <label for="user-telephone" class="control-label">Telephone:</label>
                            <input type="tel" class="form-control" id="user-telephone">
                        </div>
                        <div class="form-group">
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox" id="user-enabled" value="">
                                    Enabled
                                </label>

                            </div>
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox" id="user-roles" value="">
                                    Admin
                                </label>

                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-warning" id="apply-edit">Apply Changes</button>
                </div>
            </div>
        </div>
    </div>

    <script src="{{asset("js/admin-users.js")}}"></script>
@endsection