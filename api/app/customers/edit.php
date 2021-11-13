<?php 
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

require_once('../../config/conection.php');

$params = json_decode(file_get_contents('php://input'), TRUE);

$iniciar = curl_init();
curl_setopt($iniciar, CURLOPT_RETURNTRANSFER, true);
$dados = array(
    'id'            => $params['p_id'],
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
    $query = $conn->prepare("UPDATE customers SET title='".$dados['title']."', 
                                           type_service='".$dados['type_service']."', 
                                           obs='".$dados['obs']."' where id={$dados['id']} and id_users={$dados['id_users']}");
    if($query->execute()){
        echo json_encode(array('msg'=> 'Editado com sucesso'));
    }

}catch(PDOException $e){
    echo json_encode(array('error'=> $e->getMessage()));
}


?>