frappe.ui.form.on('Purchase Invoice', {
    refresh: function (frm) {
        if (frm.doc.docstatus == 1) {
            frm.add_custom_button(__('Make Sales Invoice'), function () {
                if (frm.doc.customer_cf) {
                    frappe.call({
                        args: {
                            "source_name": cur_frm.doc.name,
                        },
                        method: "soc.api.make_sales_invoice_from_purchase_invoice",
                        callback: function (r) {
                            if (r.message) {
                                var doc = frappe.model.sync(r.message)[0];
                                // window.open("#Form/"+doc.doctype+"/" + doc.name)
                                frappe.set_route("Form", doc.doctype, doc.name);
                            }
                        }
                    });
                } else {
                    frappe.msgprint(__("Customer is mandatory to make sales invoice."))
                }
            });
        }
    },
});