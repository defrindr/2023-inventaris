<?php

namespace App\Http\Controllers\Master;

use App\Helpers\MahasiswaHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\Master\Mahasiswa\CreateRequest;
use App\Http\Requests\Master\Mahasiswa\UpdateRequest;
use Illuminate\Http\Request;

class MahasiswaController extends Controller
{
    private $mahasiswaHelper;

    public function __construct()
    {
        $this->mahasiswaHelper = new MahasiswaHelper();
    }

    public function getAll()
    {
        $response = $this->mahasiswaHelper->getAll();
        return response()->json($response, $response['status_code']);
    }

    public function getById($id)
    {
        $response = $this->mahasiswaHelper->getById($id);
        return response()->json($response, $response['status_code']);
    }

    public function store(CreateRequest $request)
    {  
        if (isset($request->validator) && $request->validator->fails()) {
            return response()->json($request->validator->errors(), 422);
        }
        $payload = $request->only('nama', 'username', 'email', 'no_identitas', 'no_hp', 'password','foto');
        $response = $this->mahasiswaHelper->create($payload);
        return response()->json($response, $response['status_code']);
    }

    public function updateData(UpdateRequest $request, $id)
    {
        if (isset($request->validator) && $request->validator->fails()) {
            return response()->json($request->validator->errors(), 422);
        }
        $payload = $request->only('nama', 'username', 'email', 'no_identitas', 'no_hp', 'password','foto');
        $response = $this->mahasiswaHelper->update($payload, $id);
        return response()->json($response, $response['status_code']);
    }

    public function deleteData($id)
    {
        $response = $this->mahasiswaHelper->delete($id);
        return response()->json($response, $response['status_code']);
    }
    
}
