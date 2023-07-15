<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Helpers\DosenHelper;
use App\Http\Requests\Master\Dosen\CreateRequest;
use App\Http\Requests\Master\Dosen\UpdateRequest;
use Illuminate\Http\Request;

class DosenController extends Controller
{
    protected $dosenHelper;
    public function __construct()
    {
        $this->dosenHelper = new DosenHelper();
    }

    public function getAll(){
        return $this->dosenHelper->getAll();
    }

    public function get($id){
        return $this->dosenHelper->getById($id);
    }

    public function store(CreateRequest $request){

        if (isset($request->validator) && $request->validator->fails()) {
            return response()->json($request->validator->errors(), 422);
        }

        $payload = $request->only('nama','username', 'email', 'no_identitas', 'no_hp', 'password','foto');
        $response = $this->dosenHelper->create($payload);
        return response()->json($response, $response['status_code']);
    }

    public function getById($id){
        $response = $this->dosenHelper->getById($id);
        return response()->json($response, $response['status_code']);
    }

    public function updateData(UpdateRequest $request, $id){
        if (isset($request->validator) && $request->validator->fails()) {
            return response()->json($request->validator->errors(), 422);
        }
        $payload = $request->only('nama','username', 'email', 'no_identitas', 'no_hp', 'password','foto');

        $response = $this->dosenHelper->update($payload, $id);
        return response()->json($response, $response['status_code']);
    }

    public function deleteData($id){
        $response = $this->dosenHelper->delete($id);
        return response()->json($response, $response['status_code']);
    }

    
}
