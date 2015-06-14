<?php
require 'lib/Slim/Slim.php';
require_once('Helper.php');
require_once('routes/news.php');

\Slim\Slim::registerAutoloader();

$app = new \Slim\Slim();

/*
class MiddlewareHeader extends \Slim\Middleware{
    public function call(){
        // Get reference to application
        $app = $this->app;
        // Run inner middleware and application
        $this->next->call();
        // set json Header
        $app->response->headers->set('Content-Type', 'application/json');
    }
}
$app->add(new MiddlewareHeader());
*/

$app->group('/news', function() use ($app){
  News::create($app);
});

$app->run();
?>
