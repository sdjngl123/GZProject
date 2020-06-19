#region 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;
using System.ServiceModel;
using Hoteam.InforCenter.Common.DataService.ListView.Parameter;
using Hoteam.InforCenter.Service.Interface.Parameter;
#endregion

namespace Hoteam.InforCenter.GACProject.Service
{
    [ServiceContract]
    public interface IGACProjectService
    {
        [OperationContract]
        TreeRootData GetPMSProjectTreeNode(SessionPara para);
    }
}
