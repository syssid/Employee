using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace Employee.Handler
{
    public class EmployeePhoto : IHttpHandler
    {
        string fileName = "";
        string appendedFileName = "";
        public void ProcessRequest(HttpContext context)
        {
            try
            {
                if (context.Request.Files.Count > 0)
                {
                    HttpFileCollection files = context.Request.Files;
                    for (int i = 0; i < files.Count; i++)
                    {
                        HttpPostedFile file = files[i];
                        string fname, targetFile = "";
                        if (HttpContext.Current.Request.Browser.Browser.ToUpper() == "IE" || HttpContext.Current.Request.Browser.Browser.ToUpper() == "INTERNETEXPLORER")
                        {
                            string[] testfiles = file.FileName.Split(new char[] { '\\' });
                            fname = testfiles[testfiles.Length - 1];
                        }
                        else
                        {
                            fname = file.FileName;
                            string strFlExtn = System.IO.Path.GetExtension(fname);
                            int _min = 0000;
                            int _max = 9999;
                            Random _rdm = new Random();
                            int ran = _rdm.Next(_min, _max);
                            string DFileName = DateTime.Now.ToString("yyyyMMddHHmmssfff") + "AVI" + ran.ToString();
                            string name = System.IO.Path.GetFileNameWithoutExtension(fname);
                            fileName = DFileName + strFlExtn;
                            targetFile = Path.Combine(context.Server.MapPath("~/Photos"), fileName);

                            Stream src = file.InputStream;
                            file.SaveAs(targetFile);

                        }

                        if (i == 0)
                            appendedFileName = fileName;
                        else
                            appendedFileName += "," + fileName;
                    }
                }

                context.Response.ContentType = "text/plain";
                context.Response.Write(appendedFileName);
            }
            catch (Exception e)
            {

            }
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}