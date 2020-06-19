#region 
using Hoteam.InforCenter.Common.DataService;
using Hoteam.InforCenter.Common.DataService.ListView.Parameter;
using Hoteam.InforCenter.Common.DataService.TreeListView.Parameter;
using Hoteam.InforCenter.Common.ObjectFactory;
using Hoteam.InforCenter.Common.ObjectFactory.Config;
using Hoteam.InforCenter.Common.ObjectFactory.Factory;
using Hoteam.InforCenter.Common.Query.ObjectQuerys;
using Hoteam.InforCenter.Common.View;
using Hoteam.InforCenter.Enumeration.Business;
using Hoteam.InforCenter.FileManage.Business;
using Hoteam.InforCenter.Persistence.Interface.Interface;
using Hoteam.InforCenter.Service.Interface.Config;
using Hoteam.InforCenter.Service.Interface.Control;
using Hoteam.InforCenter.Service.Interface.Datetime;
using Hoteam.InforCenter.Service.Interface.Parameter;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text;
#endregion

namespace Hoteam.InforCenter.TestResourceLib.Business
{

    public class TestResourceLibBusiness
    {
        /// <summary>
        /// 上传外部单位附件
        /// </summary>
        /// <param name="para"></param>
        /// <param name="trans"></param>
        /// <param name="objectID"></param>
        /// <param name="content"></param>
        /// <returns></returns>
        public string UploadAttachFileToResource(SessionPara para, SQLTransaction trans, string objectID, string content)
        {
            string retStr = "";
            if (!string.IsNullOrEmpty(objectID) && !string.IsNullOrEmpty(content))
            {
                StringBuilder sb = new StringBuilder();
                var fileDataList = JsonConvert.DeserializeObject<List<FileInformation>>(content);
                foreach (var file in fileDataList)
                {
                    var newObj = ObjectFactoryUtility.CreateInstance(para, trans, "TESTATTACH");
                    newObj.SetObjectDBValue("ENAME", file.FileName);
                    newObj.SetObjectDBValue("PATH", file.Path);
                    newObj.SetObjectDBValue("MASTERID", objectID);
                    newObj.SetObjectDBValue("UPLOADUSER", para.UserID);
                    newObj.SetObjectDBValue("UPLOADTIME", DatetimeUtil.GetInternalTicksByDateTime(DateTime.Now));
                    newObj.SetObjectDBValue("FILEINFO", JsonConvert.SerializeObject(new List<FileInformation>() { file }));
                    newObj.SaveObject(para, trans);
                    sb.Append(";" + newObj.ObjectID);
                }
                if (sb.Length > 0)
                {
                    retStr = sb.ToString().Substring(1);
                }
            }
            return retStr;
        }


        /// <summary>
        /// 获取实验能力树列表标题
        /// </summary>
        /// <param name="para"></param>
        /// <param name="trans"></param>
        /// <param name="objectId"></param>
        /// <returns></returns>
        public EditTreeGridRowTitleData GetTestCapabilityTreeGridRowTitle(SessionPara para)
        {
            EditTreeGridRowTitleData titleData = new EditTreeGridRowTitleData();
            titleData.ColumnData = new EditTreeGridRowTitleObject();
            var viewConfig = Views.Instance.Get("TESTCAPABILITYView");

            foreach (var item in viewConfig.ViewColumnList.Where(d => d.Width > 0 || d.Width == -1 || d.Name == ObjectInfoConst.EntityID))
            {
                var colType = EditTreeGridColType.Text;
                if (item.Name == ObjectInfoConst.EntityID)
                {
                    colType = EditTreeGridColType.Hidden;
                }
                else if (item.Name == ObjectInfoConst.EntityName)
                {
                    colType = EditTreeGridColType.Link;
                }
                titleData.ColumnData.Add(new EditTreeGridColTitleObject()
                {
                    Name = item.Name,
                    ColType = colType,
                    Width = item.Width,
                    Text = viewConfig.GetColHeader(item.Name, para.Lang),
                    Editable = false,
                    Resizable = true
                });
            }
            return titleData;
        }

