<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class TransaksiRuangan extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('history_peminjaman_ruangan', function (Blueprint $table) {
            $table->id();
            $table->string('ruangan_id');
            $table->date('tgl_mulai');
            $table->date('tgl_selesai');
            $table->enum('status_pinjaman', ['disetujui','tertunda', 'ditolak']);
            $table->enum('status_pengembalian', ['belum','sudah']);
            $table->string('photo')->nullable();
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
        //
    }
}
