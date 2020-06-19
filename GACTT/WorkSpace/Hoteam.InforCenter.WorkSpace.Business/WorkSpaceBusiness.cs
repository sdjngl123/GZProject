#region 
using Hoteam.InforCenter.Common.DataService;
using Hoteam.InforCenter.Common.DataService.ListView.Parameter;
using Hoteam.InforCenter.Service.Interface.Config;
using Hoteam.InforCenter.Service.Interface.Parameter;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
#endregion

namespace Hoteam.InforCenter.WorkSpace.Business{
	
	public class WorkSpaceBusiness{
        public TreeRootData GetTestTaskTreeNode(SessionPara para)
        {
            TreeRootData rootData = new TreeRootData();
            var context = Dictionarys.Instance.GetContext("WorkSpace");
            var rootTxt = context.GetText("MyTask", para.Lang);
            var responseTaskTxt = context.GetText("ResponseTask", para.Lang);
            var ParticTaskTxt = context.GetText("ParticipateTask", para.Lang);
            var endTaskTxt = context.GetText("CompleteTask", para.Lang);
            string rootNodeType = "MYTASK";
            string rNodeType = "RPTASK";
            string pNodeType = "PPTASK";
            string cNodeType = "CPTASK";
            rootData.RootData = new List<Service.Interface.Control.TreeNodeObject>();
            var rootNode = ServiceUtility.GetTreeNodeObject(rootTxt, rootNodeType, "", rootNodeType, "-1", "", rootNodeType, true);
            rootNode.Children = new List<Service.Interface.Control.TreeNodeObject>();
            rootNode.Children.Add(ServiceUtility.GetTreeNodeObject(responseTaskTxt, rNodeType, "", rNodeType, "1", "", rNodeType, false));
            rootNode.Children.Add(ServiceUtility.GetTreeNodeObject(ParticTaskTxt, pNodeType, "", pNodeType, "2", "", pNodeType, false));
            rootNode.Children.Add(ServiceUtility.GetTreeNodeObject(endTaskTxt, cNodeType, "", cNodeType, "3", "", cNodeType, false));
            rootData.RootData.Add(rootNode);
            return rootData;
        }
    }
}