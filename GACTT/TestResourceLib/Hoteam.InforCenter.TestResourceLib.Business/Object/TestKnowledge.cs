using Hoteam.InforCenter.Common.ObjectFactory;
using Hoteam.InforCenter.Common.ObjectFactory.Factory;
using Hoteam.InforCenter.Common.Query.ObjectQuerys;
using Hoteam.InforCenter.Persistence.Interface.Interface;
using Hoteam.InforCenter.Service.Interface.Parameter;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace Hoteam.InforCenter.TestResourceLib.Business.Object
{
    public class TestKnowledge : EntityObject
    {
        public override void SaveObject(SessionPara session, SQLTransaction trans)
        {
            var type = this.GetObjectDBValue("TYPE").ToString();
            var filter = type + DateTime.Now.ToString("yyyy");
            ObjectQuery query = new ObjectQuery(this.ObjType.TableName);
            query.FilterString = " ECODE LIKE '" + filter + "%'";
            var queryResult = query.ExecObjectQuery(session, trans);
            List<int> listCode = new List<int>() { 1 };
            foreach (EntityObject item in queryResult)
            {
                var lastCode = item.EntityCode.Substring(item.EntityCode.Length - 3);
                listCode.Add(int.Parse(lastCode));
            }
            var maxCode = listCode.Max().ToString();
            while (maxCode.Length < 3)
            {
                maxCode = "0" + maxCode;
            }
            this.SetObjectDBValue(ObjectInfoConst.EntityCode, filter + maxCode);
            base.SaveObject(session, trans);
        }
    }
}
