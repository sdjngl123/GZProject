using Hoteam.InforCenter.Common.ObjectFactory.Factory;
using Hoteam.InforCenter.FileManage.Business;
using Hoteam.InforCenter.Persistence.Interface.Interface;
using Hoteam.InforCenter.Service.Interface.Parameter;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Hoteam.GACTT.Common.ObjectValue
{
    public class PLUploadValue : DefaultObjectValue
    {
        public override string GetDisplayValue(SessionPara session, SQLTransaction trans, string format)
        {
            if (DBValue == null || DBValue == DBNull.Value)
            {
                return "";
            }

            var value = DBValue.ToString();
            try
            {
                List<FileInformation> valueList = (List<FileInformation>)(JsonConvert.DeserializeObject(DBValue.ToString(), typeof(List<FileInformation>)));
                if (valueList != null && valueList.Count > 0)
                {
                    string tempValue = "";
                    foreach (var item in valueList)
                    {
                        tempValue += ";" + item.FileName;
                    }
                    if (string.IsNullOrEmpty(tempValue) == false)
                    {
                        value = tempValue.Substring(1);
                        if (string.IsNullOrEmpty(format) == false)
                        {
                            value = string.Format(format, value);
                        }
                        else if (string.IsNullOrEmpty(CurObjectInfoType.PropertyFormat) == false)
                        {
                            value = string.Format(CurObjectInfoType.PropertyFormat, value);
                        }
                    }
                }
                else
                {
                    value = "";
                }
            }
            catch (Exception ex)
            {

            }
            return value;
        }
    }
}
