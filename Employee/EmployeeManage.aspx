<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="EmployeeManage.aspx.cs" Inherits="Employee.EmployeeManage" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Manage Employee</title>
      <link rel="icon" type="image/png" href="Image/w-brand.png"/>
    <script src="Scripts/CDN/jQ.js"></script>
    <link href="Scripts/CDN/Bootstrap.css" rel="stylesheet" />
    <script src="Scripts/CDN/Bootstrap.js"></script>
    <script src="Scripts/EmployeeManage.js?V=<%=DateTime.Now%>"></script>
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

        .gradient-custom-4 {
            background: #84fab0;
            background: -webkit-linear-gradient(to right, rgba(132, 250, 176, 1), rgba(143, 211, 244, 1));
            background: linear-gradient(to right, rgba(132, 250, 176, 1), rgba(143, 211, 244, 1))
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
        <br />
        <div class="form-control">
            <table id="Bdt" style="display: none" class="table table-light table-striped">
                <thead class="table table-dark">
                    <tr style="font-family: monospace">
                        <th scope="col">#</th>
                        <th scope="col">Action</th>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">DOB</th>
                        <th scope="col">Age</th>
                        <th scope="col">Gender</th>
                        <th scope="col">Contact</th>
                        <th scope="col">E-Mail</th>
                        <th scope="col">Degree</th>
                        <th scope="col">Year</th>
                        <th scope="col">%</th>
                        <th scope="col" id="phtop">Photo</th>
                    </tr>
                </thead>
                <tbody style="font-family: Arial, Helvetica, sans-serif">
                </tbody>
            </table>
            <p class="text-center text-muted mt-5 mb-0" id="UpdateDiv">
                To Update Employee Details <a href="#" onclick="window.open('EmployeeManage.aspx?Flag=Update', '_blank')"
                    class="fw-bold text-body"><u>Click here</u></a> 
            </p>
                <div class="d-flex justify-content-center">
            <button type="button"
                class="btn btn-success btn-block btn-lg gradient-custom-4 text-body" style="display:none" id="btnEdit" onclick="Edit();">
                Update</button>
        </div>
        </div>
    </form>
</body>
</html>
