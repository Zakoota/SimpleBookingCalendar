<?php
if (isset($_GET['date'])) {
    $date = explode('-', $_GET['date']);
    $out_arr = array();
    for ($i = 1; $i <= cal_days_in_month(CAL_GREGORIAN, $date[1], $date[0]); $i++) {
        $newDate = array($date[0], $date[1], str_pad($i, 2, '0', STR_PAD_LEFT));
        $date_arr = array(
            $date[0],
            $date[1],
            str_pad($i, 2, '0', STR_PAD_LEFT),
        );
        $res = round(mt_rand(100, 1000) / 1000);
        if ($res) {
            $out_arr[implode('-', $date_arr)] = $res;
        }
    }
    header('content-type: application/json');
    echo json_encode($out_arr);die;
}
