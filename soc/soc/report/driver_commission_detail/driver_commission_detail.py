# Copyright (c) 2013, GreyCube Technologies and contributors
# For license information, please see license.txt

from __future__ import unicode_literals
import frappe
from frappe import _

def execute(filters=None):
	columns, data = [], []
	filters=frappe._dict(filters or {})
	columns=get_columns(filters)
	data=get_data(filters)
	return columns, data

def get_columns(filters):
	columns = [
		{
			"label": _("Date"),
			"fieldtype": "Date",
			"fieldname": "posting_date",
			"width": 100
		},
		{
			"label": _("Sales Invoice"),
			"fieldtype": "Link",
			"fieldname": "sales_invoice",
			"options":"Sales Invoice",
			"width": 200
		},
		{
			"label": _("Route"),
			"fieldtype": "Data",
			"fieldname": "item_name",
			"width": 200
		},	
		{
			"label": _("Driver"),
			"fieldtype": "data",
			"fieldname": "driver",
			"width": 200
		},	
		{
			"label": _("Comission"),
			"fieldtype": "Currency",
			"fieldname": "total_comission",
			"width": 150
		}]					
	return columns	


def get_data(filters):
	result=frappe.db.sql("""
select  si.posting_date,
		si.name as sales_invoice,
        si_item.item_name,
        driver.full_name as driver,
	    sum(si_item.qty*item.driver_commission_cf) as total_comission
			from
				`tabSales Invoice` si 
			inner join `tabSales Invoice Item` si_item
			on
				si.name = si_item.parent
			inner join `tabItem` item
            on si_item.item_code=item.item_code
            inner join `tabDriver` driver
            on si.driver_cf=driver.name
            where 
				si.docstatus = 1
				and si.is_return = 0
				and driver.name=%s
                and si.posting_date between %s and %s
				and si_item.item_group =(select name from `tabItem Group` item_group where is_service_item_cf=1) 
			group by si_item.item_name,si.name,driver.full_name	
                   	
	""",(filters.get('driver'),filters.get('from_date'),filters.get('to_date')),as_dict=True)

	return result	
