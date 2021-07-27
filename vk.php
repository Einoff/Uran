<?php
  $file = $_FILE['file1'];
  $url = $_POST['url'];
  
  echo($url);

  $postparam=array("file1"=> $file);
  //Отправляем файл на сервер
  $ch = curl_init();

  curl_setopt($ch, CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_POST, true);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($ch, CURLOPT_POSTFIELDS,$postparam);
  curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: multipart/form-data; charset=UTF-8'));
  $json = json_decode(curl_exec($ch));
  curl_close($ch);


  echo($json);
?>