        /// <summary>
        /// 获取组织下第一层试验能力
        /// </summary>
        /// <param name="para"></param>
        /// <param name="trans"></param>
        /// <param name="orgId">组织id</param>
        /// <returns></returns>
        public List<EditTreeGridRowObject> GetTestCapabilityTreeGridRowData(SessionPara para, SQLTransaction trans, string orgId, string tableName)
        {
            List<EditTreeGridRowObject> rowList = new List<EditTreeGridRowObject>();
            if (string.IsNullOrEmpty(tableName))
            {
                tableName = "TESTCAPABILITY";
            }
            ObjectQuery query = new ObjectQuery(tableName);
            if (!string.IsNullOrEmpty(orgId))
            {
                var tempData = orgId.Split('_');
                if (tempData.Length > 1)
                {
                    //按组织进入
                    query.FilterInfo.Add("ORG", QueryOperator.Equal, orgId);
                    query.FilterInfo.Add(QueryOperator.And);
                }
                else
                {
                    //按类别进入
                    query.FilterInfo.Add("TYPE", QueryOperator.Equal, orgId);
                    query.FilterInfo.Add(QueryOperator.And);
                }
            }
            query.FilterInfo.Add(QueryOperator.Left);
            query.FilterInfo.Add("TESTPROJECT", QueryOperator.IsNull);
            query.FilterInfo.Add(QueryOperator.Or);
            query.FilterInfo.Add("TESTPROJECT", QueryOperator.Equal, "");
            query.FilterInfo.Add(QueryOperator.Right);
            var queryResult = query.ExecObjectQuery(para, trans);
            if (queryResult.Count > 0)
            {
                var viewConfig = Views.Instance.Get(tableName + "View");
                var columns = viewConfig.ViewColumnList.Where(d => d.Width > 0 || d.Width == -1 || d.Name == ObjectInfoConst.EntityID);
                foreach (var item in queryResult)
                {
                    EditTreeGridRowObject tempRow = new EditTreeGridRowObject();
                    foreach (var column in columns)
                    {
                        tempRow.ColDatas.Add(new EditTreeGridColDataObject(column.Name, item.GetObjectDisplayValue(para, trans, column.Name, "")));
                    }
                    tempRow.Children = new List<EditTreeGridRowObject>();
                    tempRow.IsShowExpandIcon = true;
                    rowList.Add(tempRow);
                }
            }

            return rowList;
        }

        /// <summary>
        /// 获取下级能力对象
        /// </summary>
        /// <param name="para"></param>
        /// <param name="trans"></param>
        /// <param name="objectId">组织id</param>
        /// <param name="peid">父级能力id</param>
        /// <returns></returns>
        public TreeListChildData GetTestCapabilityTreeGridChildRowData(SessionPara para, SQLTransaction trans, string objectId, string peid, string tableName)
        {
            TreeListChildData childData = new TreeListChildData();
            childData.ExpandPermission = true;
            if (!string.IsNullOrEmpty(objectId) && !string.IsNullOrEmpty(peid))
            {
                if (string.IsNullOrEmpty(tableName))
                {
                    tableName = "TESTCAPABILITY";
                }
                ObjectQuery query = new ObjectQuery(tableName);
                //再次获取下级时暂时不需要再去判断所属组织
                if (!string.IsNullOrEmpty(objectId))
                {
                    var tempData = objectId.Split('_');
                    if (tempData.Length > 1)
                    {
                        //按组织进入
                        query.FilterInfo.Add("ORG", QueryOperator.Equal, objectId);
                        query.FilterInfo.Add(QueryOperator.And);
                    }
                    else
                    {
                        //按类别进入
                        query.FilterInfo.Add("TYPE", QueryOperator.Equal, objectId);
                        query.FilterInfo.Add(QueryOperator.And);
                    }
                }
                query.FilterInfo.Add("TESTPROJECT", QueryOperator.Equal, peid);
                var queryResult = query.ExecObjectQuery(para, trans);
                if (queryResult.Count > 0)
                {
                    childData.Children = new List<EditTreeGridRowObject>();
                    var viewConfig = Views.Instance.Get(tableName + "View");
                    var columns = viewConfig.ViewColumnList.Where(d => d.Width > 0 || d.Width == -1 || d.Name == ObjectInfoConst.EntityID);
                    foreach (var item in queryResult)
                    {
                        EditTreeGridRowObject tempRow = new EditTreeGridRowObject();
                        foreach (var column in columns)
                        {
                            tempRow.ColDatas.Add(new EditTreeGridColDataObject(column.Name, item.GetObjectDisplayValue(para, trans, column.Name, "")));
                        }
                        tempRow.IsShowExpandIcon = true;
                        childData.Children.Add(tempRow);
                    }
                }
            }
            return childData;
        }

