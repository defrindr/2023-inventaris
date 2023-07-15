<?php

namespace App\Models\Master;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ruangan extends Model
{
    use HasFactory;

    protected $table = 'ruangan';
    protected $guarded = ['id'];

    public function scopeActive($query)
    {
        return $query->where('flag', '=', 1);
    }

    public function scopeAvailable($query)
    {
        return $query->where('status', '=', 'bebas');
    }

    public function isAvailable($id)
    {
        return $this->active()->available()->where(['id' => $id])->exists();
    }

    public function getAll()
    {
        return $this->active()->get();
    }

    public function getById($id)
    {
        return $this->active()->where('id', $id)->first();
    }

    public function store($data)
    {
        return $this->active()->create($data);
    }

    public function updateData($id, $data)
    {
        return $this->active()->where('id', $id)->update($data);
    }

    public function changeToAvailable()
    {
        return $this->update(['status' => 'bebas']);
    }

    public function changeToBooked()
    {
        return $this->update(['status' => 'dipinjam']);
    }

    public function deleteData($id)
    {
        return $this->where('id', $id)->update(['flag' => 0]);
    }
}
