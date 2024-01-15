<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="NewRegisteration.aspx.cs" Inherits="Employee.NewRegisteration" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Welcome | Add New</title>
      <link rel="icon" type="image/png" href="Image/w-brand.png"/>
    <script src="Scripts/CDN/jQ.js"></script>
    <link href="Scripts/CDN/Bootstrap.css" rel="stylesheet" />
    <script src="Scripts/CDN/Bootstrap.js"></script>
    <script src="Scripts/EmployeeRegistration.js?V=<%=DateTime.Now%>"></script>
    <style>
        .gradient-custom-3 {
            background: #84fab0;
            background: -webkit-linear-gradient(to right, rgba(132, 250, 176, 0.5), rgba(143, 211, 244, 0.5));
            background: linear-gradient(to right, rgba(132, 250, 176, 0.5), rgba(143, 211, 244, 0.5))
        }

        .gradient-custom-4 {
            background: #84fab0;
            background: -webkit-linear-gradient(to right, rgba(132, 250, 176, 1), rgba(143, 211, 244, 1));
            background: linear-gradient(to right, rgba(132, 250, 176, 1), rgba(143, 211, 244, 1))
        }

        span.required {
            color: red;
            font-size: 15px;
            margin-left: 5px;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <section>
            <div class="mask d-flex align-items-center h-100 gradient-custom-3">
                <div class="container h-100">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col-12 col-md-9 col-lg-7 col-xl-6">
                            <div class="card" style="border-radius: 15px;">
                                <div class="card-body p-5">
                                    <h2 class="text-uppercase text-center mb-5">Add New Employee</h2>
                                    <div class="form-outline mb-4">
                                        <input type="text" id="FName" class="form-control form-control-lg" oninput="validateInput()" />
                                        <label class="form-label">First Name <span class="required Name">*</span></label>
                                    </div>
                                    <div class="form-outline mb-4">
                                        <input type="text" id="MName" class="form-control form-control-lg Name" oninput="validateInput()" />
                                        <label class="form-label">Middle Name</label>
                                    </div>
                                    <div class="form-outline mb-4">
                                        <input type="text" id="LName" class="form-control form-control-lg Name" oninput="validateInput()" />
                                        <label class="form-label">Last Name</label>
                                    </div>
                                    <div class="form-outline mb-4">
                                        <input type="date" id="DOB" class="form-control form-control-lg" onchange="validateDate()" />
                                        <label class="form-label">Date Of Birth <span class="required">*</span></label>
                                    </div>
                                    <div class="form-outline mb-4">
                                        <input type="text" id="Age" disabled="disabled" class="form-control form-control-lg" />
                                        <label class="form-label">Age</label>
                                    </div>
                                    <div class="form-outline mb-4">
                                        <select id="Gender" class="form-control form-control-lg">
                                            <option value="0">Please Select</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                        <label class="form-label">Gender  <span class="required">*</span></label>
                                    </div>
                                    <div class="form-outline mb-4">
                                        <input type="text" id="Phn" maxlength="10" class="form-control form-control-lg" onkeypress="RestrictInputForNumbers(event)" />
                                        <label class="form-label">Contact Number <span class="required">*</span></label>
                                    </div>
                                    <div class="form-outline mb-4">
                                        <input type="email" required="required" id="email" class="form-control form-control-lg" />
                                        <label class="form-label">Email Address</label>
                                    </div>
                                    <input type="button" value="Add Row" onclick="addRow('dataTable')" class="btn btn-success" />
                                    <input type="button" value="Delete Row" onclick="deleteRow('dataTable')" class="btn btn-danger" />
                                    <table>
                                        <tr>
                                            <th>Degree</th>
                                            <th>Year</th>
                                            <th>Percent</th>
                                        </tr>
                                        <tbody id="dataTable" width="350px" border="1">
                                            <tr>
                                                <td>
                                                    <input type="text" id="Degree" placeholder="Degree" class="form-control" /></td>
                                                <td>
                                                    <input type="text" id="PassOut" placeholder="Year" maxlength="4" class="form-control" /></td>
                                                <td>
                                                    <input type="text" id="Percentage" placeholder="Percent" maxlength="2" class="form-control" /></td>
                                            </tr>
                                            <tr id="EductionRow" style="display: none">
                                                <td>
                                                    <input type="text" id="Degree2" placeholder="Degree" class="form-control" /></td>
                                                <td>
                                                    <input type="text" id="PassOut2" placeholder="Year" maxlength="4" class="form-control" /></td>
                                                <td>
                                                    <input type="text" id="Percentage2" placeholder="Percent" maxlength="2" class="form-control" /></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <iframe id="frames" height="100" width="100"></iframe>
                                    <div class="form-outline mb-4">
                                        <input type="file" id="Photo" class="form-control form-control-lg" onchange="validateFile()" accept=".jpg, .jpeg, .png" />
                                        <label class="form-label">Employee Photo (Only JPG or PNG Maximum 2 MB)</label>
                                    </div>
                                    <div class="d-flex justify-content-center">
                                        <button type="button"
                                            class="btn btn-success btn-block btn-lg gradient-custom-4 text-body" onclick="Save();">
                                            Register</button>
                                    </div>
                                    <br />
                                    <div class="d-flex justify-content-center">
                                        <button type="button"
                                            class="btn btn-danger btn-block btn-lg gradient-custom-4 text-body" onclick="window.open('EmployeeManage.aspx?Flag=Report', '_blank')">
                                            Manage</button>&nbsp;
                                        <button type="button"
                                            class="btn btn-warning btn-block btn-lg gradient-custom-4 text-body" onclick="window.open('dashboard.aspx', '_blank')">
                                            Graph</button>&nbsp;
                                      <button type="button" class="btn btn-warning btn-block btn-lg gradient-custom-4 text-body" onclick="window.location.href = 'api/employee'">
                                          API Workshop
                                      </button>&nbsp;
                                      
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </form>
</body>
</html>
