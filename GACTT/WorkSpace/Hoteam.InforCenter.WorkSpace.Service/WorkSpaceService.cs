#region
using Hoteam.InforCenter.Common.DataService.ListView.Parameter;
using Hoteam.InforCenter.Service.Interface.Parameter;
using Hoteam.InforCenter.WorkSpace.Business;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
#endregion

namespace Hoteam.InforCenter.WorkSpace.Service
{
    public class WorkSpaceService : IWorkSpaceService
    {
        public TreeRootData GetTestTaskTreeNode(SessionPara para)
        {
            WorkSpaceBusiness business = new WorkSpaceBusiness();
            return business.GetTestTaskTreeNode(para);
        }
    }
}
