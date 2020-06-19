#region
using Hoteam.InforCenter.Common.DataService.ListView.Parameter;
using Hoteam.InforCenter.Common.DataService.TreeListView.Parameter;
using Hoteam.InforCenter.Persistence.Interface.Interface;
using Hoteam.InforCenter.Service.Interface.Control;
using Hoteam.InforCenter.Service.Interface.Parameter;
using Hoteam.InforCenter.TestResourceLib.Business;
using Hoteam.InforCenter.TestResourceLib.Parameter;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
#endregion

namespace Hoteam.InforCenter.TestResourceLib.Service
{
    public class TestResourceLibService : ITestResourceLibService
    {


        public TreeListChildData GetTestCapabilityTreeGridChildRowData(TestResourceLibPara para)
        {
            using (SQLTransaction trans = new SQLTransaction(para))
            {
                TestResourceLibBusiness business = new TestResourceLibBusiness();
                return business.GetTestCapabilityTreeGridChildRowData(para, trans, para.ObjectID, para.PEID, para.ObjectType);
            }
        }

        public List<EditTreeGridRowObject> GetTestCapabilityTreeGridRowData(TestResourceLibPara para)
        {
            using (SQLTransaction trans = new SQLTransaction(para))
            {
                TestResourceLibBusiness business = new TestResourceLibBusiness();
                return business.GetTestCapabilityTreeGridRowData(para, trans, para.ObjectID, para.ObjectType);
            }
        }

        public EditTreeGridRowTitleData GetTestCapabilityTreeGridRowTitle(SessionPara para)
        {
            TestResourceLibBusiness business = new TestResourceLibBusiness();
            return business.GetTestCapabilityTreeGridRowTitle(para);
        }


        public string UploadAttachFileToResource(TestResourceLibPara para)
        {
            string retStr = "";
            using (SQLTransaction trans = new SQLTransaction(para))
            {
                TestResourceLibBusiness business = new TestResourceLibBusiness();
                retStr = business.UploadAttachFileToResource(para, trans, para.ObjectID, para.Content);
                if (!string.IsNullOrEmpty(retStr))
                {
                    trans.Commit();
                }
            }
            return retStr;
        }

        public bool AddLinkByObjectIdAndLinkTypeName(TestResourceLibPara para)
        {
            bool result = false;
            using (SQLTransaction trans = new SQLTransaction(para))
            {
                TestResourceLibBusiness business = new TestResourceLibBusiness();
                result = business.AddLinkByObjectIdAndLinkTypeName(para, trans, para.LinkTypeName, para.PEID, para.ObjectID);
                if (result)
                {
                    trans.Commit();
                }
            }
            return result;
        }
        public bool RemoveLinkObject(TestResourceLibPara para)
        {
            bool result = false;
            using (SQLTransaction trans = new SQLTransaction(para))
            {
                TestResourceLibBusiness business = new TestResourceLibBusiness();
                result = business.RemoveLinkObject(para, trans, para.ObjectID);
                if (result)
                {
                    trans.Commit();
                }
            }
            return result;
        }

        public TreeRootData GetProjectCapabilityTreeRootNode(SessionPara para)
        {
            using (SQLTransaction trans = new SQLTransaction(para))
            {
                TestResourceLibBusiness business = new TestResourceLibBusiness();
                return business.GetProjectCapabilityTreeRootNode(para, trans);
            }
        }

        public string SaveCapabilityData(TestResourceLibPara para)
        {
            string retStr = "";
            using (SQLTransaction trans = new SQLTransaction(para))
            {
                TestResourceLibBusiness business = new TestResourceLibBusiness();
                retStr = business.SaveCapabilityData(para, trans, para.BaseData, para.KnowledgeID, para.ResourceID, para.ObjectID);
                if (!string.IsNullOrEmpty(retStr))
                {
                    trans.Commit();
                }
            }
            return retStr;
        }

        public bool ChangeCapabilityOrg(TestResourceLibPara para)
        {
            bool result = false;
            using (SQLTransaction trans = new SQLTransaction(para))
            {
                TestResourceLibBusiness business = new TestResourceLibBusiness();
                result = business.ChangeCapabilityOrg(para, trans, para.ObjectID, para.Value);
                if (result)
                {
                    trans.Commit();
                }
            }
            return result;
        }

        public TreeRootData GetTestKnowlwdgeTreeNode(SessionPara para)
        {
            using (SQLTransaction trans = new SQLTransaction(para))
            {
                TestResourceLibBusiness business = new TestResourceLibBusiness();
                return business.GetTestKnowlwdgeTreeNode(para, trans);
            }
        }
    }
}
