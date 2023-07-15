<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Master\DosenController;
use App\Http\Controllers\Master\MahasiswaController;
use App\Http\Controllers\Master\RuanganController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\Transaction\RuanganController as TransactionRuanganController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/register', [RegisterController::class, '__invoke']);
Route::post('/auth/login', [AuthController::class, 'login']);

Route::group([
    'middleware' => 'api',
    'namespace' => 'App\Http\Controllers',
    'prefix' => 'auth'

], function ($router) {
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
});

Route::group([
    'middleware' => 'api',
    'prefix'    => 'master'
], function ($router) {

    Route::group(['prefix' => 'dosen'], function ($router) {
        Route::post('/', [DosenController::class, 'store']);
        Route::get('/', [DosenController::class, 'getAll']);
        Route::get('/{id}', [DosenController::class, 'getById']);
        Route::put('/{id}', [DosenController::class, 'updateData']);
        Route::delete('/{id}', [DosenController::class, 'deleteData']);
    });

    // Route::group(['prefix' => 'mahasiswa', 'middleware' => 'jwt.verify'], function($router){
    Route::group(['prefix' => 'mahasiswa'], function ($router) {
        Route::post('/', [MahasiswaController::class, 'store']);
        Route::get('/', [MahasiswaController::class, 'getAll']);
        Route::get('/{id}', [MahasiswaController::class, 'getById']);
        Route::put('/{id}', [MahasiswaController::class, 'updateData']);
        Route::delete('/{id}', [MahasiswaController::class, 'deleteData']);
    });

    // Route::group(['prefix' => 'ruangan', 'middleware' => 'jwt.verify'], function($router){
    Route::group(['prefix' => 'ruangan'], function ($router) {
        Route::post('/', [RuanganController::class, 'store']);
        Route::get('/', [RuanganController::class, 'getAll']);
        Route::put('/{id}', [RuanganController::class, 'update']);
        Route::get('/{id}', [RuanganController::class, 'getById']);
        Route::delete('/{id}', [RuanganController::class, 'delete']);
    });
    // Route::group(['prefix' => 'ruangan', 'middleware' => 'jwt.verify'], function($router){
});

Route::group([
        'middleware' => 'api',
        'prefix'    => 'transaction'
    ], function ($router) {
        Route::group(['prefix' => 'ruangan'], function ($router) {
            Route::post('/', [TransactionRuanganController::class, 'store']);
            Route::get('/', [TransactionRuanganController::class, 'getAll']);
            Route::put('/{id}', [TransactionRuanganController::class, 'update']);
            Route::get('/{id}', [TransactionRuanganController::class, 'getById']);
            Route::delete('/{id}', [TransactionRuanganController::class, 'delete']);
        });
    });
