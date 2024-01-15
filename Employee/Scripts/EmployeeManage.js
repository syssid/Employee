$(document).ready(function () {
    var Flag = getParameterByName('Flag');
    $(document).ajaxSend(function () {
        $("#overlay").fadeIn(500);
    });
    $.ajax({
        type: 'POST',
        url: 'WebMethod/WebEmployee.aspx/GetReport',
        contentType: 'application/json',
        dataType: 'json',
        success: function (response) {
            mdata = response.d;
            var mydata = JSON.parse(mdata);
            if (mydata.length > 0) {
                $('#Bdt').show();
                $("#Bdt >tbody").empty();
                $.each(mydata, function (index) {
                    var SL = (index + 1);
                    if (Flag == 'Report') {
                        $("#Bdt >tbody").append(
                            '<tr>'
                            + '<td>' + SL + '</td>'
                            + '<td><a href="#" id="DelEmp" onclick="Delete(\'' + this.Employee_ID + '\');"><img src="Image/delete.png" Height="25px" Width="25px" /></td>'
                            + '<td>' + this.Employee_ID + '</td>'
                            + '<td>' + this.Name + '</td>'
                            + '<td>' + this.DOB + '</td>'
                            + '<td>' + this.Age + '</td>'
                            + '<td>' + this.Gender + '</td>'
                            + '<td>' + this.Contact + '</td>'
                            + '<td>' + this.Email + '</td>'
                            + '<td>' + this.Education + '</td>'
                            + '<td>' + this.PassingYear + '</td>'
                            + '<td>' + this.Percentage + '</td>'
                            + '<td><iframe src="Photos/' + this.Photo + '" height="100" width="100" title="Employee Photo"></iframe></td>'
                            + '</tr>');
                    }
                    else if (Flag == 'Update') {
                        var genderSelect = '<select class="Gen">';
                        genderSelect += '<option value="Male"' + (this.Gender === 'Male' ? ' selected' : '') + '>Male</option>';
                        genderSelect += '<option value="Female"' + (this.Gender === 'Female' ? ' selected' : '') + '>Female</option>';
                        genderSelect += '</select>';
                        $('#UpdateDiv').hide();
                        $('#btnEdit').show();
                        $("#Bdt >tbody").append(
                            '<tr>'
                            + '<td>' + SL + '</td>'
                            + '<td><input title="#" placeholder="#" type="checkbox" class="chkrow" value="' + this.Employee_ID + '" onclick="SelectRowsFromMainGrid(this);">'
                            + '<td>' + this.Employee_ID + '</td>'
                            + '<td><input type="text" class="Name" value="' + this.Name + '"></td>'
                            + '<td><input type="date" class="DOB" value="' + this.DOB + '" onchange="validateDate(this)" style="width:110px"></td>'
                            + '<td class="Age">' + this.Age + '</td>'
                            + '<td>' + genderSelect + '</td>'
                            + '<td><input type="text" style ="width:110px" class="phn" maxlength="10" value="' + this.Contact + '"  onkeypress="RestrictInputForNumbers(event);"></td>'
                            + '<td><input type="email" class="Email" value="' + this.Email + '"></td>'
                            + '<td><input type="text" style ="width:80px" class="Education" value="' + this.Education + '"></td>'
                            + '<td><input type="text" style ="width:50px" class="Year" maxlength="4" value="' + this.PassingYear + '"  onkeypress="RestrictInputForNumbers(event);"></td>'
                            + '<td><input type="text" style ="width:40px" class="Percent" maxlength="2" value="' + this.Percentage + '"  onkeypress="RestrictInputForNumbers(event);"></td>'
                            + '<td><iframe src="Photos/' + this.Photo + '" height="100" width="100" title="Employee Photo"></iframe></td>'
                            + '</tr>');

                    }
                });
            } else {
                alert('No Data Found');
            }
        },
        error: function () {
            alert('Error Encountered');
        }
    }).done(function () {
        setTimeout(function () {
            $("#overlay").fadeOut(500);
        }, 1000);
    });
});

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[[]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
function Delete(Emp) {
    var con = confirm("Are You Sure Want To Delete This ?");
    if (con == false) {
        return;
    }
    $(document).ajaxSend(function () {
        $("#overlay").fadeIn(500);
    });
    $.ajax({
        type: 'POST',
        url: 'WebMethod/WebEmployee.aspx/DeleteEmployee',
        data: JSON.stringify({ "Employee": Emp }),
        contentType: 'application/json',
        dataType: 'json',
        success: function (response) {
            if (response != -100) {
                alert("Data Deleted Successfully");
                location.reload();
            }
        },
        error: function () {
            alert('Error Encountered');
        }
    }).done(function () {
        setTimeout(function () {
            $("#overlay").fadeOut(500);
        }, 1000);
    });
}
function Edit() {
    var fromValue = getParameterByName('From');
    var toValue = getParameterByName('To');
    var genderValue = getParameterByName('Gender');
    var IDList = '';
    var NameList = '';
    var DOBList = '';
    var AgeList = '';
    var GenderList = '';
    var PhoneList = '';
    var EmailList = '';
    var EducationList = '';
    var YearList = '';
    var PercentList = '';
    var Count = 0;
    $("#Bdt tbody tr").each(function () {
        const currentRow = $(this);

        if (currentRow.find('.chkrow').is(':checked')) {
            debugger;
            var ID = currentRow.find('.chkrow').val();
            var Name = currentRow.find('.Name').val();
            var DOB = currentRow.find('.DOB').val();
            var Age = currentRow.find('.Age').html();
            var Gen = currentRow.find('.Gen').val();
            var phn = currentRow.find('.phn').val();
            var Email = currentRow.find('.Email').val();
            var Education = currentRow.find('.Education').val();
            var Year = currentRow.find('.Year').val();
            var Percent = currentRow.find('.Percent').val();

            IDList += ',' + ID;
            NameList += ',' + Name;
            DOBList += ',' + DOB;
            AgeList += ',' + Age;
            GenderList += ',' + Gen;
            PhoneList += ',' + phn;
            EmailList += ',' + Email;
            EducationList += ',' + Education;
            YearList += ',' + Year;
            PercentList += ',' + Percent;
            Count++;
        }
    });
    IDList = IDList.slice(1);
    NameList = NameList.slice(1);
    DOBList = DOBList.slice(1);
    AgeList = AgeList.slice(1);
    GenderList = GenderList.slice(1);
    PhoneList = PhoneList.slice(1);
    EmailList = EmailList.slice(1);
    EducationList = EducationList.slice(1);
    YearList = YearList.slice(1);
    PercentList = PercentList.slice(1);

    debugger;
    if (Count == 0) {
        alert('Please Select Atleast One');
        return;
    }
    $(document).ajaxSend(function () {
        $("#overlay").fadeIn(500);
    });
    $.ajax({
        type: 'POST',
        url: 'WebMethod/WebEmployee.aspx/EditEmployee',
        data: JSON.stringify({ "EmployeeID": IDList, "Name": NameList, "DOBList": DOBList, "AgeList": AgeList, "GenderList": GenderList, "Phone": PhoneList, "EmailList": EmailList, "Name": NameList, "Phone": PhoneList, "EducationList": EducationList, "YearList": YearList, "PercentList": PercentList }),
        contentType: 'application/json',
        dataType: 'json',
        success: function (response) {
            if (response != -100) {
                alert("Data Updated Successfully");
                window.location.href = 'EmployeeManage.aspx?From=' + fromValue + '&To=' + toValue + '&Gender=' + genderValue + '&Flag=Report';
            }
        },
        error: function () {
            alert('Error Encountered');
        }
    }).done(function () {
        setTimeout(function () {
            $("#overlay").fadeOut(500);
        }, 1000);
    });
}

function RestrictInputForNumbers(event) {
    var pressedKey = event.which;
    var pressedKeyInteger = parseInt(pressedKey);

    if (pressedKeyInteger >= 48 && pressedKeyInteger <= 57);
    else {
        alert('Only numbers are allowed');
        event.preventDefault();
        return;
    }
}

function validateDate(obj) {
    debugger;
    const dobInput = $(obj).val();
    const selectedDate = new Date(dobInput);
    const currentDate = new Date();
    const minAge = 18;

    if (selectedDate > currentDate) {
        alert('Please select a date not in the future.');
        $(obj).val('');
        return;
    }

    const age = currentDate.getFullYear() - selectedDate.getFullYear();

    if (age < minAge) {
        alert('You must be at least 18 years old.');
        $(obj).val('');
        return;
    }

    if (currentDate.getMonth() < selectedDate.getMonth() ||
        (currentDate.getMonth() === selectedDate.getMonth() && currentDate.getDate() < selectedDate.getDate())) {
        $(obj).parent().parent().find('.Age').html(age);
    } else {
        $(obj).parent().parent().find('.Age').html(age);
    }

}
function SelectRowsFromMainGrid(object) {
    debugger;
    if (object.checked) {
        $(object).parent().parent().attr('style', 'background-color:red !important;');

    }
    else {
        $(object).parent().parent().removeAttr("style");
    }
}