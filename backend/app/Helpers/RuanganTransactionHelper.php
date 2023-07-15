<?php

namespace App\Helpers;

use App\Models\Transaction\HistoryPeminjamanRuangan;
use Illuminate\Support\Facades\DB;

class RuanganTransactionHelper
{
  private $ruanganModel;

  public function __construct()
  {
    $this->ruanganModel = new HistoryPeminjamanRuangan();
  }

  public function getAll()
  {
    return [
      'status_code' => 200,
      'data' => $this->ruanganModel->getAll(),
      'message' => 'Data berhasil diambil'
    ];
  }

  public function getById($id)
  {
    return ($this->ruanganModel->getById($id) == null) ? [
      'status_code' => 404,
      'data' => null,
      'message' => 'Data tidak ditemukan'
    ] : [
      'status_code' => 200,
      'data' => $this->ruanganModel->getById($id),
      'message' => 'Data berhasil diambil'
    ];
  }

  public function create(array $payload)
  {
    DB::beginTransaction();

    try {
      $ruangan = $this->ruanganModel->store($payload);
      DB::commit();
      return [
        'status_code' => 200,
        'data' => $ruangan,
        'message' => 'Data berhasil disimpan'
      ];
    } catch (\Exception $e) {
      DB::rollBack();
      return [
        'status_code' => 422,
        'data' => null,
        'message' => $e->getMessage()
      ];
    }
  }

  public function update(array $payload, int $id)
  {
    DB::beginTransaction();

    try {
      $dataLama = $this->ruanganModel->getById($id);

      $ruangan = $this->ruanganModel->updateData($id, $payload);
      DB::commit();
      return [
        'status_code' => 200,
        'data' => $ruangan,
        'message' => 'Data berhasil diupdate'
      ];
    } catch (\Exception $e) {
      DB::rollBack();
      return [
        'status_code' => 422,
        'data' => null,
        'message' => $e->getMessage()
      ];
    }
  }

  public function delete(int $id)
  {
    DB::beginTransaction();

    try {
      $ruangan = $this->ruanganModel->deleteData($id);
      DB::commit();
      if ($ruangan == 1) {
        # code...
        return [
          'status_code' => 200,
          'data' => ['id' => $id],
          'message' => 'Data berhasil dihapus'
        ];
      } else {
        return [
          'status_code' => 404,
          'data' => ['id' => $id],
          'message' => 'Data tidak ditemukan'
        ];
      }
    } catch (\Exception $e) {
      DB::rollBack();
      return [
        'status_code' => 422,
        'data' => null,
        'message' => $e->getMessage()
      ];
    }
  }
}
