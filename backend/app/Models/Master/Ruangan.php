<?php

namespace App\Models\Master;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ruangan extends Model
{
    use HasFactory;

    protected $table = 'ruangan';
    protected $guarded = ['id'];

    public function getAll(){
        return $this->get();
    }

    public function getById($id){
        return $this->where('id', $id)->first();
    }

    public function store($data){
        return $this->create($data);
    }

    public function updateData($id, $data){
        return $this->where('id', $id)->update($data);
    }

    public function deleteData($id){
        return $this->where('id', $id)->delete();
    }
}
