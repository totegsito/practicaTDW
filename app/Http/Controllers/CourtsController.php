<?php

namespace App\Http\Controllers;

use App\Court;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesResources;
use Illuminate\Support\Facades\Validator;


use App\Http\Requests;

class CourtsController extends Controller
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
        if (Court::all() != null)
            return response()->json(['code' => 200, 'courts' => Court::all()], 200);
        else
            return response()->json(['code' => 404, 'error' => 'Courts object is empty'], 404);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return Response
     */
    public function store(Request $request)
    {

        $newCourt = Court::create($request->all());

        $response = \Illuminate\Support\Facades\Response::make(json_encode(["code" => 201, "message" => "Court created successfully", "court"=>$newCourt]), 201)->header('Location', 'http://laravel.dev/api/courts' . $newCourt->id)->header('Content-Type', 'application/json');
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
            $court = Court::findOrFail($id);
            return response()->json(['code' => 200, 'message'=> 'Court created successfully', 'court' => $court], 200);
        } catch (ModelNotFoundException $ex) {
            return response()->json(['code' => 404, 'error' => 'Court not found', 'id'=>$id], 404);

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
            'avaliable' => 'required|boolean',
        ]);

        if($validator->fails()){
            $message = $validator->errors();

            if($message->has("avaliable")){
                return response()->json(["code"=>400, "error"=>"Avaliable is required", "avaliable"=>$request->input('avaliable')], 400);
            }else
                return response()->json(['code'=>400, 'error'=>$message], 400);
        }else{

            $newCourt = Court::find($id);
            if($newCourt){
                $newCourt->update($request->except('id'));
                return response()->json(['code' => 200, 'message' => 'Court updated successfully', 'court' =>$newCourt], 200);
            }else{
                return response()->json(['code' => 404, 'error' => 'Court not found', "id"=>$id], 404);
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
            $court = Court::findOrFail($id);
            $court->delete();
            return response()->json(['code' => 204, 'message' => 'Court removed successfully', 'court'=>$court], 204);
        } catch (ModelNotFoundException $ex) {
            return response()->json(['code' => 404, 'error' => 'Court not found', 'id'=>$id], 404);
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
