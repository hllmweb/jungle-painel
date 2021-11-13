<?php 
header('Access-Control-Allow-Origin: *');
header('Content-type: application/json');

require_once('../../config/conection.php');

// $params = json_decode(file_get_contents('php://input'), TRUE);

// $iniciar = curl_init();
// curl_setopt($iniciar, CURLOPT_RETURNTRANSFER, true);
// $dados = array(
//     'opcao' 	=> trim($params['p_opcao']),
// );

// curl_setopt($iniciar, CURLOPT_POST, true);
// curl_setopt($iniciar, CURLOPT_POSTFIELDS, $dados);
// curl_setopt($iniciar, CURLOPT_HTTPHEADER, array(                                                                          
//     'Content-Type: application/json',                                                                                
//     'Content-Length: '.count($dados))                                                                       
// );   
// curl_exec($iniciar);


try{
    $conn = new PDO(tns, user, pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);    
    $query = $conn->prepare("SELECT * FROM customers");
    $query->execute();

    $arr = array();
    while ($row = $query->fetchObject()) {
        $arr[] = $row;
    }

    echo json_encode($arr);
    //echo json_encode(array('msg'=> 'conectado com sucesso'));
}catch(PDOException $e){
    echo json_encode(array('error'=> $e->getMessage()));
}

?>