InforCenter_Platform_PersonalSetting_PageInit = function (pageEvent) {
    var ddlLang = pageEvent.o.GetControl("LangDropDown");
    var ddlTimeZone = pageEvent.o.GetControl("TimezoneDropDown");
    var ddlMenuMode = pageEvent.o.GetControl("ModeDropDown");
    var textValueAgency = pageEvent.o.GetControl("AgencyTextValue");
    var ddlTheme = pageEvent.o.GetControl("ThemeDropDown");
    var timeZone = HoteamUI.DataService.Call("InforCenter.Enumeration.EnumerationService.GetEnumerationItem", { para: { EnumerationName: "TimeZone" } });
    if (HoteamUI.Common.IsNullOrEmpty(timeZone)) {
        return;
    }
    var mode = HoteamUI.DataService.Call("InforCenter.Enumeration.EnumerationService.GetEnumerationItem", { para: { EnumerationName: "HomePageMode" } });
    if (HoteamUI.Common.IsNullOrEmpty(mode)) {
        return;
    }
    var theme = HoteamUI.DataService.Call("InforCenter.Enumeration.EnumerationService.GetEnumerationItem", { para: { EnumerationName: "Theme" } });
    if (HoteamUI.Common.IsNullOrEmpty(theme)) {
        return;
    }
    var userStr = HoteamUI.DataService.Call("InforCenter.Organization.OrganizationDataService.GetUserInfoForPersonalSetting", {});
    if (HoteamUI.Common.IsNullOrEmpty(userStr)) {
        return;
    }
    var user = JSON.parse(userStr.User);
    var person = JSON.parse(userStr.Person);
    var data = HoteamUI.CallAjax.Call(PlatformUI.WebServicePath, "GetPersonalSetting", {});
    if (HoteamUI.Common.IsNullOrEmpty(ddlTimeZone) == false) {
        //  for (var item in timeZone) {
        for (var i = 0; i < timeZone.length; i++) {
            timeZone[i].Text = timeZone[i].Value;
            timeZone[i].Value = timeZone[i].Key;
        }
        ddlTimeZone.LoadItems(timeZone);
        if (HoteamUI.Common.IsNullOrEmpty(user.TIMEZONE) == false) {
            ddlTimeZone.SetSelectedByValue(user.TIMEZONE);
        }
    }
    if (HoteamUI.Common.IsNullOrEmpty(ddlMenuMode) == false) {
        // for (var item in mode) {
        for (var i = 0; i < mode.length; i++) {
            mode[i].Text = mode[i].Value;
            mode[i].Value = mode[i].Key;
        }
        ddlMenuMode.LoadItems(mode);
        if (HoteamUI.Common.IsNullOrEmpty(user.HOMEPAGEMODE) == false) {
            ddlMenuMode.SetSelectedByValue(user.HOMEPAGEMODE);
        }
    }
    if (HoteamUI.Common.IsNullOrEmpty(ddlTheme) == false) {
        // for (var item in theme) {
        for (var i = 0; i < theme.length; i++) {
            theme[i].Text = theme[i].Value;
            theme[i].Value = theme[i].Key;
        }
        ddlTheme.LoadItems(theme);
        if (HoteamUI.Common.IsNullOrEmpty(user.THEME) == false) {
            ddlTheme.SetSelectedByValue(user.THEME);
        }
    }

    if (HoteamUI.Common.IsNullOrEmpty(ddlLang) == false && HoteamUI.Common.IsNullOrEmpty(data.Language) == false) {
        ddlLang.LoadItems(data.Language);
        if (HoteamUI.Common.IsNullOrEmpty(user.LANGUAGE) == false)
            ddlLang.SetSelectedByValue(user.LANGUAGE);
    }

    if (HoteamUI.Common.IsNullOrEmpty(textValueAgency) == false && textValueAgency.id != "" && HoteamUI.Common.IsNullOrEmpty(user.AGENTID) == false) {
        textValueAgency.SetValue(user.AGENTID);
        textValueAgency.SetText(user.AGENTID_DisplayValue);
    }

    var gender = pageEvent.o.GetControl('GENDER_Value');
    if (gender) {
        var genderdata = HoteamUI.DataService.Call("InforCenter.Enumeration.EnumerationService.GetEnumerationItem", { para: { EnumerationName: "Gender" } });
        //  for (var item in genderdata) {
        for (var i = 0; i < genderdata.length; i++) {
            genderdata[i].Text = genderdata[i].Value;
            genderdata[i].Value = genderdata[i].Key;
        }
        genderdata.unshift({ Text: "", Value: "" });
        gender.LoadItems(genderdata);

        if (person.GENDER) {
            gender.SetSelectedByValue(person.GENDER);
        }
    }

    var birthday = pageEvent.o.GetControl('BIRTHDAY_Value');
    if (birthday) {
        if (person.BIRTHDAY_DisplayValue) {
            birthday.SetDateTime(person.BIRTHDAY_DisplayValue);
        }
    }

    var academicrecord = pageEvent.o.GetControl('ACADEMICRECORD_Value');
    if (academicrecord) {
        var academicrecorddata = HoteamUI.DataService.Call("InforCenter.Enumeration.EnumerationService.GetEnumerationItem", { para: { EnumerationName: "AcademicRecord" } });
        // for (var item in academicrecorddata) {
        for (var i = 0; i < academicrecorddata.length; i++) {
            academicrecorddata[i].Text = academicrecorddata[i].Value;
            academicrecorddata[i].Value = academicrecorddata[i].Key;
        }
        academicrecorddata.unshift({ Text: "", Value: "" });
        academicrecord.LoadItems(academicrecorddata);
        if (person.ACADEMICRECORD) {
            academicrecord.SetSelectedByValue(person.ACADEMICRECORD);
        }
    }

    var phone = pageEvent.o.GetControl('PHONE_Value');
    if (phone) {
        if (person.PHONE) {
            phone.SetText(person.PHONE);
        }
    }

    var email = pageEvent.o.GetControl('EMAIL_Value');
    if (email) {
        if (person.EMAIL) {
            email.SetText(person.EMAIL);
        }
    }

    var address = pageEvent.o.GetControl('ADDRESS_Value');
    if (address) {
        if (person.ADDRESS) {
            address.SetText(person.ADDRESS);
        }
    }

    var zipcode = pageEvent.o.GetControl('ZIPCODE_Value');
    if (zipcode) {
        if (person.ZIPCODE) {
            zipcode.SetText(person.ZIPCODE);
        }
    }

}

