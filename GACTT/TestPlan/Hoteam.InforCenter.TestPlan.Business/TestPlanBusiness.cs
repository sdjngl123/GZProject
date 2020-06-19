#region 
using Hoteam.InforCenter.Common.DataService;
using Hoteam.InforCenter.Common.DataService.ListView.Parameter;
using Hoteam.InforCenter.Common.DataService.TreeView.Parameter;
using Hoteam.InforCenter.Common.ObjectFactory;
using Hoteam.InforCenter.Common.Query.ObjectQuerys;
using Hoteam.InforCenter.Persistence.Interface.Interface;
using Hoteam.InforCenter.Service.Interface.Config;
using Hoteam.InforCenter.Service.Interface.Control;
using Hoteam.InforCenter.Service.Interface.Parameter;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
#endregion

namespace Hoteam.GACTT.TestPlan.Business
{

    public class TestPlanBusiness
    {
        public TreeRootData GetTestTaskPlanTreeNode(SessionPara para, SQLTransaction trans)
        {
            TreeRootData rootData = new TreeRootData();
            var rootTxt = Dictionarys.Instance.GetText("TestPlan", "AllProject", para.Lang);
            var rootNodeId = "ALLPROJECT_" + para.CompanyID.Split('_')[1];
            rootData.RootData = new List<TreeNodeObject>();
            var rootNode = ServiceUtility.GetTreeNodeObject(rootTxt, rootNodeId, "", "ALLPROJECT", "-1", "", "ALLPROJECT", true);
            rootNode.Children = new List<TreeNodeObject>();
            ObjectQuery query = new ObjectQuery("PMSPROJECT");
            query.FilterString = " STATEID <> 'Finished' ";
            var queryResult = query.ExecObjectQuery(para, trans);
            foreach (var tempProject in queryResult)
            {
                var tempName = tempProject.GetObjectDBValue(ObjectInfoConst.EntityName).ToString();
                var tempNodeType = tempProject.ObjType.Name;
                var tempImg = ServiceUtility.ToWebIconPath(tempProject.ObjType.IconPath);
                var tempNode = ServiceUtility.GetTreeNodeObject(tempName, tempProject.ObjectID, "", tempNodeType, "1", tempImg, tempNodeType, true);
                tempNode.ContentPermission = true;
                rootNode.Children.Add(tempNode);
            }
            rootData.RootData.Add(rootNode);
            rootNode.ContentPermission = true;
            return rootData;
        }

        public TreeChildData GetTestTaskPlanChildTreeNode(TreeViewPara para, SQLTransaction trans)
        {
            TreeChildData childData = new TreeChildData();
            childData.ExpandPermission = true;
            childData.ChildData = new List<TreeNodeObject>();
            var nodeType = ObjectFactoryUtility.TypeFromID(para.Value1);
            if (nodeType == "PMSPROJECT")
            {
                ObjectQuery query = new ObjectQuery("PROJECTSTAGE");
                query.FilterString = " PROJECTID ='" + para.Value1 + "' ";
                var stageList = query.ExecObjectQuery(para, trans);
                foreach (var stage in stageList)
                {
                    var tempName = stage.GetObjectDBValue(ObjectInfoConst.EntityName).ToString();
                    var tempNodeType = stage.ObjType.Name;
                    var tempImg = ServiceUtility.ToWebIconPath(stage.ObjType.IconPath);
                    var tempNode = ServiceUtility.GetTreeNodeObject(tempName, stage.ObjectID, "", tempNodeType, "1", tempImg, tempNodeType, true);
                    tempNode.ContentPermission = true;
                    childData.ChildData.Add(tempNode);
                }
            }
            else if (nodeType == "PROJECTSTAGE")
            {
                var stageObj = ObjectFactoryUtility.CreateInstance(para, trans, para.Value1, false);
                if (stageObj != null)
                {
                    var projectId = stageObj.GetObjectDBValue("PROJECTID").ToString();
                    ObjectQuery query = new ObjectQuery("TESTPLANTASK");
                    query.FilterString = " PROJECT ='" + projectId + "'  AND STAGE='" + para.Value1 + "' ";
                    var testPlanTaskList = query.ExecObjectQuery(para, trans);
                    foreach (var planTask in testPlanTaskList)
                    {
                        var tempName = planTask.GetObjectDBValue(ObjectInfoConst.EntityName).ToString();
                        var tempNodeType = planTask.ObjType.Name;
                        var tempImg = ServiceUtility.ToWebIconPath(planTask.ObjType.IconPath);
                        var tempNode = ServiceUtility.GetTreeNodeObject(tempName, planTask.ObjectID, "", tempNodeType, "1", tempImg, tempNodeType, true);
                        tempNode.ContentPermission = true;
                        childData.ChildData.Add(tempNode);
                    }
                }
            }
            else
            {
                //如果当前用户有权限，则加载下级节点
            }

            return childData;
        }
    }
}