        /// <summary>
        /// 通过关系名称父子级id建立关系
        /// </summary>
        /// <param name="para"></param>
        /// <param name="trans"></param>
        /// <param name="linkTypeName"></param>
        /// <param name="peid"></param>
        /// <param name="ceids"></param>
        /// <returns></returns>
        public bool AddLinkByObjectIdAndLinkTypeName(SessionPara para, SQLTransaction trans, string linkTypeName, string peid, string ceids)
        {
            bool result = false;
            if (!string.IsNullOrEmpty(linkTypeName) && !string.IsNullOrEmpty(peid) && !string.IsNullOrEmpty(ceids))
            {
                var ids = ceids.Split(';');
                var objList = ObjectFactoryUtility.GetObjListByIdList(para, trans, ids);
                foreach (var cid in ceids.Split(';'))
                {
                    ObjectFactoryUtility.AddLink(para, trans, linkTypeName, peid, cid);
                }
                result = true;
            }
            return result;
        }
        /// <summary>
        /// 根据关系id移除关系
        /// </summary>
        /// <param name="para"></param>
        /// <param name="trans"></param>
        /// <param name="linkIds"></param>
        /// <returns></returns>
        public bool RemoveLinkObject(SessionPara para, SQLTransaction trans, string linkIds)
        {
            bool result = false;
            if (!string.IsNullOrEmpty(linkIds))
            {
                var objList = ObjectFactoryUtility.GetObjListByIdList(para, trans, linkIds.Split(';'));
                foreach (var obj in objList)
                {
                    obj.DeleteObject(para, trans);
                }
                result = true;
            }
            return result;
        }

        public TreeRootData GetProjectCapabilityTreeRootNode(SessionPara para, SQLTransaction trans)
        {
            TreeRootData rootData = new TreeRootData();
            rootData.RootData = new List<TreeNodeObject>();
            string rootNodeType = "PROJECTROOT";
            string childNodeType = "RESOURCETYPE";
            var projectNodeText = Dictionarys.Instance.GetText("TestResourceLib", "TestProject", para.Lang);
            var enumData = EnumerationUtility.GetDBEnumerationItem(para, trans, "OutResourceType");
            var rootNode = ServiceUtility.GetTreeNodeObject(projectNodeText, rootNodeType, rootNodeType, rootNodeType, "-1", "", rootNodeType, true);
            rootData.RootData.Add(rootNode);
            if (enumData.Keys.Count > 0)
            {
                rootNode.Children = new List<TreeNodeObject>();
                foreach (var key in enumData.Keys)
                {
                    var childNode = ServiceUtility.GetTreeNodeObject(enumData[key], key, key, childNodeType, "1", "", childNodeType, false);
                    rootNode.Children.Add(childNode);
                }
            }
            return rootData;
        }