//个人设置 确定
InforCenter_Platform_PersonalSetting_OKOnClick = function (ctrlEvent) {
    //data获取页面数据
    var formId = ctrlEvent.o.OtherControl("PersonalSetting_ContentLayout").id;
    var checked = HoteamUI.UIManager.FormCheck(formId);
    if (!checked) { return; }
    var language = null;
    var timeZone = null;
    var homePageMode = null;
    var agentID = null;
    var theme = null;
    var ddlLanguage = ctrlEvent.o.OtherControl("LangDropDown");
    var ddlTimeZone = ctrlEvent.o.OtherControl("TimezoneDropDown");
    var ddlHomePageMode = ctrlEvent.o.OtherControl("ModeDropDown");
    var ddlTheme = ctrlEvent.o.OtherControl("ThemeDropDown");

    if (HoteamUI.Common.IsNullOrEmpty(ddlLanguage) == false) {
        language = ddlLanguage.GetSelectedValue();
    }
    if (HoteamUI.Common.IsNullOrEmpty(ddlTimeZone) == false) {
        timeZone = ddlTimeZone.GetSelectedValue();
    }
    if (HoteamUI.Common.IsNullOrEmpty(ddlHomePageMode) == false) {
        homePageMode = ddlHomePageMode.GetSelectedValue();
    }
    if (HoteamUI.Common.IsNullOrEmpty(ddlTheme) == false) {
        theme = ddlTheme.GetSelectedValue();
    }


    var gender = null;
    var birthday = null;
    var academicrecord = null;
    var phone = null;
    var email = null;
    var address = null;
    var zipcode = null;

    var genderCtrl = ctrlEvent.o.OtherControl('GENDER_Value');
    genderCtrl ? gender = genderCtrl.GetSelectedValue() : null;

    var birthdayCtrl = ctrlEvent.o.OtherControl('BIRTHDAY_Value');
    birthdayCtrl ? birthday = birthdayCtrl.GetTicksByDateTime() : 0;

    var academicrecordCtrl = ctrlEvent.o.OtherControl('ACADEMICRECORD_Value');
    academicrecordCtrl ? academicrecord = academicrecordCtrl.GetSelectedValue() : null;

    var phoneCtrl = ctrlEvent.o.OtherControl('PHONE_Value');
    phoneCtrl ? phone = phoneCtrl.GetText() : null;

    var emailCtrl = ctrlEvent.o.OtherControl('EMAIL_Value');
    emailCtrl ? email = emailCtrl.GetText() : null;

    var addressCtrl = ctrlEvent.o.OtherControl('ADDRESS_Value');
    addressCtrl ? address = addressCtrl.GetText() : null;

    var zipcodeCtrl = ctrlEvent.o.OtherControl('ZIPCODE_Value');
    zipcodeCtrl ? zipcode = zipcodeCtrl.GetText() : null;



    var para = {
        para: {
            personalSetting: {
                Language: language,
                TimeZone: timeZone,
                HomePageMode: homePageMode,
                Theme: theme,
                Gender: gender,
                Birthday: birthday,
                Academicrecord: academicrecord,
                Phone: phone,
                Email: email,
                Address: address,
                Zipcode: zipcode
            }
        }
    }
    var result = HoteamUI.DataService.Call("InforCenter.Organization.OrganizationDataService.SaveForPersonalSetting", para);
    if (result == true) {
        var pid = ctrlEvent.o.ContainerID();
        HoteamUI.UIManager.Return(pid, {});
    } else {
        var para = { pageMode: "OK", context: "PersonalSetting", labelName: "Fail" }
        HoteamUI.UIManager.Popup("Confirm", para, null, {});
    }


}

