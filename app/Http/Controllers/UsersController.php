<?php

namespace App\Http\Controllers;


use App\Users;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesResources;

use App\Http\Requests;
use Illuminate\Support\Facades\Hash;
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
            return response()->json(['code' => 404, 'error' => "Users not found"], 404);
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
            'surname' => 'min:2|max:50',
            'telephone' => 'max:15',
            'enabled' => 'boolean',
            'roles' => 'boolean'
        ]);

        if($validator->fails()){
            $message = $validator->errors();
            if($message->has("name")){
                if($request->input("name")!=null)
                    return response()->json(["code"=>400, "error"=>"Username already exists", "name"=>$request->input('name')], 400);
                else
                    return response()->json(["code"=>422, "error"=>"Empty username is not allowed"], 422);
            }elseif ($message->has('email')){
                if($request->input("email")!=null){
                    return response()->json(["code"=>400, "error"=>"Email already exists", "email"=>$request->input('email')], 400);
                }else{
                    return response()->json(["code"=>422, "error"=>"Empty email is not allowed"], 422);
                }
            }elseif($message->has('password'))
                return response()->json(['code'=>422, 'error'=>"Empty password is not allowed"], 422);
        }

        $newUser = Users::create($request->all());
        $newUser->password = Hash::make($request->input('password'));
        $newUser->enabled = 0;
        $newUser->roles = 0;
        $newUser->save();

        $response = \Illuminate\Support\Facades\Response::make(json_encode(["code" => 201, "message" => "User successfully created", "user"=> $newUser]), 201)->header('Location', 'http://laravel.dev/api/users/' . $newUser->id)->header('Content-Type', 'application/json');
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
            return response()->json(['errors' => array(['code' => 404, 'error' => 'Id not found', "id"=>$id])], 404);
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
            'name' => 'required|max:255|alpha_dash|unique:users,name,'.$id,
            'email' => 'required|email|max:255|unique:users,email,'.$id,
            'password' => 'min:6',
            'firstname' => 'min:3|max:45',
            'surname' => 'min:2|max:50',
        ]);

        if($validator->fails()){
            $message = $validator->errors();

            if($message->has("name")){
                return response()->json(["code"=>400, "error"=>"Username already exists", "name"=>$request->input('name')], 400);
            }elseif ($message->has('email')){
                return response()->json(["code"=>400, "error"=>"Email already exists", "email"=>$request->input('email')], 400);
            }
            return response()->json(['code'=>400, 'error'=>$message], 400);
        }else{
            $newUser = Users::find($id);
            if($newUser){
                $newUser->update($request->except('id'));
                return response()->json(['code' => 200, 'message' => 'User successfully updated', 'user' =>$newUser], 200);
            }else{
                return response()->json(['code' => 404, 'error' => 'Id not found', "id"=>$id], 404);
            }
        }
    }

    public function changePassword(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'oldpassword' => 'required|min:6|alpha_dash',
            'password' => 'required|min:6|alpha_dash|confirmed',
        ]);
        if($validator->fails()){
            $message = $validator->errors();
                return response()->json(['code'=>400, 'error'=>$message], 400);
        }else{
            $newUser = Users::find($id);
            if($newUser){
                if(!Hash::check($request->input('oldpassword'), Auth::user()->password)){
                    return response()->json(['code'=>400, 'error'=>'Old password do not match our records'], 400);
                }
                $newUser->update($request->except('id', 'old_password', 'password_confirmation'));
                return response()->json(['code' => 200, 'message' => 'User successfully updated', 'user' =>$newUser], 200);
            }else{
                return response()->json(['code' => 404, 'error' => 'Id not found', "id"=>$id], 404);
            }
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
        try {
            $user = Users::findOrFail($id);
            $user->delete();
            return response()->json(['code' => 204, 'message' => 'User successfully removed'], 204);
        } catch (ModelNotFoundException $ex) {
            return response()->json(['errors' => array(['code' => 404, 'error' => 'Id not found', "id"=>$id])], 404);
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
