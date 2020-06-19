#region 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;
using System.ServiceModel;
using Hoteam.GACTT.Common.Parameter;
#endregion

namespace Hoteam.GACTT.Common.Service
{
    [ServiceContract]
    public interface ICommonService
    {
        [OperationContract]
        bool SetObjectValueByFiledName(CommonPara para);
    }
}
