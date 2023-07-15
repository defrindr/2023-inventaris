<?php

namespace App\Helpers;

use App\Models\Master\Ruangan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class RuanganHelper
{
  private $ruanganModel;

  public function __construct()
  {
    $this->ruanganModel = new Ruangan();
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

  public function getAvailable()
  {
    return [
      'status_code' => 200,
      'data' => $this->ruanganModel->active()->available()->get(),
      'message' => 'Data berhasil diambil'
    ];
  }

  public function create(array $payload)
  {
    DB::beginTransaction();

    try {
      if (!empty($payload["foto"])) {
        $folderPath = "/ruangan/";

        $image_parts = explode(";base64,", $payload["foto"]);
        $image_type_aux = explode("image/", $image_parts[0]);
        $image_type = $image_type_aux[1];
        $image_base64 = base64_decode($image_parts[1]);
        $file = $folderPath . uniqid() . "." . $image_type;
        Storage::disk('public')->put($file, $image_base64);
        $payload["foto"] = $file;
      }
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
      if (isset($payload["foto"]) && $payload["foto"] != null) {
        if ($dataLama["foto"] && file_exists(public_path('storage/' . $dataLama["foto"]))) {
          // dd($dataLama["ttd_path"] . $dataLama["ttd"]);
          // Storage::delete('storage/' . $dataLama["ttd_path"] . $dataLama["ttd"]);
          unlink(public_path('storage/' . $dataLama["foto"]));
        }
        $folderPath = "/ruangan/";

        $image_parts = explode(";base64,", $payload["foto"]);
        $image_type_aux = explode("image/", $image_parts[0]);
        $image_type = $image_type_aux[1];
        $image_base64 = base64_decode($image_parts[1]);
        $file = $folderPath . uniqid() . "." . $image_type;
        Storage::disk('public')->put($file, $image_base64);
        $payload["foto"] = $file;
      }
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
