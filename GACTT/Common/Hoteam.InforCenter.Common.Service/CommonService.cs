#region
using Hoteam.GACTT.Common.Business;
using Hoteam.GACTT.Common.Parameter;
using Hoteam.InforCenter.Persistence.Interface.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
#endregion

namespace Hoteam.GACTT.Common.Service
{
    public class CommonService : ICommonService
    {
        public bool SetObjectValueByFiledName(CommonPara para)
        {
            using (SQLTransaction trans = new SQLTransaction(para))
            {
                CommonBusiness business = new CommonBusiness();
                bool result = business.SetObjectValueByFiledName(para, trans, para.ObjectID, para.FieldName, para.Value);
                if (result)
                {
                    trans.Commit();
                }
                return result;
            }
        }
    }
}