InforCenter_Platform_PersonalSetting_AgencyOnClick = function (ctrlEvent) {
    var callback = function (data, ret) {
        var o = HoteamUI.Control.Instance(data.id);
        if (ret != null && ret.length > 0) {
            if (ret[0].EID == HoteamUI.Security.LoginPara.UserID) {
                var para = { pageMode: "OK", context: "PersonalSetting", labelName: "AgencyOneself" }
                HoteamUI.UIManager.Popup("Confirm", para, null, {});
                return;
            }
            else {
                //检查代理
                var para = { para: { personalSetting: { AgentID: ret[0].EID } } };
                var canSetAsAgence = HoteamUI.DataService.Call("InforCenter.Organization.OrganizationDataService.CanSetAsAgence", para);
                if (canSetAsAgence == false) {
                    //设置人已经设置别人为代理人
                    var msg = HoteamUI.Language.Lang("PersonalSetting", "CannotSetAsAgency");
                    msg = msg.replace(/\[user\]/g, ret[0].ENAME);
                    var p = { pageMode: "OK", message: msg }
                    HoteamUI.UIManager.Popup("Confirm", p, null, {});
                    return;
                }
            }
            o.SetText(ret[0].ENAME);
            o.SetValue(ret[0].EID);
        }
    }
    var canSetAgence = HoteamUI.DataService.Call("InforCenter.Organization.OrganizationDataService.CanSetAsAgence", {});
    if (canSetAgence == false) {
        //别人已经设置自己为代理人
        var p = { pageMode: "OK", context: "PersonalSetting", labelName: "CannotSetAgency" }
        HoteamUI.UIManager.Popup("Confirm", p, null, {});
        return;
    }
    HoteamUI.UIManager.Popup("ListCommonQuery", { Value: ctrlEvent.o.GetValue(), ItemName: "SingleUserTreeListQuery" }, callback, { id: ctrlEvent.o.id }, "960*600");

}