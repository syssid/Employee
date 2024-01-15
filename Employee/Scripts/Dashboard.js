var chart = '';
var dataPoints = [];
$(document).ready(function () {
    $(document).ajaxSend(function () {
        $("#overlay").fadeIn(500);
    });
    $.ajax({
        type: 'POST',
        url: 'WebMethod/WebEmployee.aspx/GetIndicater',
        contentType: 'application/json',
        dataType: 'json',
        success: function (response) {
            mydata = response.d;
            var parsedData = JSON.parse(mydata);
            if (parsedData.length > 0) {
                for (var i = 0; i < parsedData.length; i++) {
                    dataPoints.push({ x: parsedData[i].X, y: parsedData[i].Y });
                }
                chart = new CanvasJS.Chart("chartContainer", {
                    theme: "light2",
                    zoomEnabled: true,
                    animationEnabled: true,
                    title: {
                        text: "Line Chart Data-Points"
                    },
                    data: [
                        {
                            type: "line",
                            dataPoints: dataPoints,
                        }
                    ]
                })
                chart.render();

            } else {
                alert('No Data Found');
            }
        },
        error: function () {
            alert('Error Encountered while fetching data from the database');
        }
    }).done(function () {
        setTimeout(function () {
            $("#overlay").fadeOut(500);
        }, 1000);
    });
});
function PDFExport() {
    var zoomFrom = parseInt($("#zoomFrom").val());
    var zoomTo = parseInt($("#zoomTo").val());
    if (isNaN(zoomFrom) || isNaN(zoomTo)) {
        alert('Please Enter valid From and To Values');
        return;
    }
    if (zoomFrom > zoomTo) {
        alert('From Value Could Not Be Gretaer Than To Values');
        return;
    }
    var LastItem = parseInt(dataPoints.slice(-1).pop().x);
    if (zoomFrom >= LastItem) {
        alert('Incorrect Search');
        return;
    }
    if (zoomTo > LastItem) {
        alert('The Maximum Limit You Can Search is ' + LastItem);
        return;
    }
    var updatedChart = new CanvasJS.Chart("chartContainer2", {
        theme: "light2",
        zoomEnabled: true,
        animationEnabled: true,
        title: {
            text: "Line Chart Data-Points"
        },
        data: [
            {
                type: "line",
                dataPoints: dataPoints
            }
        ]
    });
    updatedChart.set("axisX", { minimum: zoomFrom, maximum: zoomTo });
    updatedChart.render();
    var canvas = $("#chartContainer2 .canvasjs-chart-canvas").get(0);
    var dataURL = canvas.toDataURL();
    var pdf = new jsPDF();
    pdf.addImage(dataURL, 'JPEG', 3, 10, -170, 0);
    pdf.save("Line_Chart_Data-Points.pdf");
}
function ExportExcel() {
    var fromValue = parseInt($('#txtfrom').val());
    var toValue = parseInt($('#txtTo').val());
    if (isNaN(fromValue) || isNaN(toValue)) {
        alert('Please Enter valid From and To Values');
        return;
    }
    if (fromValue > toValue) {
        alert('From Value Could Not Be Gretaer Than To Values');
        return;
    }
    if (fromValue % 5 === 0 && toValue % 5 === 0);
    else {
        alert("Please enter valid values for both fields (e.g., multiples of 5 like e.g., 0, 5, 10, 15, ...)");
        return;
    }
  
    var dataPoints = chart.data[0].dataPoints;
    var LastItem = parseInt(dataPoints.slice(-1).pop().x);

    if (fromValue >= LastItem) {
        alert('Incorrect Search');
        return;
    }
    if (toValue > LastItem) {
        alert('The Maximum Limit You Can Search is ' + LastItem);
        return;
    }
    var valuesBetween = [];

    for (var i = 0; i < dataPoints.length; i++) {
        var xValue = dataPoints[i].x;
        if (xValue >= fromValue && xValue <= toValue) {
            valuesBetween.push(dataPoints[i]);
        }
    }
    valuesBetween.unshift({ x: "Time Interval", y: "Value" });
    var ws = XLSX.utils.json_to_sheet(valuesBetween, { skipHeader: true, dateNF: 'YYYYMMDD HH:mm:ss' });
    if (!ws['!cols']) ws['!cols'] = [];
    ws['!cols'][0] = { wch: 17 };
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "CR");
    XLSX.writeFile(wb, "Chart-Report" + ".xlsx");
    return;
}