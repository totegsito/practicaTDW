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

    public function __construct()
    {
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
        if (Reservation::all() != null) {
            return response()->json(["code" => 200, "reservations" => Reservation::orderBy('reservation_date', 'desc')->get()], 200);
        } else {
            return response()->json(["code" => 404, "error" => "Reservations not found"], 404);
        }
    }

    public function getReservationsByReservationDate($reservation_date)
    {
        $reservation = Reservation::orderBy("reservation_date")->where('reservation_date', $reservation_date)->get();
        if ($reservation) {
            return response()->json(["code" => 200, "reservations" => $reservation], 200);
        } else {
            return response()->json(["code" => 404, "error" => "Not reservations found for selected datetime"], 404);
        }
    }


    public function getReservationsByUserId($user_id)
    {
        $reservation = Reservation::orderBy("reservation_date")->where("users_id", $user_id)->get();
        if ($reservation->count() > 0) {
            return response()->json(["code" => 200, "reservations" => $reservation], 200);
        } else {
            return response()->json(["code" => 404, "error" => "Reservations not found", "id" => $user_id], 404);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'courts_id' => 'required|max:255|unique:courts_users,courts_id,NULL,id,reservation_date,' . $request->input(['reservation_date']) . '|exists:courts,id,avaliable,1',
            'users_id' => 'required|max:255|exists:users,id,enabled,1',
            'reservation_date' => 'required|date_format:Y-m-d H:i:s|after:now',
            '1st_player' => 'required|min:2|max:100|string',
            '2nd_player' => 'required|min:2|max:100|string',
            '3rd_player' => 'required|min:2|max:100|string',
            '4th_player' => 'required|min:2|max:100|string',
        ]);

        if ($validator->fails()) {
            $message = $validator->errors();
            if ($message->has("courts_id")) {
                return response()->json(["code" => 400, "error" => "Court not avaliable for selected datetime", "court" => $request->input('courts_id')], 400);
            } elseif ($message->has("users_id")) {
                return response()->json(["code" => 400, "error" => "User not enabled", "users" => $request->input(['users_id'])], 400);
            } elseif ($message->has('reservation_date')) {
                return response()->json(['code' => 400, 'error' => 'Invalid datetime'], 400);
            } else
                return response()->json(["code" => 400, "error" => $message], 400);
        } else {
            $newReservation = Reservation::create($request->all());
            return response()->json(["code" => 201, "message" => "Reservation created successfully", "reservation" => $newReservation], 201);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $reservation = Reservation::findOrFail($id);
            return response()->json(["code" => 200, "reservation" => $reservation], 200);
        } catch (ModelNotFoundException $ex) {
            return response()->json(['errors' => array(['code' => 404, 'error' => 'Id not found', 'id' => $id])], 404);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'courts_id' => 'required|max:255|unique:courts_users,courts_id,' . $id . ',id,reservation_date,' . $request->input(['reservation_date']) . '|exists:courts,id,avaliable,1',
            'users_id' => 'required|max:255|exists:users,id,enabled,1',
            'reservation_date' => 'required|date_format:Y-m-d H:i:s|after:now',
            '1st_player' => 'required|min:2|max:100|string',
            '2nd_player' => 'required|min:2|max:100|string',
            '3rd_player' => 'required|min:2|max:100|string',
            '4th_player' => 'required|min:2|max:100|string',
        ]);
        if ($validator->fails()) {
            $message = $validator->errors();
            if ($message->has("courts_id")) {
                return response()->json(["code" => 400, "error" => "Court not avaliable for selected datetime"], 400);
            } elseif ($message->has('users_id')) {
                return response()->json(['code' => 400, 'error' => 'Invalid user', 'user'=> $request->input("users_id")], 400);
            } elseif ($message->has('reservation_date')) {
                return response()->json(['code' => 400, 'error' => 'Invalid datetime'], 400);
            } else
                return response()->json(['code' => 400, 'error' => $message], 400);
        } else {
            $newReservation = Reservation::find($id);
            $newReservation->update($request->except(['id', 'created_at']));
            return response()->json(["code" => 201, "message" => "Reservation updated successfully", "reservation" => $newReservation], 201);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $reservation = Reservation::findOrFail($id);
            $reservation->delete();
            return response()->json(['code' => 204, 'message' => 'Reservation removed successfully'], 204);
        } catch (ModelNotFoundException $ex) {
            return response()->json(['errors' => array(['code' => 404, 'error' => 'Id not found', "id" => $id])], 404);
        }
    }
}
