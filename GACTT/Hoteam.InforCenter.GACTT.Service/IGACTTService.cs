#region 
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;
using System.ServiceModel;
#endregion

namespace Hoteam.InforCenter.GACTT.Service
{
    [ServiceContract]
    public interface IGACTTService
    {
	    [OperationContract]
        void DoWork();
	}
}
