<?php

namespace App\Helpers;

use App\Models\Transaction\HistoryPeminjamanRuangan;
use Illuminate\Support\Facades\DB;
use App\Models\Master\Ruangan;

class RuanganTransactionHelper
{
  private $transaction, $ruangan;

  private function sendResponse($code = 200, $message = "Resposne", $data = null)
  {
    return [
      'status_code' => $code,
      'data' => $data,
      'message' => $message
    ];
  }


  public function __construct()
  {
    $this->transaction = new HistoryPeminjamanRuangan();
    $this->ruangan = new Ruangan();
  }

  public function getAll()
  {
    return $this->sendResponse(200, "Data berhasil diambil", $this->transaction->getAllProgress());
  }

  public function getHistory()
  {
    return $this->sendResponse(200, "Data berhasil diambil", $this->transaction->getAllHistory());
  }

  public function getById($id)
  {
    return ($this->transaction->getById($id) == null)
      ? $this->sendResponse(404, "Data tidak ditemukan")
      : $this->sendResponse(200, "Data berhasil diambil", $this->transaction->getById($id));
  }

  public function create(array $payload)
  {
    DB::beginTransaction();

    try {
      if (!$this->ruangan->isAvailable($payload['ruangan_id'])) {
        DB::rollBack();
        return $this->sendResponse(400, "Ruangan sedang tidak tersedia");
      }
      $model = $this->transaction->store($payload);
      if (!$model) {
        DB::rollBack();
        return $this->sendResponse(422, "Peminjaman gagal dibuat");
      }

      $model->ruangan->changeToBooked();
      DB::commit();
      return $this->sendResponse(200, "Data berhasil disimpan", $model);
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
      $ruangan = $this->transaction->updateData($id, $payload);
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


  public function updateStatus(int $id, string $status)
  {
    DB::beginTransaction();

    try {
      $model = $this->transaction->getById($id);
      // check if data exist
      if (!$model) {
        return $this->sendResponse(404, "Data not found");
      }
      // scenario change status by old status

      if (!in_array($status, ["tertunda", "ditolak", "dipinjam", "ajukankembali", "dikembalikan"])) {
        return $this->sendResponse(400, "Status invalid");
      }

      switch ($model->status) {
        case 'tertunda':
          $valid = false;
          if ($status == "ditolak") {
            $valid = $model->ruangan->changeToAvailable() && $model->changeStatus('ditolak');
          } else if ('dipinjam') {
            $valid = $model->changeStatus('dipinjam');
          } else {
            return $this->sendResponse(400, "Bad request when change status");
          }

          if (!$valid) {
            DB::rollBack();
            return $this->sendResponse(400, "Failed to update status");
          }
          DB::commit();
          return $this->sendResponse(200, "berhasil mengubah status");
          break;
        case 'dipinjam':
          $valid = false;
          if ($status == "ajukankembali") {
            $valid = $model->changeStatus('ajukankembali');
          } else {
            return $this->sendResponse(400, "Bad request when change status");
          }

          if (!$valid) {
            DB::rollBack();
            return $this->sendResponse(400, "Failed to update status");
          }
          DB::commit();
          return $this->sendResponse(200, "berhasil mengubah status");
          break;
        case 'ajukankembali':
          $valid = false;
          if ($status == "dikembalikan") {
            $valid = $model->ruangan->changeToAvailable() && $model->changeStatus('dikembalikan');
          } else if ($status == "dipinjam") {
            $valid = $model->changeStatus('dipinjam');
          } else {
            return $this->sendResponse(400, "Bad request when change status");
          }

          if (!$valid) {
            DB::rollBack();
            return $this->sendResponse(400, "Failed to update status");
          }
          DB::commit();
          return $this->sendResponse(200, "berhasil mengubah status");
          break;
        default:
          return $this->sendResponse(400, "Bad request when change status");
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

  public function delete(int $id)
  {
    DB::beginTransaction();
    $user = auth()->user();
    if (!$user) {
      return $this->sendResponse(401, "Unauthorization");
    }

    try {

      $model = $this->transaction->getById($id);
      if (!$model) return  [
        'status_code' => 404,
        'data' => ['id' => $id],
        'message' => 'Data tidak ditemukan'
      ];
      if (in_array($model->status, ['dipinjam', 'tertunda', 'ajukankembali'])) {
        if ($user->id === $model->user_id && $model->status === "tertunda") {
          // change room status to available, if user performing delete is creator
          $model->ruangan->changeToAvailable();
        } else {
          return $this->sendResponse(400, 'Tidak dapat menghapus data dengan status tertunda / ajukankembali / dipinjam');
        }
      }

      $ruangan = $this->transaction->deleteData($id);
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
