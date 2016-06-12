<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCourtsUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('courts_users', function (Blueprint $table) {
            $table->increments('id');
            $table->dateTime('reservation_date');
            $table->integer('users_id')->unsigned();
            $table->foreign('users_id')->references('id')->on('users')->onDelete('cascade');
            $table->dropForeign('courts_users_users_id_foreign');
            $table->integer('courts_id')->unsigned();
            $table->foreign('courts_id')->references('id')->on('courts')->onDelete('cascade');
            $table->dropForeign('courts_users_courts_id_foreign');
            $table->string('2nd_player');
            $table->string('3rd_player');
            $table->string('4th_player');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('courts_users');
    }
}
