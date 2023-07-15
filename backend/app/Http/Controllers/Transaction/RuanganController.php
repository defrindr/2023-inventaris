<?php

namespace App\Http\Controllers\Transaction;

use App\Helpers\RuanganTransactionHelper;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class RuanganController extends Controller
{
    private $ruanganHelper;

    public function __construct()
    {
        $this->ruanganHelper = new RuanganTransactionHelper();
    }

    public function getAll()
    {
        $response = $this->ruanganHelper->getAll();
        return response()->json($response, $response['status_code']);
    }

    public function getById($id)
    {
        $response = $this->ruanganHelper->getById($id);
        return response()->json($response, $response['status_code']);
    }

    public function store(Request $request)
    {
        if (isset($request->validator) && $request->validator->fails()) {
            return response()->json($request->validator->errors(), 422);
        }
        $payload = $request->only('nama', 'deskripsi', 'status', 'foto');
        $response = $this->ruanganHelper->create($payload);
        return response()->json($response, $response['status_code']);
    }

    public function update(Request $request, $id)
    {
        if (isset($request->validator) && $request->validator->fails()) {
            return response()->json($request->validator->errors(), 422);
        }
        $payload = $request->only('nama', 'deskripsi', 'status', 'foto');
        $response = $this->ruanganHelper->update($payload, $id);
        return response()->json($response, $response['status_code']);
    }

    public function delete($id)
    {
        $response = $this->ruanganHelper->delete($id);
        return response()->json($response, $response['status_code']);
    }
}
