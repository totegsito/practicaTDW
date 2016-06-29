@extends('layouts.admin.management')

@section('management-content')
    <div class="alert alert-success hidden" role="alert" id="alert">
        {{--<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>--}}

    </div>
    <article class="panel panel-success">
        <header class="panel-heading">
            <h1>Reservations</h1>
        </header>
        <div class="table-responsive">

            <table class="table table-striped" id="users-table">
                <thead>
                <tr><th>Id</th>
                    <th>User Id</th>
                    <th>Court Id</th>
                    <th>Player 1</th>
                    <th>Player 2</th>
                    <th>Player 3</th>
                    <th>Player 3</th>
                    <th>Reservation date</th>
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
@endsection