<?php

namespace App\Models\Transaction;

use App\Models\Master\Ruangan;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HistoryPeminjamanRuangan extends Model
{
    use HasFactory;

    protected $table = 'history_peminjaman_ruangan';
    protected $guarded = ['id'];

    public function scopeHistory($query)
    {
        return $query->whereIn('status', ['ditolak', 'dikembalikan']);
    }

    public function scopeProgress($query)
    {
        return $query->whereIn('status', ['tertunda', 'dipinjam', 'ajukankembali']);
    }

    public function getAllProgress()
    {
        $user = auth()->guard()->user();
        if (!$user) return [];
        $query  = $this->progress();
        if ($user->role == "mahasiswa") {
            $query->where('user_id', $user->id);
        }
        return $query->with(['ruangan'])->get();
    }

    public function getAllHistory()
    {
        $user = auth()->guard()->user();
        if (!$user) return [];
        $query  = $this->history();
        if ($user->role == "mahasiswa") {
            $query->where('user_id', $user->id);
        }
        return $query->with(['ruangan'])->get();
    }

    public function getAll()
    {
        return $this->with(['ruangan'])->get();
    }

    public function ruangan()
    {
        return $this->belongsTo(Ruangan::class, 'ruangan_id', 'id');
    }


    public function getById($id)
    {
        return $this->where('id', $id)->with(['ruangan'])->first();
    }

    public function changeStatus($status)
    {
        return $this->update(['status' => $status]);
    }

    public function store($data)
    {
        $user = auth()->guard()->user();
        $model = $this->create(array_merge($data, ['user_id' => $user->id]));
        return $model;
    }

    public function updateData($id, $data)
    {
        return $this->where('id', $id)->update($data);
    }

    public function deleteData($id)
    {
        return $this->where('id', $id)->delete();
    }
}
