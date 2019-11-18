<?php
	
	namespace App\Http\Requests\Auth;
	
	use Illuminate\Foundation\Http\FormRequest;
	
	class Register extends FormRequest {
		/**
		 * Determine if the user is authorized to make this request.
		 *
		 * @return bool
		 */
		public function authorize() {
			return auth()->guest();
		}
		
		/**
		 * Get the validation rules that apply to the request.
		 *
		 * @return array
		 */
		public function rules() {
			return [
				'username' => 'required|string|unique:users',
				'password' => 'required|string'
			];
		}
	}
