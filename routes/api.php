<?php
	
	Route::post('login', 'AuthController@login');
	Route::post('register', 'AuthController@register');
	Route::post('logout', 'AuthController@logout');
	
	Route::get('me', 'AuthController@me');
	
	Route::post('encrypt', 'CryptographyController@encrypt');
	Route::post('decrypt', 'CryptographyController@decrypt');
	
