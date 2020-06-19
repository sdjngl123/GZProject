#region 
using Hoteam.InforCenter.Common.ObjectFactory;
using Hoteam.InforCenter.Persistence.Interface.Interface;
using Hoteam.InforCenter.Service.Interface.Parameter;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
#endregion

namespace Hoteam.GACTT.Common.Business
{

    public class CommonBusiness
    {
        /// <summary>
        /// �������ö��������ֵ
        /// </summary>
        /// <param name="para"></param>
        /// <param name="trans"></param>
        /// <param name="objectId">����id����</param>
        /// <param name="fieldName">�������Ƽ���</param>
        /// <param name="value">ֵ</param>
        /// <returns></returns>
        public bool SetObjectValueByFiledName(SessionPara para, SQLTransaction trans, string objectId, string fieldName, string value)
        {
            bool result = false;
            if (!string.IsNullOrEmpty(objectId) && !string.IsNullOrEmpty(fieldName))
            {
                var objList = ObjectFactoryUtility.GetObjListByIdList(para, trans, objectId.Split(';'));
                var fields = fieldName.Split(';');
                var values = value.Split(';');
                if (fields.Length == values.Length)
                {
                    foreach (var curObj in objList)
                    {
                        for (int i = 0; i < fields.Length; i++)
                        {
                            var tempField = fields[i];
                            var tempValue = values[i];
                            curObj.SetObjectDBValue(tempField, tempValue);

                        }
                        curObj.SaveObject(para, trans);
                    }
                    result = true;
                }
            }
            return result;
        }
    }
}