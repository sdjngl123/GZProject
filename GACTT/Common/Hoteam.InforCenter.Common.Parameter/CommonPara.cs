#region 
using Hoteam.InforCenter.Service.Interface.Parameter;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
#endregion

namespace Hoteam.GACTT.Common.Parameter
{

    [DataContract]
    public class CommonPara : SessionPara
    {
        [DataMember]
        public string ObjectID { get; set; }
        [DataMember]
        public string FieldName { get; set; }
        [DataMember]
        public string Value { get; set; }

    }
}