#region
using Hoteam.InforCenter.Common.DataService.ListView.Parameter;
using Hoteam.InforCenter.GACProject.Business;
using Hoteam.InforCenter.Service.Interface.Parameter;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
#endregion

namespace  Hoteam.InforCenter.GACProject.Service
{
    public class GACProjectService : IGACProjectService
    {
        public TreeRootData GetPMSProjectTreeNode(SessionPara para)
        {
            GACProjectBusiness business = new GACProjectBusiness();
            return business.GetPMSProjectTreeNode(para);
        }
    }
}
