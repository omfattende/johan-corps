<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json(['status' => 'Mecánica Web API', 'version' => '1.0']);
});
