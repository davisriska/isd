<?php
	
	Route::get('/{any}', function () {
		return File::get(public_path('dist/index.html'));
	})->where('any', '.*');
