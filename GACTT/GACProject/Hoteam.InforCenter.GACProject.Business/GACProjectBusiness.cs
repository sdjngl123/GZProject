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

namespace Hoteam.InforCenter.GACProject.Business
{

    public class GACProjectBusiness
    {
        public TreeRootData GetPMSProjectTreeNode(SessionPara para)
        {
            TreeRootData rootData = new TreeRootData();
            var context = Dictionarys.Instance.GetContext("PMSProject");
            var rootTxt = context.GetText("MyProject", para.Lang);
            var responseProjectTxt = context.GetText("ResponseProject", para.Lang);
            var ParticProjectTxt = context.GetText("ParticipateProject", para.Lang);
            var endProjectTxt = context.GetText("CompleteProject", para.Lang);
            string rootNodeType = "MYPROJECT";
            string rNodeType = "RPROJECT";
            string pNodeType = "PPROJECT";
            string cNodeType = "CPROJECT";
            rootData.RootData = new List<Service.Interface.Control.TreeNodeObject>();
            var rootNode = ServiceUtility.GetTreeNodeObject(rootTxt, rootNodeType, "", rootNodeType, "-1", "", rootNodeType, true);
            rootNode.Children = new List<Service.Interface.Control.TreeNodeObject>();
            rootNode.Children.Add(ServiceUtility.GetTreeNodeObject(responseProjectTxt, rNodeType, "", rNodeType, "1", "", rNodeType, false));
            rootNode.Children.Add(ServiceUtility.GetTreeNodeObject(ParticProjectTxt, pNodeType, "", pNodeType, "2", "", pNodeType, false));
            rootNode.Children.Add(ServiceUtility.GetTreeNodeObject(endProjectTxt, cNodeType, "", cNodeType, "3", "", cNodeType, false));
            rootData.RootData.Add(rootNode);
            return rootData;
        }
    }
}