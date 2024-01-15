<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Dashboard.aspx.cs" Inherits="Employee.Dashboard" %>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>|</title>
      <link rel="icon" type="image/png" href="Image/w-brand.png"/>
    <script src="Scripts/CDN/jQ.js"></script>
    <script src="Scripts/Dashboard.js?V=<%=DateTime.Now%>"></script>
    <link href="Scripts/CDN/Bootstrap.css" rel="stylesheet" />
    <script src="Scripts/CDN/Bootstrap.js"></script>
    <script src="Scripts/CDN/canvasjs.min.js"></script>
    <script src="Scripts/CDN/xls.js"></script>
    <script src="Scripts/CDN/jspdf.js"></script>
    <style>
        #overlay {
            position: fixed;
            top: 0;
            left: 0;
            z-index: 100;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
        }
        .cv-spinner {
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .spinner {
            width: 40px;
            height: 40px;
            border: 4px #ddd solid;
            border-top: 4px #2e93e6 solid;
            border-radius: 50%;
            animation: sp-anime 0.8s infinite linear;
        }
        @keyframes sp-anime {
            100% {
                transform: rotate(360deg);
            }
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div id="overlay">
            <div class="cv-spinner">
                <span class="spinner"></span>
            </div>
        </div>
        <div id="HiddenIntervalPDF" style="text-align: start" class="form-control">
            <span>From : </span>
            <input type="number" id="txtfrom" min="0" oninput="this.value =!!this.value && Math.abs(this.value) >= 0 ? Math.abs(this.value) : null"/>
            <span>To : </span>
            <input type="number" id="txtTo" min="0" oninput="this.value =!!this.value && Math.abs(this.value) >= 0 ? Math.abs(this.value) : null"/>
            <input type="button" id="downloadInvervalPDF" onclick="ExportExcel();" class="btn btn-success" style="margin: 10px" value="Download Interval Excel"/>
        </div>
        <div id="HiddenInterval" style="text-align: start" class="form-control">
            <span>From : </span>
            <input type="number" id="zoomFrom" min="0" oninput="this.value =!!this.value && Math.abs(this.value) >= 0 ? Math.abs(this.value) : null"/>
            <span>To : </span>
            <input type="number" id="zoomTo" min="0" oninput="this.value =!!this.value && Math.abs(this.value) >= 0 ? Math.abs(this.value) : null"/>
            <input type="button" id="downloadInvervalData" onclick="PDFExport();" class="btn btn-danger" style="margin: 10px" value="Download Interval PDF"/>
        </div>
        <div id="chartContainer"></div>
        <div id="chartContainer2" style="visibility: hidden"></div>
    </form>
</body>
</html>