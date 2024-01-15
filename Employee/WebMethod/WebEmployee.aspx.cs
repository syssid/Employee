using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;
using Employee.SQLConnection;
using Newtonsoft.Json;

namespace Employee.WebMethod
{
    public partial class WebEmployee : System.Web.UI.Page
    {
        [WebMethod]
        public static string InsertData(string FullName, string DOB, string Age, string Gender, string Phn, string email, string Degree, string PassOut, string Percentage, string Photo)
        {
            DBConnection obj = new DBConnection();
            SqlParameter[] param = new SqlParameter[]
            {
            new SqlParameter("@EmployeeID",""),
            new SqlParameter("@Name",FullName),
            new SqlParameter("@DOB", DOB),
            new SqlParameter("@Age",int.Parse(Age)),
            new SqlParameter("@Gender", Gender),
            new SqlParameter("@Contact", Phn),
            new SqlParameter("@Email", email),
            new SqlParameter("@Education", Degree),
            new SqlParameter("@PassingYear", PassOut),
            new SqlParameter("@Percentage", Percentage),
            new SqlParameter("@Photo", Photo),
            new SqlParameter("@Operation", 1)
            };
            
            DataTable dt = obj.ExecSPReader("EmployeeManage", param);

            return JsonConvert.SerializeObject(dt);
        }

        [WebMethod]
        public static string GetReport()
        {
            DBConnection obj = new DBConnection();
            SqlParameter[] param = new SqlParameter[]
            {
            new SqlParameter("@EmployeeID",""),
            new SqlParameter("@Name",""),
            new SqlParameter("@DOB", ""),
            new SqlParameter("@Age", ""),
            new SqlParameter("@Gender", ""),
            new SqlParameter("@Contact", ""),
            new SqlParameter("@Email", ""),
            new SqlParameter("@Education", ""),
            new SqlParameter("@PassingYear", ""),
            new SqlParameter("@Percentage", ""),
            new SqlParameter("@Photo", ""),
            new SqlParameter("@Operation", 2)
            };

            DataTable dt = obj.ExecSPReader("EmployeeManage", param);

            return JsonConvert.SerializeObject(dt);
        }

        [WebMethod]
        public static int DeleteEmployee(string Employee)
        {
            int a = -100;
            DBConnection obj = new DBConnection();
            SqlParameter[] param = new SqlParameter[]
            {
            new SqlParameter("@EmployeeID",Employee),
            new SqlParameter("@Name",""),
            new SqlParameter("@DOB", ""),
            new SqlParameter("@Age", ""),
            new SqlParameter("@Gender", ""),
            new SqlParameter("@Contact", ""),
            new SqlParameter("@Email", ""),
            new SqlParameter("@Education", ""),
            new SqlParameter("@PassingYear", ""),
            new SqlParameter("@Percentage", ""),
            new SqlParameter("@Photo", ""),
            new SqlParameter("@Operation", 3)
            };

            a = obj.ExecNonQuery("EmployeeManage", param);
            return a;
        }

        [WebMethod]
        public static int EditEmployee(string EmployeeID, string Name, string DOBList, string AgeList, string GenderList, string Phone, string EmailList, string EducationList, string YearList, string PercentList)
        {
            int a = -100;
            string[] EmpArr = EmployeeID.Split(',');
            string[] NameArr = Name.Split(',');
            string[] DOBArr = DOBList.Split(',');
            string[] AgeArr = AgeList.Split(',');
            string[] GenderArr = GenderList.Split(',');
            string[] PhoneArr = Phone.Split(',');
            string[] EmailArr = EmailList.Split(',');
            string[] EduArr = EducationList.Split(',');
            string[] YearArr = YearList.Split(',');
            string[] PercentArr = PercentList.Split(',');


            for (int i = 0; i < EmpArr.Length; i++)
            {
                DBConnection obj = new DBConnection();
                SqlParameter[] param = new SqlParameter[]
                {
                  new SqlParameter("@EmployeeID",EmpArr[i]),
                  new SqlParameter("@Name",NameArr[i]),
                  new SqlParameter("@DOB", DOBArr[i]),
                  new SqlParameter("@Age", AgeArr[i]),
                  new SqlParameter("@Gender", GenderArr[i]),
                  new SqlParameter("@Contact", PhoneArr[i]),
                  new SqlParameter("@Email", EmailArr[i]),
                  new SqlParameter("@Education", EduArr[i]),
                  new SqlParameter("@PassingYear", YearArr[i]),
                  new SqlParameter("@Percentage", PercentArr[i]),
                  new SqlParameter("@Photo", ""),
                  new SqlParameter("@Operation", 4)
                };

                a = obj.ExecNonQuery("EmployeeManage", param);
            }

            return a;
        }
        [WebMethod]
        public static string GetIndicater()
        {
            DBConnection obj = new DBConnection();

            SqlParameter[] param = new SqlParameter[]
            {
                  new SqlParameter("@EmployeeID",""),
                  new SqlParameter("@Name",""),
                  new SqlParameter("@DOB", ""),
                  new SqlParameter("@Age", ""),
                  new SqlParameter("@Gender", ""),
                  new SqlParameter("@Contact", ""),
                  new SqlParameter("@Email", ""),
                  new SqlParameter("@Education", ""),
                  new SqlParameter("@PassingYear", ""),
                  new SqlParameter("@Percentage", ""),
                  new SqlParameter("@Photo", ""),
                  new SqlParameter("@Operation", 5)

        };
            DataTable dt = obj.ExecSPReader("EmployeeManage", param);

            return JsonConvert.SerializeObject(dt);
        }
    }
}