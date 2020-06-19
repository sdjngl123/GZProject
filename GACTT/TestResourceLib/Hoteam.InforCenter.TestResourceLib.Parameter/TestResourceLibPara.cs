#region 
using Hoteam.InforCenter.Service.Interface.Parameter;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
#endregion

namespace Hoteam.InforCenter.TestResourceLib.Parameter
{

    [DataContract]
    public class TestResourceLibPara : SessionPara
    {
        [DataMember]
        public string ObjectID { get; set; }
        [DataMember]
        public string ObjectType { get; set; }
        [DataMember]
        public string Content { get; set; }

        [DataMember]
        public string PEID { get; set; }

        [DataMember]
        public string LinkTypeName { get; set; }

        [DataMember]
        public string BaseData { get; set; }

        [DataMember]
        public string KnowledgeID { get; set; }

        [DataMember]
        public string ResourceID { get; set; }
        [DataMember]
        public string Value { get; set; }
    }
}