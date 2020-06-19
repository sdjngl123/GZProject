#region 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;
using System.ServiceModel;
using Hoteam.InforCenter.TestResourceLib.Parameter;
using Hoteam.InforCenter.Service.Interface.Control;
using Hoteam.InforCenter.Service.Interface.Parameter;
using Hoteam.InforCenter.Common.DataService.TreeListView.Parameter;
using Hoteam.InforCenter.Common.DataService.ListView.Parameter;
#endregion

namespace Hoteam.InforCenter.TestResourceLib.Service
{
    [ServiceContract]
    public interface ITestResourceLibService
    {
        [OperationContract]
        string UploadAttachFileToResource(TestResourceLibPara para);
        [OperationContract]
        EditTreeGridRowTitleData GetTestCapabilityTreeGridRowTitle(SessionPara para);
        [OperationContract]
        List<EditTreeGridRowObject> GetTestCapabilityTreeGridRowData(TestResourceLibPara para);
        [OperationContract]
        TreeListChildData GetTestCapabilityTreeGridChildRowData(TestResourceLibPara para);
        [OperationContract]
        bool RemoveLinkObject(TestResourceLibPara para);
        [OperationContract]
        bool AddLinkByObjectIdAndLinkTypeName(TestResourceLibPara para);
        [OperationContract]
        TreeRootData GetProjectCapabilityTreeRootNode(SessionPara para);
        [OperationContract]
        string SaveCapabilityData(TestResourceLibPara para);
        [OperationContract]
        bool ChangeCapabilityOrg(TestResourceLibPara para);
        [OperationContract]
        TreeRootData GetTestKnowlwdgeTreeNode(SessionPara para);
    }
}
