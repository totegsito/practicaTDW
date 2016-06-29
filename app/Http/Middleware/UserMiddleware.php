<?php

namespace App\Http\Middleware;

use Closure;

class UserMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if($request->user()->roles === 1){
            return redirect('admin');
        }else if( $request->user()->enabled === 0 ){
            return redirect('notenabled');
        }
        return $next($request);
    }
}
