frappe.ui.form.on("Item", {
    item_group: function (frm) {
        frappe.db.get_value('Item Group', frm.doc.item_group, 'is_service_item_cf')
            .then(r => {
                if (r.message) {
                    debugger;
                    let is_service_item=r.message.is_service_item_cf
                    if (is_service_item==1) {
                        frm.set_df_property('driver_commission_cf', 'hidden', 0)
                        frm.set_value('driver_commission_cf', '')
                        frm.set_df_property('driver_commission_cf', 'reqd', 1)
                    }else{
                        frm.set_df_property('driver_commission_cf', 'hidden', 1)
                        frm.set_df_property('driver_commission_cf', 'reqd', 0)  
                    }
                }
            })
    }
});