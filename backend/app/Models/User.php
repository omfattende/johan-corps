<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name', 
        'email', 
        'password', 
        'role',
        'phone',
        'avatar'
    ];

    protected $hidden = [
        'password', 
        'remember_token'
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    // Roles
    public const ROLE_CLIENT = 'client';
    public const ROLE_ADMIN = 'admin';
    public const ROLE_WORKSHOP_OWNER = 'workshop_owner';
    public const ROLE_STORE_OWNER = 'store_owner';

    public function isClient(): bool
    {
        return $this->role === self::ROLE_CLIENT;
    }

    public function isAdmin(): bool
    {
        return $this->role === self::ROLE_ADMIN;
    }

    public function isWorkshopOwner(): bool
    {
        return $this->role === self::ROLE_WORKSHOP_OWNER;
    }

    public function isStoreOwner(): bool
    {
        return $this->role === self::ROLE_STORE_OWNER;
    }

    // Relaciones
    public function workshopReviews()
    {
        return $this->hasMany(WorkshopReview::class);
    }

    public function partReviews()
    {
        return $this->hasMany(PartReview::class);
    }

    public function storeReviews()
    {
        return $this->hasMany(StoreReview::class);
    }

    public function ownedWorkshop()
    {
        return $this->hasOne(Workshop::class, 'owner_id');
    }

    public function ownedStore()
    {
        return $this->hasOne(Store::class, 'owner_id');
    }
}
