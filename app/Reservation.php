<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = "courts_users";


    protected $fillable = [
        "reservation_date", "users_id", "courts_id", "2nd_player", "3rd_player", "4th_player"
    ];
    /**
     * The attributes that aren't mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        "id"
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = ["updated_at"];
}
