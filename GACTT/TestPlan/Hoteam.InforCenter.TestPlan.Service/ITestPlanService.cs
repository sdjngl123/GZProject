#region 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;
using System.ServiceModel;
using Hoteam.InforCenter.Common.DataService.TreeView.Parameter;
using Hoteam.InforCenter.Service.Interface.Parameter;
using Hoteam.InforCenter.Common.DataService.ListView.Parameter;
#endregion

namespace Hoteam.GACTT.TestPlan.Service
{
    [ServiceContract]
    public interface ITestPlanService
    {
        [OperationContract]
        TreeChildData GetTestTaskPlanChildTreeNode(TreeViewPara para);
        [OperationContract]
         TreeRootData GetTestTaskPlanTreeNode(SessionPara para);

    }
}
