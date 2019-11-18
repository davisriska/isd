<?php
	
	namespace App\Http\Controllers;
	
	use App\Http\Requests\Cryptography\Decrypt;
	use App\Http\Requests\Cryptography\Encrypt;
	
	class CryptographyController extends Controller {
		
		public function __construct() {
			$this->middleware('auth:api');
		}
		
		public function encrypt(Encrypt $request) {
			return response()->json(['data' => encrypt($request->input('data'))]);
		}
		
		
		public function decrypt(Decrypt $request) {
			return response()->json(['data' => decrypt($request->input('data'))]);
		}
		
	}
