<?php 
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

require_once('../config/conection.php');

$params = json_decode(file_get_contents('php://input'), TRUE);

$iniciar = curl_init();
curl_setopt($iniciar, CURLOPT_RETURNTRANSFER, true);
$dados = array(
    'login' 	=> trim($params['p_login']),
    'password'  => trim($params['p_password'])
);

curl_setopt($iniciar, CURLOPT_POST, true);
curl_setopt($iniciar, CURLOPT_POSTFIELDS, $dados);
curl_setopt($iniciar, CURLOPT_HTTPHEADER, array(                                                                          
    'Content-Type: application/json',                                                                                
    'Content-Length: '.count($dados))                                                                       
);   
curl_exec($iniciar);


try{
    $conn = new PDO(tns, user, pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);    
    $query = $conn->prepare("SELECT * FROM users WHERE login=:login and password=:password");
    $query->execute([
        ":login"        => $dados['login'],
        ":password"     => $dados['password']
    ]);

    echo json_encode($query->fetchObject());

    //echo json_encode(array('msg'=> 'conectado com sucesso'));
}catch(PDOException $e){
    echo json_encode(array('error'=> $e->getMessage()));
}

?>