using Hoteam.InforCenter.Service.Interface.Datetime;
using HoteamsoftFileService;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;

namespace Hoteam.GACTT.Commom.FileHandler
{
    public class TransmitFileHandler : IHttpHandler
    {
        public bool IsReusable
        {
            get
            {
                return true;
            }
        }
        public string Ip { get; set; }
        public string Port { get; set; }
        public string Vault { get; set; }
        public string FileName { get; set; }
        public string Path { get; set; }
        public string UploadFileName { get; set; }
        public string Runtime { get; set; }

        private static string ExTendsJson = "";

        private static Dictionary<string, string> ExDic;

        public void ProcessRequest(HttpContext context)
        {
            context.Request.ContentEncoding = Encoding.UTF8;
            Vault = context.Request["volumn"];
            Ip = context.Request["ip"];
            Port = context.Request["port"];
            FileName = HttpUtility.UrlDecode(context.Request["name"], Encoding.UTF8);
            Path = context.Request["path"];
            UploadFileName = HttpUtility.UrlDecode(context.Request.Cookies["UploadFileName"].Value);
            UploadFile(context);
        }

        private void UploadFile(HttpContext context)
        {
            string s_rpath = FileHelper.GetUploadPath();
            string Datedir = DateTime.Now.ToString("yy-MM-dd");
            string updir = s_rpath + "\\TransmitFile\\" + Datedir;
            string extname = string.Empty;
            string fullname = string.Empty;
            string filename = string.Empty;
            if (context.Request.Files.Count > 0)
            {
                try
                {
                    for (int j = 0; j < context.Request.Files.Count; j++)
                    {
                        HttpPostedFile uploadFile = context.Request.Files[j];
                        int offset = Convert.ToInt32(context.Request["chunk"]);
                        int total = Convert.ToInt32(context.Request["chunks"]);
                        string name = context.Request["name"];
                        //文件没有分块
                        if (total == 1 || total == 0)
                        {
                            if (uploadFile.ContentLength > 0)
                            {
                                if (!System.IO.Directory.Exists(updir))
                                {
                                    System.IO.Directory.CreateDirectory(updir);
                                }
                                extname = System.IO.Path.GetExtension(uploadFile.FileName);
                                filename = System.IO.Path.GetFileName(uploadFile.FileName);
                                string filePath = string.Format("{0}\\{1}", updir, filename);
                                uploadFile.SaveAs(filePath);
                                ProcessFile(filePath, uploadFile.FileName);
                            }
                        }
                        else
                        {

                            //文件 分成多块上传
                            fullname = WriteTempFile(uploadFile, offset);
                            if (total - offset == 1)
                            {
                                //如果是最后一个分块文件 ，则把文件从临时文件夹中移到上传文件 夹中
                                System.IO.FileInfo fi = new System.IO.FileInfo(fullname);
                                string oldFullName = string.Format("{0}\\{1}", updir, UploadFileName ?? uploadFile.FileName);
                                System.IO.FileInfo oldFi = new System.IO.FileInfo(oldFullName);
                                if (oldFi.Exists)
                                {
                                    //文件名存在则删除旧文件 
                                    oldFi.Delete();
                                }
                                if (!Directory.Exists(updir))
                                {
                                    Directory.CreateDirectory(updir);
                                }
                                fi.MoveTo(oldFullName);
                                ProcessFile(oldFullName, uploadFile.FileName);
                            }
                        }
                    }
                }
                catch (Exception ex)
                {
                    JObject JResult = new JObject();
                    JResult.Add("State", "F");
                    JResult.Add("Msg", ex.Message);
                    JResult.Add("Stack", ex.StackTrace);
                    JResult.Add("TimeSpan", DatetimeUtil.GetInternalTicksByDateTime(DateTime.Now));
                    string json = JsonConvert.SerializeObject(JResult, new JsonSerializerSettings() { StringEscapeHandling = StringEscapeHandling.EscapeNonAscii });
                    HttpCookie hc = new HttpCookie("TFHResult", json);
                    hc.Expires = DateTime.Now.AddMinutes(10);
                    context.Response.AppendCookie(hc);
                    File.AppendAllText("c:\\inforcenterdata\\TransmitFileHandler.log", Environment.NewLine + DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + Environment.NewLine + ex.Message + ex.StackTrace);
                    context.Response.StatusCode = 500;
                    context.Response.ContentEncoding = Encoding.UTF8;
                    context.Response.Write(json);
                }
            }
        }
        private string WriteTempFile(HttpPostedFile uploadFile, int chunk)
        {
            string tempDir = FileHelper.GetTempPath();
            if (!System.IO.Directory.Exists(tempDir))
            {
                System.IO.Directory.CreateDirectory(tempDir);
            }
            string fullName = string.Format("{0}\\{1}.part", tempDir, UploadFileName ?? uploadFile.FileName);
            if (chunk == 0)
            {
                //如果是第一个分块，则直接保存
                uploadFile.SaveAs(fullName);
            }
            else
            {
                //如果是其他分块文件 ，则原来的分块文件，读取流，然后文件最后写入相应的字节
                System.IO.FileStream fs = new System.IO.FileStream(fullName, System.IO.FileMode.Append);
                if (uploadFile.ContentLength > 0)
                {
                    int FileLen = uploadFile.ContentLength;
                    byte[] input = new byte[FileLen];
                    // Initialize the stream.
                    System.IO.Stream MyStream = uploadFile.InputStream;
                    // Read the file into the byte array.
                    MyStream.Read(input, 0, FileLen);
                    fs.Write(input, 0, FileLen);
                    fs.Close();
                }
            }
            return fullName;
        }


        private void ProcessFile(string srcFilePath, string localName)
        {
            FileManager file = new FileManager(Ip, Port, Vault);
            var destPath = Path + "/" + FileName;
            file.Upload(srcFilePath, destPath);
            File.Delete(srcFilePath);
        }
        public class ObjectData
        {
            public System.Net.Sockets.Socket socket { get; set; }
            public System.IO.FileInfo fileInfo { get; set; }
        }
        /// <summary>
        ///FileHelper 的摘要说明
        /// </summary>
        public class FileHelper
        {
            /// <summary>
            /// 获取上传目录
            /// </summary>
            /// <returns></returns>
            public static string GetUploadPath()
            {
                string path = HttpContext.Current.Server.MapPath("~/");
                string uploadDir = path;
                CreateDir(uploadDir);
                return uploadDir;
            }
            /// <summary>
            /// 获取临时目录
            /// </summary>
            /// <returns></returns>
            public static string GetTempPath()
            {
                string path = HttpContext.Current.Server.MapPath("~/");
                string uploadDir = path;
                CreateDir(uploadDir);
                return uploadDir;
            }
            //private static string GetDirName()
            //{
            //    return ConfigurationManager.AppSettings["uploaddir"];
            //}
            //private static string GetTempDirName()
            //{
            //    return ConfigurationManager.AppSettings["tempdir"];
            //}
            public static void CreateDir(string path)
            {
                if (!System.IO.Directory.Exists(path))
                {
                    System.IO.Directory.CreateDirectory(path);
                }
            }

        }
    }
}
