using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Employee.SQLConnection
{
    public class DBConnection
    {

        private readonly string cs = ConfigurationManager.ConnectionStrings["MyCon"].ConnectionString;
        public DataTable ExecSPReader(string sp, SqlParameter[] param = null)
        {
            using (SqlConnection con = new SqlConnection(cs))
            {
                using (SqlCommand cmd = new SqlCommand(sp, con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    if (param != null)
                    {
                        cmd.Parameters.AddRange(param);
                    }
                    con.Open();
                    DataTable dt = new DataTable();
                    using (SqlDataAdapter sda = new SqlDataAdapter(cmd))
                    {
                        sda.Fill(dt);
                    }
                    return dt;
                }
            }
        }
        public int ExecNonQuery(string sp, SqlParameter[] param = null)
        {
            using (SqlConnection con = new SqlConnection(cs))
            {
                using (SqlCommand cmd = new SqlCommand(sp, con))
                {
                    cmd.CommandType = CommandType.StoredProcedure;
                    if (param != null)
                    {
                        cmd.Parameters.AddRange(param);
                    }
                    con.Open();
                    int retval = cmd.ExecuteNonQuery();
                    return retval;
                }
            }
        }
    }
}