using System;
using System.IO;
using System.Net;
using System.Text;

namespace Hoteam.GACTT.Common.Business
{
	public class RestClient
	{
		public string HttpPost(string Url, string postDataStr)
		{
			HttpWebRequest httpWebRequest = (HttpWebRequest)WebRequest.Create(Url);
			httpWebRequest.Method = "POST";
			httpWebRequest.ContentType = "application/x-www-form-urlencoded";
			httpWebRequest.UserAgent = "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 2.0.50727; .NET CLR  3.0.04506.648; .NET CLR 3.5.21022; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729)";
			httpWebRequest.Headers.Add("user", "admin");
			httpWebRequest.Headers.Add("pwd", "123");
			Stream requestStream = httpWebRequest.GetRequestStream();
			StreamWriter streamWriter = new StreamWriter(requestStream, Encoding.GetEncoding("utf-8"));
			streamWriter.Write(postDataStr);
			streamWriter.Close();
			HttpWebResponse httpWebResponse = (HttpWebResponse)httpWebRequest.GetResponse();
			Stream responseStream = httpWebResponse.GetResponseStream();
			StreamReader streamReader = new StreamReader(responseStream, Encoding.GetEncoding("utf-8"));
			string result = streamReader.ReadToEnd();
			streamReader.Close();
			responseStream.Close();
			return result;
		}

		public string HttpGetData(string Url)
		{
			HttpWebRequest httpWebRequest = (HttpWebRequest)WebRequest.Create(Url);
			httpWebRequest.Proxy = null;
			httpWebRequest.KeepAlive = false;
			httpWebRequest.Method = "GET";
			httpWebRequest.ContentType = "application/json; charset =UTF-8";
			httpWebRequest.AutomaticDecompression = DecompressionMethods.GZip;
			HttpWebResponse httpWebResponse = (HttpWebResponse)httpWebRequest.GetResponse();
			Stream responseStream = httpWebResponse.GetResponseStream();
			StreamReader streamReader = new StreamReader(responseStream, Encoding.UTF8);
			string result = streamReader.ReadToEnd();
			streamReader.Close();
			responseStream.Close();
			bool flag = httpWebResponse != null;
			if (flag)
			{
				httpWebResponse.Close();
			}
			bool flag2 = httpWebRequest != null;
			if (flag2)
			{
				httpWebRequest.Abort();
			}
			return result;
		}

		public string HttpGetData(string Url, string Content)
		{
			HttpWebRequest httpWebRequest = (HttpWebRequest)WebRequest.Create(Url);
			httpWebRequest.Proxy = null;
			httpWebRequest.KeepAlive = false;
			httpWebRequest.Method = "GET";
			httpWebRequest.ContentType = "text/html;charset=UTF-8";
			httpWebRequest.AutomaticDecompression = DecompressionMethods.GZip;
			byte[] bytes = Encoding.UTF8.GetBytes(Content);
			httpWebRequest.ContentLength = (long)bytes.Length;
			Stream requestStream = httpWebRequest.GetRequestStream();
			requestStream.Write(bytes, 0, bytes.Length);
			requestStream.Close();
			HttpWebResponse httpWebResponse = (HttpWebResponse)httpWebRequest.GetResponse();
			Stream responseStream = httpWebResponse.GetResponseStream();
			StreamReader streamReader = new StreamReader(responseStream, Encoding.UTF8);
			string result = streamReader.ReadToEnd();
			streamReader.Close();
			responseStream.Close();
			bool flag = httpWebResponse != null;
			if (flag)
			{
				httpWebResponse.Close();
			}
			bool flag2 = httpWebRequest != null;
			if (flag2)
			{
				httpWebRequest.Abort();
			}
			return result;
		}

		public string HttpGet(string Url, string postDataStr)
		{
			HttpWebRequest httpWebRequest = (HttpWebRequest)WebRequest.Create(Url + ((postDataStr == "") ? "" : "?") + postDataStr);
			httpWebRequest.Method = "GET";
			httpWebRequest.ContentType = "text/html;charset=UTF-8";
			HttpWebResponse httpWebResponse = (HttpWebResponse)httpWebRequest.GetResponse();
			Stream responseStream = httpWebResponse.GetResponseStream();
			StreamReader streamReader = new StreamReader(responseStream, Encoding.GetEncoding("utf-8"));
			string result = streamReader.ReadToEnd();
			streamReader.Close();
			responseStream.Close();
			return result;
		}

