<?php

namespace App\Http\Controllers;

use App\Helpers\MahasiswaHelper;
use App\Http\Requests\Register\RegisterRequest;
use Illuminate\Http\Request;

class RegisterController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(RegisterRequest $request)
    {
        $mahasiswaHelper = new MahasiswaHelper();
        if (isset($request->validator) && $request->validator->fails()) {
            return response()->json($request->validator->errors(), 422);
        }
        $payload = $request->only('nama', 'username', 'email', 'no_identitas', 'no_hp', 'password','foto');
        $response = $mahasiswaHelper->create($payload);
        return response()->json($response, $response['status_code']);
    }
}
