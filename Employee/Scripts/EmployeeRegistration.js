$(document).ready(function () {

});
function validateFile() {
    const fileInput = document.getElementById('Photo');
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
    const maxFileSizeInMB = 2;
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        if (!allowedExtensions.exec(file.name)) {
            alert('Invalid file type. Please upload a JPG or PNG file.');
            fileInput.value = '';
            return;
        }
        const fileSizeInMB = file.size / (1024 * 1024);
        if (fileSizeInMB > maxFileSizeInMB) {
            alert('File size exceeds the maximum allowed limit of 2 MB.');
            fileInput.value = '';
            return;
        }
    }

    var photoInput = document.getElementById('Photo');
    var frames = document.getElementById('frames');

    if (photoInput.files.length > 0) {
        var selectedFile = photoInput.files[0];

        if (selectedFile.type.startsWith('image/')) {
            var reader = new FileReader();
            reader.onload = function (e) {
                frames.src = e.target.result;
            };
            reader.readAsDataURL(selectedFile);
        } else {
            alert('Please select a valid image file (JPG or PNG).');
            photoInput.value = '';
        }
    } else {
        frames.src = '';
    }
}

function validateInput() {
    const inputElement = document.getElementById('FName');
    const inputValue = inputElement.value;

    const validInput = /^[a-zA-Z]*$/.test(inputValue);

    if (!validInput) {
        alert('Number and Special Symbol Not Allod For Name');
        inputElement.value = inputValue.replace(/[^a-zA-Z]/g, '');
    }

    const inputElementMiddle = document.getElementById('MName');
    const inputValueMddle = inputElementMiddle.value;

    const validInputMiddle = /^[a-zA-Z]*$/.test(inputValueMddle);

    if (!validInputMiddle) {
        alert('Number and Special Symbol Not Allod For Name');
        inputElementMiddle.value = inputValue.replace(/[^a-zA-Z]/g, '');
    }
    const inputElementLast = document.getElementById('LName');
    const inputValueLast = inputElementLast.value;

    const validInputLast = /^[a-zA-Z]*$/.test(inputValueLast);

    if (!validInputLast) {
        alert('Number and Special Symbol Not Allod For Name');
        inputElementLast.value = inputValueLast.replace(/[^a-zA-Z]/g, '');
    }
}
function validateDate() {
    const dobInput = document.getElementById('DOB');
    const selectedDate = new Date(dobInput.value);
    const currentDate = new Date();
    const minAge = 18;

    if (selectedDate > currentDate) {
        alert('Please select a date not in the future.');
        dobInput.value = '';
        return;
    }

    const age = currentDate.getFullYear() - selectedDate.getFullYear();

    if (age < minAge) {
        alert('You must be at least 18 years old.');
        dobInput.value = '';
    }

    const ageInput = document.getElementById('Age');
    if (currentDate.getMonth() < selectedDate.getMonth() ||
        (currentDate.getMonth() === selectedDate.getMonth() && currentDate.getDate() < selectedDate.getDate())) {
        ageInput.value = age - 1;
    } else {
        ageInput.value = age;
    }
}
function Save() {
    debugger;
    var FirstName = $('#FName').val();
    var MiddleName = $('#MName').val();
    var LastName = $('#LName').val();
    var DOB = $('#DOB').val();
    var Age = $('#Age').val();
    var Gender = $('#Gender').val();
    var Phn = $('#Phn').val();
    var email = $('#email').val();
    var Degree = $('#Degree').val();
    var PassOut = $('#PassOut').val();
    var Percentage = $('#Percentage').val();
    var Degree2 = $('#Degree2').val();
    var PassOut2 = $('#PassOut2').val();
    var Percentage2 = $('#Percentage2').val();
    if (FirstName == '') {
        alert('First Name Couldnot Be Blank');
        return;
    }
    if (DOB == '') {
        alert('Date Of Birth Couldnot Be Blank');
        return;
    }
    if (Gender == '0') {
        alert('Please Select Your Gender');
        return;
    }
    if (Phn == '') {
        alert('Contact Number Couldnot Be Blank');
        return;
    }
    if (Phn.length < 10) {
        alert('Please Enter 10 Digit Number');
        return;
    }
    if (validateEmail(email));
   else {
        alert("Email is invalid");
        return;
    }
    var FullName = FirstName + ' ' + MiddleName + ' ' + LastName;
    debugger;
    var formData = new FormData();
    var file_path = $('#Photo').get(0);
    var file = file_path.files;

    if (file.length > 0) {
        formData.append(file[0].name, file[0]);
    }
    UploadedPhoto = '';

    $.ajax({
        async: false,
        cache: false,
        type: "POST",
        url: "Handler/EmployeePhoto.ashx?v=0.1.0",
        contentType: false,
        processData: false,
        data: formData,
        success: function (rtns) {
            UploadedPhoto = rtns;
        },
        error: function (err) {
            alert(err.statusText);
        }
    });

    $.ajax({
        type: "POST",
        url: "WebMethod/WebEmployee.aspx/InsertData",
        data: JSON.stringify({ "FullName": FullName, "DOB": DOB, "Age": Age, "Gender": Gender, "Phn": Phn, "email": email, "Degree": Degree, "PassOut": PassOut, "Percentage": Percentage, "Degree2": Degree2, "PassOut2": PassOut2, "Percentage2": Percentage2, "Photo": UploadedPhoto  }),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (response) {
            var mydata = JSON.parse(response.d);
            if (mydata.length > 0) {
                alert("Dear [ " + mydata[0].Name + " ] You Have Been Successfully Registred With Us");
                location.reload();
            }       
        },
        error: function (x, e) {
            alert(e);
        }
    });
}
function addRow() {
    $('#EductionRow').show();
}
function deleteRow() {
    $('#EductionRow').hide();
    $('#Degree2').val('');
    $('#PassOut2').val('');
    $('#Percentage2').val('');
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

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}