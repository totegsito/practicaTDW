@extends('layouts.management')

@section('management-content')

            <article class="panel panel-primary" ng-controller="UsersController">
                <header class="panel-heading">
                    <h1>Usuarios</h1>
                </header>
                <div class="table-responsive">
                    <h1></h1>
                    <table class="table table-striped">
                        <tr>
                            <th>id</th>
                            <th>Activo</th>
                            <th>Usuario</th>
                            <th>E-mail</th>
                            <th>Nombre</th>
                            <th>Apellidos</th>
                            <th>Teléfono</th>
                            <th>Borrar</th>
                        </tr>
                        <tr ng-repeat="user in users">
                            <td><p class="form-control-static"><% user.id %></p>
                            </td>
                            <td>
                                <input type="checkbox" ng-true-value="1" ng-false-value="0" ng-model="user.enabled"
                                       ng-blur="updateUser(user)"></td>
                            <td>
                                <input class="form-control" type="text" ng-model="user.name" ng-blur="updateUser(user)">
                            </td>
                            <td>
                                <input class="form-control" type="email" ng-model="user.email"
                                       ng-blur="updateUser(user)">
                            </td>
                            <td>
                                <input class="form-control" type="text" ng-model="user.firstname"
                                       ng-blur="updateUser(user)"></td>
                            <td>
                                <input class="form-control" type="text" ng-model="user.surname"
                                       ng-blur="updateUser(user)"></td>
                            <td>
                                <input class="form-control" type="tel" ng-model="user.telephone"
                                       ng-blur="updateUser(user)"></td>
                            <td>
                                <button class="btn btn-danger btn-xs" ng-click="deleteUser($index)"><span
                                            class="glyphicon glyphicon-trash"></span></button>
                            </td>
                        </tr>
                    </table>
                </div>
                <footer class="panel-footer">
                    <form ng-submit="addUser()">
                        <div class="form-group row">
                            <div class="col-lg-6 col-md-6 col-sm-6">
                                <label for="newUser">Usuario</label>
                                <input class="form-control" id="newUser" type="text" ng-model="user.name"
                                       pattern="[a-zA-Z0-9_-]{3,255}" required>
                            </div>
                            <div class="col-lg-6 col-md-6 col-sm-6">

                                <label for="newPassword">Contraseña</label>
                                <input class="form-control" id="newPassword" type="password" ng-model="user.password"
                                       pattern="[a-zA-Z0-9_-]{6,18}" required>
                            </div>
                            <div class="col-lg-12 col-md-12 col-sm-12">
                                <label for="newEmail">Email</label>
                                <input class="form-control" id="newEmail" type="email" ng-model="user.email"
                                       required>
                            </div>
                        </div>
                        <div class="form-group row">
                            <div class="col-lg-4 col-md-4 col-sm-4">
                                <label for="newFirstName">Nombre</label>
                                <input class="form-control" id="newFirstName" type="text" ng-model="user.firstname"
                                       pattern="[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ ]{3,50}" required>
                            </div>

                            <div class="col-lg-8 col-md-8 col-sm-8">
                                <label for="newLastName">Apellidos</label>
                                <input class="form-control" id="newLastName" type="text" ng-model="user.surname"
                                       pattern="[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ \-]{5,100}" required>
                            </div>

                            <div class="col-lg-12 col-md-12 col-sm-12">
                                <label for="newTelephone">Teléfono</label>
                                <input class="form-control" id="newTelephone" type="tel" ng-model="user.telephone" required>
                            </div>
                        </div>

                        <button type="submit" class="btn btn-primary">Añadir usuario</button>
                    </form>
                </footer>
            </article>
@endsection