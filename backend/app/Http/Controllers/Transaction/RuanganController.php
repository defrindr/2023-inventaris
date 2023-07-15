<?php

namespace App\Http\Controllers\Transaction;

use App\Helpers\RuanganTransactionHelper;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class RuanganController extends Controller
{
    private $transactionHelper;

    public function __construct()
    {
        $this->transactionHelper = new RuanganTransactionHelper();
    }

    public function getAll()
    {
        $response = $this->transactionHelper->getAll();
        return response()->json($response, $response['status_code']);
    }

    public function getHistory()
    {
        $response = $this->transactionHelper->getHistory();
        return response()->json($response, $response['status_code']);
    }

    public function getById($id)
    {
        $response = $this->transactionHelper->getById($id);
        return response()->json($response, $response['status_code']);
    }

    public function store(Request $request)
    {
        if (isset($request->validator) && $request->validator->fails()) {
            return response()->json($request->validator->errors(), 422);
        }

        $payload = $request->only('ruangan_id',    'tgl_mulai',    'tgl_selesai', 'description');
        $response = $this->transactionHelper->create($payload);
        return response()->json($response, $response['status_code']);
    }

    public function update(Request $request, $id)
    {
        if (isset($request->validator) && $request->validator->fails()) {
            return response()->json($request->validator->errors(), 422);
        }
        $payload = $request->only('nama', 'deskripsi', 'status', 'foto');
        $response = $this->transactionHelper->update($payload, $id);
        return response()->json($response, $response['status_code']);
    }

    public function updateStatus($id, $status)
    {
        $response = $this->transactionHelper->updateStatus($id, $status);
        return response()->json($response, $response['status_code']);
    }


    public function delete($id)
    {
        $response = $this->transactionHelper->delete($id);
        return response()->json($response, $response['status_code']);
    }
}
