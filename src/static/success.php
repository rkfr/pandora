<?php
header("Content-Type: text/html; charset=utf-8");
$email = htmlspecialchars($_POST["email"]);
$name = htmlspecialchars($_POST["name"]);
$tel = htmlspecialchars($_POST["tel"]);
$refferer = getenv('HTTP_REFERER');
$date=date("d.m.y"); // число.месяц.год  
$time=date("H:i"); // часы:минуты:секунды 
$myemail = "marmorela@ukr.net"; // e-mail администратора
$getEmail = htmlspecialchars($_POST["email"]);
$getMark = htmlspecialchars($_POST["mark"]);
$getModel = htmlspecialchars($_POST["model"]);
$getMile = htmlspecialchars($_POST["mile"]);
$getYear = htmlspecialchars($_POST["year"]);
$getComment = htmlspecialchars($_POST["comment"]);
$getComment = nl2br($getComment);
$getModel = htmlspecialchars($_POST["model"]);
$useremail = "" ;
if ($email) {
	$useremail = "<b>Email клиента:</b> " . $email ."<br>";
}
$mark = "" ;
if ($getMark) {
	$mark = "<b>Марка авто:</b> " . $getMark ."<br>";
}
$model = "" ;
if ($getModel) {
	$model = "<b>Модель авто:</b> " . $getModel ."<br>";
}
$mile = "" ;
if ($getMile) {
	$mile = "<b>Пробег авто:</b> " . $getMile ."<br>";
}
$year = "" ;
if ($getYear) {
	$year = "<b>Год авто:</b> " . $getYear ."<br>";
}
$comment = "" ;
if ($getComment) {
	$comment = "<b>Комментарий:</b><br>" . $getComment ."<br>";
}

// Отправка письма администратору сайта

$tema = "Заявка Pandora";
$message_to_myemail = "
<b>Имя:</b> $name<br>
<b>Телефон:</b> $tel<br>
$useremail $mark $model $mile $year $comment
<b>Источник (ссылка):</b> $refferer
";

mail($myemail, $tema, $message_to_myemail, "From: <marmorela@ukr.net> \r\n Pandora \r\n"."MIME-Version: 1.0\r\n"."Content-type: text/html; charset=utf-8\r\n" );


// Отправка письма пользователю

$tema = "Консультация Pandora";
$message_to_myemail = "
Здравствуйте.<br>
Ваша заявка в обработке.<br>
<br>
C уважением, Pandora
";
$myemail = $email;
mail($myemail, $tema, $message_to_myemail, "From: <marmorela@ukr.net> \r\n Pandora \r\n"."MIME-Version: 1.0\r\n"."Content-type: text/html; charset=utf-8\r\n" );

?>