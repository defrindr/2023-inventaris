<?php

namespace App\Models\Master;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mahasiswa extends Model
{
    use HasFactory;

    protected $table = 'users';
    protected $guarded = ['id'];

    public function scopeActive($query)
    {
        return $query->where('flag', '=', 1);
    }


    public function getAll()
    {
        return $this->where('role', 'mahasiswa')->active()->get();
    }

    public function getById($id)
    {
        return $this->where('role', 'mahasiswa')->active()->where('id', $id)->first();
    }

    public function store($data)
    {
        return $this->create($data);
    }

    public function updateData($id, $data)
    {
        return $this->active()->where('id', $id)->update($data);
    }

    public function deleteData($id)
    {
        return $this->where('id', $id)->update(['flag' => 0]);
    }
}
