<?php

namespace App\Http\Requests\Master\Ruangan;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
{
    public $validator = null;

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'nama' => 'required',
            'deskripsi' => 'required',
        ];
    }

    /**
     * Setting custom message pesan error yang ditampilkan
     *
     * @return array
     */
    // public function messages()
    // {
    //     return [
    //         "judul.required"        => "Judul harus diisi",
    //         "kategori.required"     => "Kategori harus diisi",
    //         "foto.required"         => "Gambar harus diisi",
    //         "body.required"         => "Konten harus diisi",
    //         "is_active.required"    => "Status harus diisi"
    //     ];
    // }

    /**
     * Tampilkan pesan error ketika validasi gagal
     *
     * @return void
     */
    public function failedValidation(Validator $validator)
    {
        $this->validator = $validator;
    }
}
