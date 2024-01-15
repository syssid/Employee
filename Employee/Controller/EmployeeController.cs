using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Web.Http;
using Employee.SQLConnection;

namespace Employee.Controller
{
    public class EmployeeController : ApiController
    {
        [HttpGet]
        [Route("api/employee")]
        public HttpResponseMessage AllEmployee()
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
            if (dt.Rows.Count > 0)
                return Request.CreateResponse(HttpStatusCode.OK, dt, new JsonMediaTypeFormatter());
            else
                return Request.CreateResponse(HttpStatusCode.OK, "NO DATA FOUND");
        }
    }
}