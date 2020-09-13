<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Test</title>

    <!-- Bootstrap CSS -->
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../dist/SimpleBookingCalendar.min.css">
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
            <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.3/html5shiv.js"></script>
            <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
        <![endif]-->
</head>

<body>
    <div id="calendar">

    </div>
    <style>
        .selected_day,
        .hover_day {
            background-color: dimgrey;
            color: white;
        }
    </style>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="../dist/SimpleBookingCalendar.min.js"></script>
    <script>
        var calendar = new SimpleBookingCalendar('calendar', 'main.php');
        calendar.on('rangeselect', function(start, end){
            alert(`${start} to ${end}`);
        })
        calendar.on('select', function (type, date) {
            console.log(type, date);
        })
        calendar.on('unselect', function (type, date) {
            console.log(type, date);
        })
    </script>
</body>

</html>