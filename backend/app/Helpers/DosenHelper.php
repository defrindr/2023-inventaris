<?php

namespace App\Helpers;

use App\Models\Master\Dosen;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class DosenHelper
{
  private $dosenModel;
  public function __construct()
  {
    $this->dosenModel = new Dosen();
  }

  public function getAll()
  {
    return [
      'status_code' => 200,
      'data' => $this->dosenModel->getAll(),
      'message' => 'Data berhasil diambil'
    ];
  }

  public function getById($id)
  {
    return ($this->dosenModel->getById($id) == null) ? [
      'status_code' => 404,
      'data' => null,
      'message' => 'Data tidak ditemukan'
    ] : [
      'status_code' => 200,
      'data' => $this->dosenModel->getById($id),
      'message' => 'Data berhasil diambil'
    ];
  }

  public function create(array $payload)
  {
    DB::beginTransaction();

    try {
      $payload['role'] = 'dosen';
      if (isset($payload['password']) && !$payload['password'] == null) {
        $payload['password'] = bcrypt($payload['password']);
      }
      if (!empty($payload["foto"])) {
        $folderPath = "/dosen/";

        $image_parts = explode(";base64,", $payload["foto"]);
        $image_type_aux = explode("image/", $image_parts[0]);
        $image_type = $image_type_aux[1];
        $image_base64 = base64_decode($image_parts[1]);
        $file = $folderPath . uniqid() . "." . $image_type;
        Storage::disk('public')->put($file, $image_base64);
        $payload["foto"] = $file;
      }
      $dosen = $this->dosenModel->store($payload);
      DB::commit();
      return [
        'status_code' => 200,
        'data' => $dosen,
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
      if (isset($payload['password']) && !$payload['password'] == null) {
        $payload['password'] = bcrypt($payload['password']);
      }
      if (empty($payload['password'])) {
        unset($payload['password']);
      }
      $dataLama = $this->dosenModel->getById($id);
      if (isset($payload["foto"]) && $payload["foto"] != null) {
        if ($dataLama["foto"] && file_exists(public_path('storage/' . $dataLama["foto"]))) {
          unlink(public_path('storage/' . $dataLama["foto"]));
        }
        $folderPath = "/dosen/";

        $image_parts = explode(";base64,", $payload["foto"]);
        $image_type_aux = explode("image/", $image_parts[0]);
        $image_type = $image_type_aux[1];
        $image_base64 = base64_decode($image_parts[1]);
        $file = $folderPath . uniqid() . "." . $image_type;
        Storage::disk('public')->put($file, $image_base64);
        $payload["foto"] = $file;
      }
      $dosen = $this->dosenModel->updateData($id, $payload);
      DB::commit();
      return [
        'status_code' => 200,
        'data' => $dosen,
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
      $dosen = $this->dosenModel->deleteData($id);
      DB::commit();
      if ($dosen == 1) {
        # code...
        return [
          'status_code' => 200,
          'data' => $dosen,
          'message' => 'Data berhasil dihapus'
        ];
      } else {
        return [
          'status_code' => 404,
          'data' => $dosen,
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
