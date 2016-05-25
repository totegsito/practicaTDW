<?php

namespace App\Http\Controllers;


use App\Users;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesResources;

use App\Http\Requests;
use Illuminate\Support\Facades\Auth;


class UsersController extends Controller
{
    use AuthorizesRequests, AuthorizesResources, DispatchesJobs, ValidatesRequests;

    public function __construct()
    {
        $this->middleware('auth.basic', ['show', 'index', 'store', 'update', 'destroy']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index()
    {
        if (Users::all() != null)
            return response()->json(['code' => 200, 'users' => Users::all()], 200);
        else
            return response()->json(['code' => 404, 'message' => 'No existen usuarios'], 404);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store(Request $request)
    {
        if(Auth::user()->roles!=1){
            return response()->json(['code'=>403, 'message'=>'Se necesita rol Admin'], 403);
        }
        if (!$request->input('username')) {
            return response()->json(['code' => 422, 'message' => trans('validation.required', ["attribute" => "username"])], 422);
        } else if (!$request->input('email')) {
            return response()->json(['code' => 422, 'message' => trans('validation.required', ["attribute" => "email"])], 422);
        } else if (!$request->input('password')) {
            return response()->json(['code' => 422, 'message' => trans('validation.required', ["attribute" => "password"])], 422);
        } else if (Users::find($request->input('username'))) {
            return response()->json(['code' => 400, 'message' => 'El usuario ' . $request->input('username') . ' ya existe'], 400);
        } else if (Users::find($request->input('email'))) {
            return response()->json(['code' => 400, 'message' => 'El email ' . $request->input('email') . ' ya existe'], 400);
        }

        $newUser = Users::create($request->all());

        $response = \Illuminate\Support\Facades\Response::make(json_encode(["code" => 201, "message" => "Usuario creado correctamente"]), 201)->header('Location', 'http://laravel.dev/users/' . $newUser->id)->header('Content-Type', 'application/json');
        return $response;
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return Response
     */
    public function show($id)
    {
        //
        try {
            $user = Users::findOrFail($id);
            return response()->json(['code' => 200, 'user' => $user], 200);
        } catch (ModelNotFoundException $ex) {
            return response()->json(['errors' => array(['code' => 404, 'message' => 'No se encuentra el usuario con id '.$id])], 404);

        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  int $id
     * @return Response
     */
    public function update(Request $request, $id)
    {

        if(!Auth::user()->roles){
            return response()->json(['code'=>403, 'message'=>'Se necesita rol Admin'], 403);
        }
        try {

            $user = Users::findOrFail($id);
            $user->username = $request->input('username');
            $user->email = $request->input('email');
            $user->password = $request->input('password');
            $user->enabled = $request->input('enabled');
            $user->roles = $request->input('roles');
            if(!$user->username || !$user->email || !$user->password){
                return response()->json(['code'=>422, 'message'=>'Usuario, email y contraseña no pueden estar vacios'], 422);
            }
            $user->save();
            return response()->json(['code' => 200, 'message' => 'Usuario actualizado correctamente'], 200);

        } catch (ModelNotFoundException $ex) {
            return response()->json(['code' => 404, 'message' => 'No se encuentra el usuario con id '.$id], 404);
        } catch (QueryException $ex) {
            return response()->json(['code' => 401, 'message' => 'Usuario o email ya existe'], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return Response
     */
    public function destroy($id)
    {
        if(!Auth::user()->roles){
            return response()->json(['code'=>403, 'message'=>'Se necesita rol Admin'], 403);
        }
        try {
            $user = Users::findOrFail($id);
            $user->delete();
            return response()->json(['code' => 204, 'message' => 'Se ha eliminado el usuario correctamente'], 204);
        } catch (ModelNotFoundException $ex) {
            return response()->json(['errors' => array(['code' => 404, 'message' => 'No se encuentra el usuario con id '.$id])], 404);

        }

    }
    /**
     * Return the allowed methods.
     *
     *
     * @return Response
     */

    public function options(){
        $headers = [
            'Access-Control-Allow-Methods'=> 'POST, GET, OPTIONS, PUT, DELETE'
        ];
        return response()->make('', 200, $headers);
    }

}
