<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;


class Court extends Authenticatable
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = "courts";
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ["avaliable"];
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = ["created_at", "updated_at"];

    /**
     * The attributes that aren't mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        "id"
    ];
    
    public function users(){
        return $this->belongsToMany('App\Users', 'courts_users', 'courts_id', 'users_id')->withPivot('reservation');
    }
}
