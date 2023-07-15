<?php

namespace App\Models\Master;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mahasiswa extends Model
{
    use HasFactory;

    protected $table = 'users';
    protected $guarded = ['id'];

    public function getAll()
    {
        return $this->where('role', 'mahasiswa')->get();
    }

    public function getById($id)
    {
        return $this->where('role', 'mahasiswa')->where('id', $id)->first();
    }

    public function store($data)
    {
        return $this->create($data);
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
