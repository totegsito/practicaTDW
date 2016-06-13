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
use Illuminate\Support\Facades\Validator;
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
            return response()->json(['code' => 404, 'error' => 'No existen usuarios'], 404);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store(Request $request)
    {

        $validator= Validator::make($request->all(), [
            'name' => 'required|max:255|unique:users',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|min:6',
            'firstname' => 'min:3|max:45',
            'surname' => 'min:5|max:100',
            'telephone' => 'max:15',
            'enabled' => 'boolean',
            'roles' => 'boolean'
        ]);

        if($validator->fails()){
            $message = $validator->errors();
            if($message->has("name")){
                if($request->input("name")!=null)
                    return response()->json(["code"=>400, "error"=>"Nombre de usuario ya existente", "name"=>$request->input('name')], 400);
                else
                    return response()->json(["code"=>422, "error"=>"El usuario no puede estar vacío"], 422);
            }elseif ($message->has('email')){
                if($request->input("email")!=null){
                    return response()->json(["code"=>400, "error"=>"Email de usuario ya existe", "email"=>$request->input('email')], 400);
                }else{
                    return response()->json(["code"=>422, "error"=>"El email no puede estar vacío"], 422);
                }
            }elseif($message->has('password'))
                return response()->json(['code'=>422, 'error'=>"La contraseña no puede estar vacía"], 422);
        }

        $newUser = Users::create($request->all());
        $newUser->password = bcrypt($request->input('password'));
        $newUser->save();

        $response = \Illuminate\Support\Facades\Response::make(json_encode(["code" => 201, "message" => "Usuario creado correctamente", "user"=> $newUser]), 201)->header('Location', 'http://laravel.dev/api/users/' . $newUser->id)->header('Content-Type', 'application/json');
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
            return response()->json(['errors' => array(['code' => 404, 'error' => 'No se encuentra id', "id"=>$id])], 404);
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
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:255|unique:users,name,'.$id,
            'email' => 'required|email|max:255|unique:users,email,'.$id,
            'password' => 'min:6',
            'firstname' => 'min:3|max:45',
            'surname' => 'min:5|max:100',
        ]);

        if($validator->fails()){
            $message = $validator->errors();

            if($message->has("name")){
                return response()->json(["code"=>400, "error"=>"Nombre de usuario ya existe", "name"=>$request->input('name')], 400);
            }elseif ($message->has('email')){
                return response()->json(["code"=>400, "error"=>"Email de usuario ya existe", "email"=>$request->input('email')], 400);
            }else
            return response()->json(['code'=>400, 'error'=>$message], 400);
        }else{

            $newUser = Users::find($id);
            if($newUser){

                $newUser->update($request->except('id'));
                return response()->json(['code' => 200, 'message' => 'Usuario actualizado correctamente'], 200);
            }else{
                return response()->json(['code' => 404, 'error' => 'No se encuentra el id', "id"=>$id], 404);
            }
        }
        

        /*try {

            $user = Users::findOrFail($id);
            $user->name = $request->input('name');
            $user->email = $request->input('email');
            if($request->input('password')!=null)
                $user->password = $request->input('password');
            $user->enabled = $request->input('enabled');
            $user->roles = $request->input('roles');
            $user->save();
            return response()->json(['code' => 200, 'message' => 'Usuario actualizado correctamente'], 200);

        } catch (ModelNotFoundException $ex) {
            return response()->json(['code' => 404, 'message' => 'No se encuentra el usuario con id '.$id], 404);*/
        /*} catch (QueryException $ex) {
            return response()->json(['code' => 400, 'message' => 'Usuario o email ya existe'], 400);
        }*/
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return Response
     */
    public function destroy($id)
    {
        try {
            $user = Users::findOrFail($id);
            $user->delete();
            return response()->json(['code' => 204, 'message' => 'Se ha eliminado el usuario correctamente'], 204);
        } catch (ModelNotFoundException $ex) {
            return response()->json(['errors' => array(['code' => 404, 'error' => 'No se encuentra el id', "id"=>$id])], 404);
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
