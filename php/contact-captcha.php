<?php

session_start();

$image = imagecreatetruecolor(120, 60);
$background = imagecolorallocate($image, 200, 200, 200);
imagefill($image, 0, 0, $background);

$linesColor = imagecolorallocate($image, 100, 100, 100);
for ($i=1; $i<=5; $i++) {
   imagesetthickness($image, rand(1, 2));
   imageline($image, 0, rand(0, 60), 120, rand(0, 60), $linesColor);
}

$captcha = '';
$textColor = imagecolorallocate($image, 0, 0, 0);
for ($x = 15; $x <= 95; $x += rand(15, 25)) {
    $value = rand(0, 9);
    imagechar($image, rand(2, 4), $x, rand(6, 40), $value, $textColor);

    $captcha .= $value;
}

$_SESSION['contact-captcha'] = $captcha;

header('Content-type: image/png');
header("Cache-Control: no-cache");
header("Pragma: no-cache");
header("Expires: 0");
imagepng($image);
imagedestroy($image);

?>