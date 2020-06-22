from __future__ import unicode_literals
import frappe
from frappe import _
from frappe.model.mapper import get_mapped_doc

@frappe.whitelist()
def make_sales_invoice_from_purchase_invoice(source_name,target_doc=None,):

	def set_missing_values(source, target):
		if len(target.get("items")) == 0:
			frappe.throw(_("No Items found"))
		doc = frappe.get_doc(target)
		doc.inter_company_invoice_reference=None
		doc.customer=source.customer_cf
		doc.ignore_pricing_rule = 0
		doc.run_method("onload")
		doc.run_method("set_missing_values")
		doc.run_method("calculate_taxes_and_totals")
	def update_item(obj, target, source_parent):
		pass
		# target.received_qty=flt(obj.qty)
		# target.qty = flt(obj.qty)

	doc = get_mapped_doc("Purchase Invoice", source_name,	{
		"Purchase Invoice": {
			"doctype": "Sales Invoice",
			"field_map": {
				"customer":"customer_cf",
			},
			"validation": {
				"docstatus": ["=", 1],
			}
		},
		"Purchase Invoice Item": {
			"doctype": "Sales Invoice Item",
			"field_map": {
				"name": "purchase_invoice_item",
				"parent": "purchase_invoice",
			},
			"postprocess": update_item,
            # "condition": lambda doc: serial_no in doc.serial_no
		},
	}, target_doc, set_missing_values)

	return doc                     