		public string HttpPostData(string url, string postdata)
		{
			string result = string.Empty;
			byte[] bytes = Encoding.UTF8.GetBytes(postdata);
			HttpWebRequest httpWebRequest = WebRequest.Create(url) as HttpWebRequest;
			Encoding uTF = Encoding.UTF8;
			httpWebRequest.Method = "POST";
			httpWebRequest.Headers.Add("user", "admin");
			httpWebRequest.Headers.Add("pwd", "123");
			httpWebRequest.KeepAlive = false;
			httpWebRequest.AllowAutoRedirect = true;
			httpWebRequest.ContentType = "application/x-www-form-urlencoded";
			httpWebRequest.UserAgent = "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 2.0.50727; .NET CLR  3.0.04506.648; .NET CLR 3.5.21022; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729)";
			httpWebRequest.ContentLength = (long)bytes.Length;
			Stream requestStream = httpWebRequest.GetRequestStream();
			requestStream.Write(bytes, 0, bytes.Length);
			requestStream.Close();
			HttpWebResponse httpWebResponse = httpWebRequest.GetResponse() as HttpWebResponse;
			Stream responseStream = httpWebResponse.GetResponseStream();
			StreamReader streamReader = new StreamReader(responseStream, Encoding.GetEncoding("UTF-8"));
			string text = streamReader.ReadToEnd();
			result = text;
			streamReader.Close();
			return result;
		}

		public string HttpPostJsonData(string url, string postdata)
		{
			string result = string.Empty;
			byte[] bytes = Encoding.UTF8.GetBytes(postdata);
			HttpWebRequest httpWebRequest = WebRequest.Create(url) as HttpWebRequest;
			Encoding uTF = Encoding.UTF8;
			httpWebRequest.Method = "POST";
			httpWebRequest.KeepAlive = false;
			httpWebRequest.AllowAutoRedirect = true;
			httpWebRequest.ContentType = "application/json";
			httpWebRequest.UserAgent = "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 2.0.50727; .NET CLR  3.0.04506.648; .NET CLR 3.5.21022; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729)";
			httpWebRequest.ContentLength = (long)bytes.Length;
			Stream requestStream = httpWebRequest.GetRequestStream();
			requestStream.Write(bytes, 0, bytes.Length);
			requestStream.Close();
			HttpWebResponse httpWebResponse = httpWebRequest.GetResponse() as HttpWebResponse;
			Stream responseStream = httpWebResponse.GetResponseStream();
			StreamReader streamReader = new StreamReader(responseStream, Encoding.GetEncoding("UTF-8"));
			string text = streamReader.ReadToEnd();
			result = text;
			streamReader.Close();
			return result;
		}

        public string PostWebRequest(string postUrl, string paramData)
        {
            string ret = string.Empty;
            try
            {
                if (!postUrl.StartsWith("http://"))
                    return "";

                byte[] byteArray = Encoding.Default.GetBytes(paramData); //转化 /
                HttpWebRequest webReq = (HttpWebRequest)WebRequest.Create(new Uri(postUrl));
                webReq.Method = "POST";
                webReq.ContentType = "application/x-www-form-urlencoded";
                webReq.Credentials = CredentialCache.DefaultCredentials;
                webReq.Timeout = 10000;
                webReq.ContentLength = byteArray.Length;
                Stream newStream = webReq.GetRequestStream();
                newStream.Write(byteArray, 0, byteArray.Length);//写入参数
                newStream.Close();
                HttpWebResponse response = (HttpWebResponse)webReq.GetResponse();
                StreamReader sr = new StreamReader(response.GetResponseStream(), Encoding.UTF8);
                ret = sr.ReadToEnd();
                sr.Close();
                response.Close();
                newStream.Close();
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
            return ret;
        }

		public string getUrl(string url)
		{
			return url.Replace("%", "%25").Replace(" ", "%20").Replace("+", "%2B").Replace("#", "%23");
		}
	}
}
