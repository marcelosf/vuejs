<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

require_once __DIR__ . '/vendor/autoload.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
$app = new Silex\Application();

function getBills($resource)
{
    $json = file_get_contents(__DIR__ .'/'. $resource .'.json');
    $data = json_decode($json, true);
    return $data['bills'];
}

function findIndexById($id, $resource)
{
    $bills = getBills($resource);
    foreach ($bills as $key => $bill) {
        if ($bill['id'] == $id) {
            return $key;
        }
    }
    return false;
}

function writeBills($bills, $resource)
{
    $data = ['bills' => $bills];
    $json = json_encode($data);
    file_put_contents(__DIR__ . '/' . $resource .'.json', $json);
}

$app->before(function (Request $request) {
    if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
        $data = json_decode($request->getContent(), true);
        $request->request->replace(is_array($data) ? $data : array());
    }
});

$app->get('api/bills', function () use ($app) {
    $bills = getBills('bills');
    return $app->json($bills);
});

$app->get('api/bills/total', function () use ($app) {
    $bills = getBills('bills');
    $sum=0;
    foreach ($bills as $value) {
        $sum += (float)$value['value'];
    }
    return $app->json(['total' => $sum]);
});

$app->get('api/bills/{id}', function ($id) use ($app) {
    $bills = getBills('bills');
    $bill = $bills[findIndexById($id, 'bills')];
    return $app->json($bill);
});

$app->post('api/bills', function (Request $request) use ($app) {
    $bills = getBills('bills');
    $data = $request->request->all();
    $data['id'] = rand(100,100000);
    $bills[] = $data;
    writeBills($bills, 'bills');
    return $app->json($data);
});

$app->put('api/bills/{id}', function (Request $request, $id) use ($app) {
    $bills = getBills('bills');
    $data = $request->request->all();
    $index = findIndexById($id, 'bills');
    $bills[$index] = $data;
    $bills[$index]['id'] = (int)$id;
    writeBills($bills, 'bills');
    return $app->json($bills[$index]);
});

$app->delete('api/bills/{id}', function ($id) {
    $bills = getBills('bills');
    $index = findIndexById($id, 'bills');
    array_splice($bills,$index,1);
    writeBills($bills, 'bills');
    return new Response("", 204);
});


/**
 * Bills resource Routes.
 */


$app->get('api/bills-receive', function () use ($app) {
    $bills = getBills('bills_receive');
    return $app->json($bills);
});

$app->get('api/bills-receive/total', function () use ($app) {
    $bills = getBills('bills_receive');
    $sum=0;
    foreach ($bills as $value) {
        $sum += (float)$value['value'];
    }
    return $app->json(['total' => $sum]);
});

$app->get('api/bills-receive/{id}', function ($id) use ($app) {
    $bills = getBills('bills_receive');
    $bill = $bills[findIndexById($id, 'bills_receive')];
    return $app->json($bill);
});

$app->post('api/bills-receive', function (Request $request) use ($app) {
    $bills = getBills('bills_receive');
    $data = $request->request->all();
    $data['id'] = rand(100,100000);
    $bills[] = $data;
    writeBills($bills, 'bills_receive');
    return $app->json($data);
});

$app->put('api/bills-receive/{id}', function (Request $request, $id) use ($app) {
    $bills = getBills('bills_receive');
    $data = $request->request->all();
    $index = findIndexById($id, 'bills_receive');
    $bills[$index] = $data;
    $bills[$index]['id'] = (int)$id;
    writeBills($bills, 'bills_receive');
    return $app->json($bills[$index]);
});

$app->delete('api/bills-receive/{id}', function ($id) {
    $bills = getBills('bills_receive');
    $index = findIndexById($id, 'bills_receive');
    array_splice($bills,$index,1);
    writeBills($bills, 'bills_receive');
    return new Response("", 204);
});

$app->match("{uri}", function($uri){
    return "OK";
})
->assert('uri', '.*')
->method("OPTIONS");


$app->run();