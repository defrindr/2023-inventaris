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
        return $this->progress()->with(['ruangan'])->get();
    }

    public function getAllHistory()
    {
        return $this->history()->with(['ruangan'])->get();
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
        $model = $this->create($data);
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
