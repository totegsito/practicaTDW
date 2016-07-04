@extends('layouts.user-authenticated')

@section('content')
    <div class="alert alert-success hidden" role="alert" id="alert">
        {{--<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>--}}

    </div>

    <article class="panel panel-primary">
        <header class="panel-heading">
            <h1>My Profile</h1>
        </header>
        <main class="panel-body">
            <form class="form-horizontal col-xs-10 col-xs-offset-1 row" id="form-user" data-user="{{ $id }}">
                <div class="form-group label-static col-md-12">
                    <label for="showName" class="control-label">Username</label>
                    <p class="form-control-static" id="showName"></p>
                </div>
                <div class="form-group label-static col-md-6">
                    <label for="showEmail" class="control-label">Email</label>
                    <p class="form-control-static" id="showEmail"></p>
                </div>

                <div class="form-group label-static col-md-6">
                    <label for="showFirstname" class="control-label">Name</label>
                    <p class="form-control-static" id="showFirstname"></p>
                </div>
                <div class="form-group label-static col-md-6 ">
                    <label for="showSurname" class="control-label">Surname</label>
                    <p class="form-control-static" id="showSurname"></p>
                </div>

                <div class="form-group label-static col-md-6">
                    <label for="showTelephone" class="control-label">Telephone</label>
                    <p class="form-control-static" id="showTelephone"></p>
                </div>
                <div class="form-group label-static col-md-6">
                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-raised btn-primary" data-toggle="modal" data-target="#myModal">
                        Edit Profile
                    </button>
                    <button type="button" class="btn btn-raised btn-warning" data-toggle="modal"
                            data-target="#changePasswordModal">
                        Change Password
                    </button>
                </div>


            </form>
            <!-- Modal -->
            <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
                 data-backdrop="static" data-keyboard="false">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                        aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title" id="myModalLabel">Edit Profile</h4>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="form-group label-static">
                                    <label for="inputName" class="control-label">Username</label>
                                    <input id="inputName" type="text" class="form-control">
                                </div>
                                <div class="form-group label-static">
                                    <label for="inputEmail" class="control-label">Email</label>
                                    <input id="inputEmail" type="email" class="form-control">
                                </div>
                                <div class="form-group label-static">
                                    <label for="inputFirstname" class="control-label">Name</label>
                                    <input id="inputFirstname" type="text" class="form-control">
                                </div>
                                <div class="form-group label-static">
                                    <label for="inputLastname" class="control-label">Surname</label>
                                    <input id="inputLastname" type="text" class="form-control">
                                </div>
                                <div class="form-group label-static">
                                    <label for="inputTelephone" class="control-label">Telephone</label>
                                    <input id="inputTelephone" type="tel" class="form-control">
                                </div>

                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-raised btn-default" data-dismiss="modal">Cancel
                            </button>
                            <button type="button" class="btn btn-raised btn-primary" id="apply-edit">Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Modal -->
            <div class="modal fade" id="changePasswordModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
                 data-backdrop="static" data-keyboard="false">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                        aria-hidden="true">&times;</span></button>
                            <h4 class="modal-title" id="myModalLabel">Edit Profile</h4>
                        </div>
                        <div class="modal-body">

                            <form id="changePass">
                                <div class="form-group label-static">
                                    <label for="inputOldPassword" class="control-label">Current Password</label>
                                    <input id="inputOldPassword" type="password" class="form-control"
                                           aria-describedby="currentInfo">
                                    <span>
                                        <strong id="currentInfo" class="help-block hidden"></strong>
                                    </span>
                                </div>
                                <div class="form-group label-static">
                                    <label for="inputNewPassword" class="control-label">New Password</label>
                                    <input id="inputNewPassword" type="password" class="form-control"
                                           aria-describedby="newInfo">
                                    <span>
                                        <strong id="newInfo" class="help-block hidden"></strong>
                                    </span>
                                </div>
                                <div class="form-group label-static">
                                    <label for="inputConfirmPassword" class="control-label">Confirm Password</label>
                                    <input id="inputConfirmPassword" type="password" class="form-control"
                                           aria-describedby="confirmInfo">
                                    <span>
                                        <strong id="confirmInfo" class="help-block hidden"></strong>
                                    </span>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-raised btn-default" data-dismiss="modal">Cancel
                            </button>
                            <button type="button" class="btn btn-raised btn-primary" id="apply-password-edit">Save
                                changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>


    </article>

@endsection

@section('scripts')
    <script src="{{ asset("js/profile-management.js") }}"></script>
@endsection

