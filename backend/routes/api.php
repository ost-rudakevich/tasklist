<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->group(function () {
  Route::get('/logout', [AuthController::class, 'logout']);
  Route::post('tasks', [TaskController::class, 'store']);
  Route::get('tasks', [TaskController::class, 'index']);
  Route::get('tasks/{task}', [TaskController::class, 'show']);
  Route::put('tasks/{task}', [TaskController::class, 'update']);
  Route::delete('tasks/{task}', [TaskController::class, 'destroy']);
});

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
