<?php 
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

require_once('../../config/conection.php');

$params = json_decode(file_get_contents('php://input'), TRUE);

$iniciar = curl_init();
curl_setopt($iniciar, CURLOPT_RETURNTRANSFER, true);
$dados = array(
    'id_users'      => $params['p_id_users'],
    'title' 	    => $params['p_title'],
    'type_service'  => $params['p_type_service'],
    'obs'           => $params['p_obs'] 
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
    $query = $conn->prepare("INSERT INTO customers (id_users, title, type_service, obs) VALUES ('".$dados['id_users']."', '".$dados['title']."', '".$dados['type_service']."', '".$dados['obs']."')");
    if($query->execute()){
        echo json_encode(array('msg'=> 'Inserido com sucesso'));
    }


    // $arr = array();
    // while ($row = $query->fetchObject()) {
    //     $arr[] = $row;
    // }

    // echo json_encode($arr);
    //echo json_encode(array('msg'=> 'conectado com sucesso'));
}catch(PDOException $e){
    echo json_encode(array('error'=> $e->getMessage()));
}

?>