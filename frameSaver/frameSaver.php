<?php

if($_POST["frameNumber"]){
    file_put_contents(sprintf("frames/%06d.jpg", $_POST["frameNumber"]),
        base64_decode(substr($_POST["url"], strpos($_POST["url"], ",") + 1))
    );
}