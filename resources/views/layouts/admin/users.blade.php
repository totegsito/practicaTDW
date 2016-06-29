@extends('layouts.admin.management')

@section('management-content')

    <article class="panel panel-primary">
        <header class="panel-heading">
            <h1>Users</h1>
        </header>
        <div class="table-responsive">

            <table class="table table-striped" id="users-table">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Telephone</th>
                    <th>Enabled</th>
                    <th>Admin</th>
                    <th>Options</th>
                </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
        <footer class="panel-footer">
            <form id="addUserForm">
                <div class=" form-group label-static">
                    <label for="newUser" class="control-label">User</label>
                    <input class="form-control " id="newUser" type="text"
                           pattern="[a-zA-Z0-9_-]{3,255}" required>
                </div>
                <div class="form-group label-static">
                    <label for="newPassword" class="control-label">Password</label>
                    <input class="form-control" id="newPassword" type="password"
                           pattern="[a-zA-Z0-9_-]{6,18}" required>
                </div>
                <div class="form-group label-static">
                    <label for="newEmail" class="control-label">Email</label>
                    <input class="form-control" id="newEmail" type="email"
                           required>
                </div>

                <div class="form-group label-static">
                        <label for="newFirstName" class="control-label">Name</label>
                        <input class="form-control" id="newFirstName" type="text"
                               pattern="[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ ]{3,50}" required>
                </div>
                <div class="form-group label-static">
                        <label for="newLastName" class="control-label">Surname</label>
                        <input class="form-control" id="newLastName" type="text"
                               pattern="[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ \-]{5,100}" required>
                </div>
                <div class="form-group label-static row">
                        <label for="newTelephone" class="control-label">Telephone</label>
                        <input class="form-control" id="newTelephone" type="tel" required>
                </div>

                <button type="button" class="btn  btn-raised btn-primary" id="add-user">Add User</button>
            </form>
        </footer>
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
                    <form id="form-edit">
                        <input type="hidden" id="user-id">
                        <div class="form-group label-static">
                            <label for="user-username" class="control-label">Username:</label>
                            <input type="text" class="form-control" id="user-username">
                        </div>
                        <div class="form-group label-static">
                            <label for="user-email" class="control-label">Email:</label>
                            <input type="email" class="form-control" id="user-email">
                        </div>
                        <div class="form-group label-static">
                            <label for="user-name" class="control-label">Name:</label>
                            <input type="text" class="form-control" id="user-name">
                        </div>
                        <div class="form-group label-static">
                            <label for="user-surname" class="control-label">Surname:</label>
                            <input type="text" class="form-control" id="user-surname">
                        </div>
                        <div class="form-group label-static">
                            <label for="user-telephone" class="control-label">Telephone:</label>
                            <input type="tel" class="form-control" id="user-telephone">
                        </div>
                        <div class="form-group label-static">
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
                    <button type="button" class="btn  btn-raised btn-default" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn  btn-raised btn-warning" id="apply-edit">Apply Changes</button>
                </div>
            </div>
        </div>
    </div>


@endsection

@section('scripts')
    <script src="{{asset("js/admin-users.js")}}"></script>

@endsection