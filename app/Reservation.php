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

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = ["updated_at"];
}
