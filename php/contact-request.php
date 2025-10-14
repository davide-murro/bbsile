<?php
require '../lib/PHPMailer/src/PHPMailer.php';
require '../lib/PHPMailer/src/SMTP.php';
require '../lib/PHPMailer/src/Exception.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

session_start();

$result = NULL;
$errorMessage = NULL;

// Check form sender
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    $result = false;
    $errorMessage = 'Il modulo non è stato inviato correttamente.';
} else if ($_POST['f-captcha'] !== $_SESSION['contact-captcha']) {
    $result = false;
    $errorMessage = 'Codice captcha non valido.';
} else {
    // Get form data
    $surname = htmlspecialchars($_POST['f-surname']);
    $name = htmlspecialchars($_POST['f-name']);
    $email = htmlspecialchars($_POST['f-email']);
    $phone = htmlspecialchars($_POST['f-phone']);
    $checkIn = htmlspecialchars($_POST['f-check-in']);
    $checkOut = htmlspecialchars($_POST['f-check-out']);
    $message = htmlspecialchars($_POST['f-message']);

    // Configure PHPMailer
    $mail = new PHPMailer(true);

    try {
        // SMTP Configuration
        $mail->isSMTP();
        /*
        $mail->Host = 'smtp.bbsile.it';
        $mail->SMTPAuth = true;
        $mail->Username = '';
        $mail->Password = '';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 25;
        */
        $mail->Host = 'localhost';
        $mail->SMTPAuth = false;
        $mail->Port = 25;

        // Sender and recipient
        $mail->setFrom('info@bbsile.it', 'Bed & Breakfast Sile');
        $mail->addCC('info@bbsile.it', 'Bed & Breakfast Sile');
        $mail->addAddress($email, $name); 

        // Email content
        $mail->isHTML(true);
        $mail->Subject = 'Richiesta informazioni bbsile.it - Treviso';
        $mail->Body = '<div style="font-family: sans-serif; background-color: #F2F2F2; color: #212121; text-align: center; padding: 1em;">
                            <h1 style="font-family: sans-serif; color: #1B7979;">La ringraziamo per la sua richiesta.</h1>

                            <div style="padding: 1em 0;"> 
                                <p>Inoltro copia del messagio</p>

                                <p><strong>Cognome:</strong> ' . $surname . '</p>
                                <p><strong>Nome:</strong> ' . $name . '</p>
                                <p><strong>E mail:</strong> ' . $email . '</p>
                                <p><strong>Telefono:</strong> ' . $phone . '</p>
                                <p><strong>Data arrivo:</strong> ' . $checkIn . '</p>
                                <p><strong>Data partenza:</strong> ' . $checkOut . '</p>
                                <p><strong>Messaggio:</strong><br>' . $message . '</p>
                            </div>

                            <p>Le risponderemo al più presto.</p>
                            <p><a href="https://www.bbsile.it/" style="color: #8F5C1E; text-decoration: underline;">Bed & Breakfast Sile!</a></p>
                        </div>';

        // Send email
        $mail->send();
        $result = true;
    } catch (Exception $e) {
        $result = false;
        $errorMessage = $mail->ErrorInfo;
    }
}

?>

<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="utf-8">
	<title>Richiesta Informazioni - Bed and Breakfast Sile - Treviso</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" type="text/css" href="../css/style.css?v=1"/>
</head>
<body>

    <div class="center-container">
        <?php if($result) { ?>
            <h1>Richiesta informazioni inviata</h1>
            <p>Ti abbiamo inoltrato una copia della mail inoltrata. Ti risponderemo il prima possibile.</p>
            <p>Se non vedi le nostre mail controlla in <b>SPAM</b>!</p>
            <p>
                <a href="../index.html">Torna alla home</a>
            </p>
        <?php } else { ?>
            <h1 class="error-color">Errore durante l'invio dell'email</h1>
            <p><?php echo $errorMessage ?></p>
            <p>
                <a href="../contacts.html">Torna alla pagina contatti</a>
                o
                <a href="../index.html">Vai alla home</a>
            </p>
        <?php } ?>
    </div>

</body>
</html>