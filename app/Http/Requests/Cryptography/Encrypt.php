<?php
	
	namespace App\Http\Requests\Cryptography;
	
	use Illuminate\Foundation\Http\FormRequest;
	
	class Encrypt extends FormRequest {
		/**
		 * Determine if the user is authorized to make this request.
		 *
		 * @return bool
		 */
		public function authorize() {
			return auth()->check();
		}
		
		/**
		 * Get the validation rules that apply to the request.
		 *
		 * @return array
		 */
		public function rules() {
			return [
				'data' => 'required|string',
			];
		}
	}
