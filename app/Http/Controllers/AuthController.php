<?php
	
	namespace App\Http\Controllers;
	
	use App\Http\Requests\Auth\Register;
	use App\User;
	use Illuminate\Http\JsonResponse;
	
	class AuthController extends Controller {
		
		/**
		 * Create a new AuthController instance.
		 *
		 * @return void
		 */
		public function __construct() {
			$this->middleware('auth:api', [
				'except' => [
					'login',
					'register',
				],
			]);
		}
		
		/**
		 * Get a JWT via given credentials.
		 *
		 * @return JsonResponse
		 */
		public function login() {
			$credentials = request([
				                       'username',
				                       'password',
			                       ]);
			
			if (!$token = auth()->attempt($credentials)) {
				return response()->json(['error' => 'Unauthorized'], 401);
			}
			
			return $this->respondWithToken($token);
		}
		
		public function register(Register $request) {
			$credentials = $request->validated();
			
			User::create(array_merge($credentials, ['password' => bcrypt($credentials['password'])]));
			
			if (!$token = auth()->attempt($credentials)) {
				return response()->json(['error' => 'Unauthorized'], 401);
			}
			
			return $this->respondWithToken($token);
		}
		
		/**
		 * Get the authenticated User.
		 *
		 * @return JsonResponse
		 */
		public function me() {
			return response()->json(auth()->user());
		}
		
		/**
		 * Log the user out (Invalidate the token).
		 *
		 * @return JsonResponse
		 */
		public function logout() {
			auth()->logout();
			
			return response()->json(['message' => 'Successfully logged out']);
		}
		
		/**
		 * Refresh a token.
		 *
		 * @return JsonResponse
		 */
		public function refresh() {
			return $this->respondWithToken(auth()->refresh());
		}
		
		/**
		 * Get the token array structure.
		 *
		 * @param string $token
		 *
		 * @return JsonResponse
		 */
		protected function respondWithToken($token) {
			return response()->json(auth()->user())->withCookie($this->cookie($token));
		}
		
		protected function cookie($token = null, $forget = false) {
			$cookie = cookie('token', $token, auth()->factory()->getTTL(), null, null, false);
			
			if ($forget) {
				$cookie = cookie()->forget('token');
			}
			
			return $cookie;
		}
	}
