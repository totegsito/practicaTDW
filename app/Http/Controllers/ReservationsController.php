<?php

namespace App\Http\Controllers;

use App\Reservation;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Http\Request;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesResources;

use App\Http\Requests;
use Illuminate\Support\Facades\Validator;


class ReservationsController extends Controller
{

    use AuthorizesRequests, AuthorizesResources, DispatchesJobs, ValidatesRequests;

    public function __construct(){
        $this->middleware('auth.basic', ['show', 'index', 'store', 'update', 'destroy']);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        if(Reservation::all()!=null){
            return response()->json(["code"=>200, "reservations"=>Reservation::all()], 200);
        }else{
            return response()->json(["code"=>404, "message"=>"Reservations not found"], 404);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'courts_id' => 'required|max:255|unique:courts_users,courts_id,NULL,id,reservation_date,'.$request->input(['reservation_date']).'|exists:courts,id,avaliable,1',
            'users_id' => 'required|max:255|exists:users,id,enabled,1',
            'reservation_date' => 'required|date_format:Y-m-d H:i:s',
            '2nd_player' => 'min:3|max:100|string',
            '3rd_player' => 'min:5|max:100|string',
            '4th_player' => 'min:5|max:100|string',
        ]);

        if($validator->fails()){
            $message = $validator->errors();
            if($message->has("courts_id")){
                return response()->json(["code"=>400, "message"=>"Court not avaliable for selected datetime"], 400);
            }elseif ($message->has("users_id")){
                return response()->json(["code"=>400, "message"=>"User not enabled"], 400);
            }else
                return response()->json(["code"=>400, "message"=>$message],400);
        }else{
            $newReservation = Reservation::create($request->all());
            return response()->json(["code"=>201, "message"=>"Reservation successfully created","reservation" => $newReservation ],201);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try{
            $reservation = Reservation::findOrFail($id);
            return response()->json(["code"=>200, "reservation"=>$reservation], 200);
        }catch (ModelNotFoundException $ex){
            return response()->json(['errors' => array(['code' => 404, 'message' => 'Id not found', 'id'=>$id])], 404);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'courts_id' => 'required|max:255|unique:courts_users,courts_id,NULL,id,reservation_date,'.$request->input(['reservation_date']).'|exists:courts,id,avaliable,1',
            'users_id' => 'required|max:255|exists:users,id,enabled,1',
            'reservation_date' => 'required|date_format:Y-m-d H:i:s',
            '2nd_player' => 'min:3|max:100|string',
            '3rd_player' => 'min:5|max:100|string',
            '4th_player' => 'min:5|max:100|string',
        ]);
        if($validator->fails()){
            $message = $validator->errors();
            if($message->has("courts_id")){
                return response()->json(["code"=>400, "message"=>"Court not avaliable for selected datetime"], 400);
            }
            return response()->json($message,400);
        }else{
            $newReservation = Reservation::find($id);
            $newReservation->update($request->except('id'));
            return response()->json(["code"=>201, "message"=>"Reservation successfully updated", "reservation"=>$newReservation],201);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $reservation = Reservation::findOrFail($id);
            $reservation->delete();
            return response()->json(['code' => 204, 'message' => 'Reservation successfully removed'], 204);
        } catch (ModelNotFoundException $ex) {
            return response()->json(['errors' => array(['code' => 404, 'message' => 'Id not found', "id"=>$id])], 404);
        }
    }
}
