#region 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;
using System.ServiceModel;
using Hoteam.InforCenter.Service.Interface.Parameter;
using Hoteam.InforCenter.Common.DataService.ListView.Parameter;
#endregion

namespace Hoteam.InforCenter.WorkSpace.Service
{
    [ServiceContract]
    public interface IWorkSpaceService
    {
        [OperationContract]
        TreeRootData GetTestTaskTreeNode(SessionPara para);

    }
}