        /// <summary>
        /// 保存试验能力，并且创建试验资源、知识的关系
        /// </summary>
        /// <param name="para"></param>
        /// <param name="trans"></param>
        /// <param name="baseData"></param>
        /// <param name="knowledgeId"></param>
        /// <param name="resourceId"></param>
        /// <param name="objectId"></param>
        /// <returns></returns>
        public string SaveCapabilityData(SessionPara para, SQLTransaction trans, string baseData, string knowledgeId, string resourceId, string objectId)
        {
            string ret = "";
            if (!string.IsNullOrEmpty(baseData))
            {
                BaseObject abilityObj = null;
                BaseObject projectObj = null;
                if (!string.IsNullOrEmpty(objectId))
                {
                    abilityObj = ObjectFactoryUtility.CreateInstance(para, trans, objectId, false);
                    ObjectFactoryUtility.DeleteObjByTypeAndFilter(para, trans, "TESTABILITIYTORESOUCE", " AND PEID ='" + objectId + "'");
                    ObjectFactoryUtility.DeleteObjByTypeAndFilter(para, trans, "TESTABILITYTOKNOWLEDGE", " AND PEID ='" + objectId + "'");
                }
                else
                {
                    abilityObj = ObjectFactoryUtility.CreateInstance(para, trans, "TESTCAPABILITY");
                }
                abilityObj.FromJsonString(para, baseData);
                var objName = abilityObj.GetObjectDBValue("ENAME").ToString();
                if (!string.IsNullOrEmpty(objName))
                {
                    //根据前端传过来的项目数据判断是id还是名称，如果是名称则编辑是否已经存在相同名称的项目，否则新建项目
                    var objTypeName = ObjectFactoryUtility.TypeFromID(objName);
                    if (DataModels.Instance.GetEntityType(objTypeName) == null)
                    {
                        ObjectQuery query = new ObjectQuery("TESTPROJECT");
                        var projectList = query.ExecObjectQuery(para, trans);
                        projectObj = projectList.FirstOrDefault(d => d.GetObjectDBValue(ObjectInfoConst.EntityName).ToString() == objName);
                        if (projectObj == null)
                        {

                            projectObj = ObjectFactoryUtility.CreateInstance(para, trans, "TESTPROJECT");
                            projectObj.SetObjectDBValue("ENAME", abilityObj.GetObjectDBValue("ENAME"));
                            projectObj.SetObjectDBValue("ECODE", abilityObj.GetObjectDBValue("ECODE"));
                            projectObj.SetObjectDBValue("STANDARDCODE", abilityObj.GetObjectDBValue("STANDARDCODE"));
                            projectObj.SetObjectDBValue("STANDARDNAME", abilityObj.GetObjectDBValue("STANDARDNAME"));
                            projectObj.SetObjectDBValue("TYPE", abilityObj.GetObjectDBValue("TYPE"));
                            projectObj.SetObjectDBValue("SCHEDULETYPE", abilityObj.GetObjectDBValue("SCHEDULETYPE"));
                            projectObj.SetObjectDBValue("ABILITYORDER", abilityObj.GetObjectDBValue("ABILITYORDER"));
                            projectObj.SetObjectDBValue("ISCNAS", abilityObj.GetObjectDBValue("ISCNAS"));
                            //根据父级试验能力设置项目的父级项目
                            var pCapabilityId = abilityObj.GetObjectDBValue("TESTPROJECT").ToString();
                            if (!string.IsNullOrEmpty(pCapabilityId))
                            {
                                var pCapability = ObjectFactoryUtility.CreateInstance(para, trans, pCapabilityId, false);
                                if (pCapability != null)
                                {
                                    projectObj.SetObjectDBValue("TESTPROJECT", pCapability.GetObjectDBValue(ObjectInfoConst.EntityName));
                                }
                            }
                            projectObj.SaveObject(para, trans);
                        }
                        abilityObj.SetObjectDBValue("ENAME", projectObj.ObjectID);
                    }
                }
                abilityObj.SaveObject(para, trans);
                if (!string.IsNullOrEmpty(knowledgeId))
                {
                    var kIds = JsonConvert.DeserializeObject<List<string>>(knowledgeId);
                    foreach (var kid in kIds)
                    {
                        ObjectFactoryUtility.AddLink(para, trans, "TESTABILITYTOKNOWLEDGE", abilityObj.ObjectID, kid);
                    }
                }
                if (!string.IsNullOrEmpty(resourceId))
                {
                    var resIds = JsonConvert.DeserializeObject<List<string>>(resourceId);
                    foreach (var resid in resIds)
                    {
                        ObjectFactoryUtility.AddLink(para, trans, "TESTABILITIYTORESOUCE", abilityObj.ObjectID, resid);
                    }
                }
                ret = abilityObj.ObjectID;
            }
            return ret;
        }

