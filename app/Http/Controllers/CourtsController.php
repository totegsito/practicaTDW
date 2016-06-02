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
            return response()->json(['code' => 404, 'message' => 'No existen pistas'], 404);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @return Response
     */
    public function store(Request $request)
    {

        $newCourt = Court::create($request->all());

        $response = \Illuminate\Support\Facades\Response::make(json_encode(["code" => 201, "message" => "Pista creada correctamente"]), 201)->header('Location', 'http://laravel.dev/api/courts' . $newCourt->id)->header('Content-Type', 'application/json');
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
            return response()->json(['code' => 200, 'court' => $court], 200);
        } catch (ModelNotFoundException $ex) {
            return response()->json(['errors' => array(['code' => 404, 'message' => 'No se encuentra la pista con id '.$id])], 404);

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

        $this->validate($request, [
            'avaliable' => 'required|boolean',
        ]);
        try {

            $court = Court::findOrFail($id);
            $court->avaliable = $request->input('avaliable');
            $court->save();
            return response()->json(['code' => 200, 'message' => 'Pista actualizada correctamente'], 200);

        } catch (ModelNotFoundException $ex) {
            return response()->json(['code' => 404, 'message' => 'No se encuentra la pista con id '.$id], 404);
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
            return response()->json(['code' => 204, 'message' => 'Se ha eliminado la pista correctamente'], 204);
        } catch (ModelNotFoundException $ex) {
            return response()->json(['errors' => array(['code' => 404, 'message' => 'No se encuentra la pista con id '.$id])], 404);

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
