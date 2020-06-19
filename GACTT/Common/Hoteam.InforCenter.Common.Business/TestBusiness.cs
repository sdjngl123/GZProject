using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Hoteam.GACTT.Common.Business
{
    public class TestBusiness
    {
        /// <summary>
        /// 作为调用端进行数据获取
        /// </summary>
        /// <returns></returns>
        public string GetDataFromRest()
        {
            string retData = "";
            //RestClient client = new RestClient();
            //Instruction info = new Instruction();
            //info.request_code = "12345678-1234-1234-1234-1234567890007";
            //info.request_name = "自动折弯";
            //info.request_time = DateTime.Now.ToString();
            //info.request_data = new List<InstructionData>();
            //InstructionData request_data = new InstructionData();
            //request_data.station_id = "123456";
            //request_data.equipment_group = "2";
            //request_data.worker = "自动折弯工位2";
            //request_data.material_list = new List<InstructionMaterialList>();
            //InstructionMaterialList material_list = new InstructionMaterialList();
            //material_list.lot_id = "850008486151-1";
            //material_list.lot_quantity = "1";
            //material_list.qc_status = "0";
            //material_list.wo_id = "850008486151";
            //material_list.mm_def_id = "13467801";
            //material_list.mm_def_desc = "上桅杆右侧板1SR200C10.4.2-1";
            //request_data.material_list.Add(material_list);
            //info.request_data.Add(request_data);
            //var data = JsonConvert.SerializeObject(info);
            //string reqUrl = "http://182.92.184.251/AutoBendServices/v1/receiveRFIDContent.do";
            //retData = client.HttpPost(reqUrl, data);

            return retData;
        }

        public string TestWebService()
        {
            RestClient rest = new RestClient();
            var dataStr = "{\"HEAD\": {\"BIZTRANSACTIONID\": \"20191025171620982\", \"COUNT\": \"1\", \"CONSUMER\": \"TargetSystem\", \"SRVLEVEL\": \"1\", \"ACCOUNT\": \"\", \"PASSWORD\": \"\"}, \"LIST\": [{\"FAC_CODE\":\"1\",\"WOP_CODE\":\"1\",\"ORD_CODE\":\"1\",\"ORD_QTY\":\"1\",\"MATERIAL_CODE\":\"1\",\"MATERIAL_NAME\":\"1\",\"TON_CODE\":\"1\",\"TON_NAME\":\"1\",\"TON_PID\":\"1\",\"ROU_CODE\":\"1\",\"RES_CODE\":\"1\",\"RES_NAME\":\"1\",\"VRES_CODE\":\"1\",\"VRES_NAME\":\"1\",\"WOP_CES\":\"2020-05-27 10:50:00\",\"WOP_CED\":\"\",\"WOP_STA\":\"1\",\"WOP_CRE\":\"2020-05-27 10:50:00\"}]}";
            var retStr = rest.PostWebRequest("http://10.19.216.30/SANY_ASInterfacesPro/SANY_ASInterfacesPro.asmx/ReceiveASDispatchInfo", "source={\"HEAD\": {\"BIZTRANSACTIONID\": \"20191025171620982\", \"COUNT\": \"1\", \"CONSUMER\": \"TargetSystem\", \"SRVLEVEL\": \"1\", \"ACCOUNT\": \"\", \"PASSWORD\": \"\"}, \"LIST\": [{\"FAC_CODE\":\"1\",\"WOP_CODE\":\"1\",\"ORD_CODE\":\"1\",\"ORD_QTY\":\"1\",\"MATERIAL_CODE\":\"1\",\"MATERIAL_NAME\":\"1\",\"TON_CODE\":\"1\",\"TON_NAME\":\"1\",\"TON_PID\":\"1\",\"ROU_CODE\":\"1\",\"RES_CODE\":\"1\",\"RES_NAME\":\"1\",\"VRES_CODE\":\"1\",\"VRES_NAME\":\"1\",\"WOP_CES\":\"2020-05-27 10:50:00\",\"WOP_CED\":\"\",\"WOP_STA\":\"1\",\"WOP_CRE\":\"2020-05-27 10:50:00\"}]}");
            return "";
        }
    }
}
