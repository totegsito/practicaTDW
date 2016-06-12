<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Hash;


class Users extends Authenticatable
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'enabled', 'roles', 'firstname', 'surname', 'telephone'
    ];

    /**
     * The attributes that aren't mass assignable.
     *
     * @var array
     */
    protected $guarded = [
        'id'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'updated_at', 'created_at'
    ];

    public function __construct(array $attributes = array()) {
        $this->setPasswordAttribute($this->password);
        parent::__construct($attributes);
    }

    protected function setPasswordAttribute($value)
    {
        $this->attributes['password'] = (Hash::needsRehash($value) ? Hash::make($value) : $value);
    }
}