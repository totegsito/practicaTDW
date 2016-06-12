@extends('layouts.management')

@section('management-content')

    <article class="panel panel-primary">


        <header class="panel-heading">Mi Perfil</header>
        <main class="panel-body" ng-controller="UsersController">
            <form class="form-horizontal col-sm-12 row" ng-init="getConcreteUser({{ Auth::user()->id}})">
                <div class="form-group col-md-12">
                    <label for="showName" class="control-label">Usuario</label>
                    <p class="form-control-static" id="showName"><% concreteUser.name %></p>
                </div>
                <div class="form-group col-md-6">
                    <label for="showEmail" class="control-label">Email</label>
                    <p class="form-control-static" id="showEmail"><% concreteUser.email %></p>
                </div>

                <div class="form-group col-md-6">
                    <label for="showFirstname" class="control-label">Nombre</label>
                    <p class="form-control-static" id="showFirstname"><% concreteUser.firstname %></p>
                </div>
                <div class="form-group col-md-6 ">
                    <label for="showSurname" class="control-label">Apellidos</label>
                    <p class="form-control-static" id="showSurname"><% concreteUser.surname %></p>
                </div>

                <div class="form-group col-md-6">
                    <label for="showTelephone" class="control-label">Telefono</label>
                    <p class="form-control-static" id="showTelephone"><% concreteUser.telephone %></p>
                </div>


                <div class="form-group col-md-6">
                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">
                        Editar Perfil
                    </button>

                </div>


            </form>
            <!-- Modal -->
            <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" data-backdrop="static" data-keyboard="false">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title" id="myModalLabel">Editar Perfil</h4>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="form-group" ng-class="{'has-error': error.name}">
                                    <label for="inputName" class="control-label">Usuario</label>
                                    <input id="inputName" type="text" class="form-control" ng-model="concreteUser.name">
                                    <span class="help-block" ng-init="aux = concreteUser.name" ng-if="error.name != null">
                                        <strong><% "El nombre " + aux + " ya está en uso" %></strong>
                                    </span>
                                </div>
                                <div class="form-group" ng-class="{'has-error': error.email}">
                                    <label for="inputEmail" class="control-label">Email</label>
                                    <input id="inputEmail" type="email" class="form-control" ng-model="concreteUser.email">
                                    <span class="help-block" ng-init="aux = concreteUser.email" ng-if="error.email != null">
                                        <strong><% "El email " + aux + " ya está en uso" %></strong>
                                    </span>
                                </div>
                                <div class="form-group">
                                    <label for="inputFirstname" class="control-label">Nombre</label>
                                    <input id="inputFirstname" type="text" class="form-control" ng-model="concreteUser.firstname">
                                </div>
                                <div class="form-group">
                                    <label for="inputLastname" class="control-label">Apellidos</label>
                                    <input id="inputLastname" type="text" class="form-control" ng-model="concreteUser.surname">
                                </div>
                                <div class="form-group">
                                    <label for="inputEmail" class="control-label">Teléfono</label>
                                    <input id="inputEmail" type="tel" class="form-control" ng-model="concreteUser.telephone">
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer" ng-class="{'has-success': success}">
                            <button type="button" ng-hide="!success" ng-show="success" class="btn btn-default" data-dismiss="modal">Cerrar</button>
                            <button type="button" class="btn btn-primary" ng-click="updateUser(concreteUser)">Guardar Cambios</button>
                            <span class="help-block" ng-if="success">
                                        <strong>Perfil modificado correctamente</strong>
                                    </span>
                        </div>
                    </div>
                </div>
            </div>
        </main>


    </article>



@endsection