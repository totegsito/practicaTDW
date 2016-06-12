@extends('layouts.management')

@section('management-content')

    <article ng-controller="CourtsController as cc">
        <header>
            <h1>Pistas</h1>
        </header>
        <div class="row">

            <div class="col-lg-6 col-md-6" ng-repeat="court in courts">
                <div class="panel panel-primary">
                    <div class="panel-heading">
                        <% "Pista " + ($index + 1)%>
                    </div>
                    <div class="panel-body">
                        <table class="table success table-bordered court">
                            <tr class="success">
                                <td>1</td>
                                <td>2</td>
                            </tr>
                            <tr class="success">
                                <td>3</td>
                                <td>4</td>
                            </tr>
                        </table>
                    </div>

                    <div class="panel-footer">

                        <label> <input id="" type="checkbox" ng-true-value="1" ng-false-value="0" ng-model="court.avaliable"
                                       ng-change="updateCourt(court)"><% court.avaliable ? "Disponible" : "No disponible" %></label>
                        <br>
                        <button class="btn btn-danger btn-xs" ng-click="deleteCourt($index)"><span
                                    class="glyphicon glyphicon-trash"></span></button>
                    </div>
                </div>
            </div>
        </div>

            <form class="form-group" ng-submit="addCourt()">
                <button type="submit" class="btn btn-primary">Añadir pista</button>
            </form>


    </article>
@endsection