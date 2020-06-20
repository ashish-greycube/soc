// Copyright (c) 2016, GreyCube Technologies and contributors
// For license information, please see license.txt
/* eslint-disable */

frappe.query_reports["Driver Commission Detail"] = {
	"filters": [
		{
			label: __("From Date"),
			fieldtype: "Date",
			fieldname: "from_date",
			default:frappe.datetime.add_days(frappe.datetime.get_today(), -30)
		},
		{
			label: __("To Date"),
			fieldtype: "Date",
			fieldname: "to_date",
			default: frappe.datetime.get_today(),
		},	
		{
			label: __("Driver"),
			fieldtype: "Link",
			fieldname: "driver",
			options:"Driver"
		},
	]
};
