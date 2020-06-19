#region
using Hoteam.GACTT.TestPlan.Business;
using Hoteam.InforCenter.Common.DataService.ListView.Parameter;
using Hoteam.InforCenter.Common.DataService.TreeView.Parameter;
using Hoteam.InforCenter.Persistence.Interface.Interface;
using Hoteam.InforCenter.Service.Interface.Parameter;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
#endregion

namespace  Hoteam.GACTT.TestPlan.Service
{
    public class TestPlanService : ITestPlanService
    {

        public TreeChildData GetTestTaskPlanChildTreeNode(TreeViewPara para)
        {
            using (SQLTransaction trans = new SQLTransaction(para))
            {
                TestPlanBusiness business = new TestPlanBusiness();
                return business.GetTestTaskPlanChildTreeNode(para, trans);
            }
        }

        public TreeRootData GetTestTaskPlanTreeNode(SessionPara para)
        {
            using (SQLTransaction trans = new SQLTransaction(para))
            {
                TestPlanBusiness business = new TestPlanBusiness();
                return business.GetTestTaskPlanTreeNode(para, trans);
            }
        }
    }
}