        /// <summary>
        /// 批量更改试验能力组织
        /// </summary>
        /// <param name="para"></param>
        /// <param name="trans"></param>
        /// <param name="objectID"></param>
        /// <param name="fieldName"></param>
        /// <param name="value"></param>
        /// <returns></returns>
        public bool ChangeCapabilityOrg(SessionPara para, SQLTransaction trans, string objectID, string value)
        {
            bool result = false;
            if (!string.IsNullOrEmpty(objectID))
            {
                var objList = ObjectFactoryUtility.GetObjListByIdList(para, trans, objectID.Split(';'));
                List<string> list = new List<string>();
                //获取试验能力所在的组织集合
                foreach (var obj in objList)
                {
                    var orgStr = obj.GetObjectDBValue("ORG").ToString();
                    if (!list.Contains(orgStr))
                    {
                        list.Add(orgStr);
                    }
                }
                ObjectQuery query = new ObjectQuery("TESTCAPABILITY");
                query.FilterString = " ORG IN(" + list.Select(d => "'" + d + "'").Aggregate((a, b) => a + "," + b) + ")";
                var queryResult = query.ExecObjectQuery(para, trans);
                List<string> objIdList = new List<string>();
                foreach (var obj in objList)
                {
                    var curOrg = obj.GetObjectDBValue("ORG").ToString();
                    //更改的数据与之前的相同则不再处理
                    if (curOrg == value || objIdList.Contains(obj.ObjectID)) continue;

                    var parentProject = obj.GetObjectDBValue("TESTPROJECT").ToString();
                    //存在父级且父级不在此次更改组织的范围内，清空父级项目
                    if (!string.IsNullOrEmpty(parentProject))
                    {
                        if (!objList.Any(t => t.ObjectID == parentProject))
                        {
                            obj.SetObjectDBValue("TESTPROJECT", DBNull.Value);
                            obj.SaveObject(para, trans);
                        }
                        else
                        {
                            continue;
                        }
                    }
                    else if (string.IsNullOrEmpty(parentProject))
                    {
                        parentProject = obj.ObjectID;
                    }
                    List<BaseObject> tempList = new List<BaseObject>();
                    tempList.Add(obj);
                    DeepGetChildCapabilityObj(parentProject, tempList, queryResult);
                    foreach (var item in tempList)
                    {
                        item.SetObjectDBValue("ORG", value);
                        item.SaveObject(para, trans);
                        objIdList.Add(item.ObjectID);
                    }
                }
                result = true;
            }
            return result;
        }

        /// <summary>
        /// 递归获取下级对象
        /// </summary>
        /// <param name="para"></param>
        /// <param name="trans"></param>
        /// <param name="peid"></param>
        /// <param name="listDestObj"></param>
        /// <param name="queryResult"></param>
        public void DeepGetChildCapabilityObj(string peid, List<BaseObject> listDestObj, List<BaseObject> queryResult)
        {
            var childObjList = queryResult.Where(t => t.GetObjectDBValue("TESTPROJECT").ToString() == peid);
            var subChildList = queryResult.Where(t => t.GetObjectDBValue("TESTPROJECT").ToString() != peid).ToList();
            foreach (var item in childObjList)
            {
                listDestObj.Add(item);
                DeepGetChildCapabilityObj(item.ObjectID, listDestObj, subChildList);
            }
        }

        public TreeRootData GetTestKnowlwdgeTreeNode(SessionPara para, SQLTransaction trans)
        {
            TreeRootData rootData = new TreeRootData();
            var rootTxt = Dictionarys.Instance.GetText("TestResourceLib", "KnowledgeType", para.Lang);
            var rootNodeId = "KNOWLEDGEROOT_" + para.CompanyID.Split('_')[1];
            rootData.RootData = new List<TreeNodeObject>();
            var rootNode = ServiceUtility.GetTreeNodeObject(rootTxt, rootNodeId, "", "KNOWLEDGEROOT", "-1", "", "KNOWLEDGEROOT", true);
            rootNode.Children = new List<TreeNodeObject>();
            var enumData = EnumerationUtility.GetDBEnumerationItem(para, trans, "KnowledgeType");
            foreach (var key in enumData.Keys)
            {
                var tempNode = ServiceUtility.GetTreeNodeObject(enumData[key], key, "", "KNOWLEDGETYPE", "1", "", "KNOWLEDGETYPE", true);
                rootNode.Children.Add(tempNode);
            }
            rootData.RootData.Add(rootNode);
            rootNode.ContentPermission = true;
            return rootData;
        }

    }
}