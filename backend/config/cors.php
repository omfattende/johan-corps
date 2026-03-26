<?php

$origins = env('CORS_ALLOWED_ORIGINS', 'http://localhost:4200,http://localhost:3000');
$originsArray = array_map('trim', explode(',', $origins));

return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => $originsArray,
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
