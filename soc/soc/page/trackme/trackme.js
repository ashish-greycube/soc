frappe.pages["trackme"].on_page_load = function (wrapper) {
  var page = frappe.ui.make_app_page({
    parent: wrapper,
    title: "Track Me",
    single_column: true,
  });

  wrapper.tracker = new Tracker(wrapper);
  $(wrapper).bind("show", function () {
    wrapper.tracker.show();
  });
};

class Tracker {
  constructor(wrapper) {
    // this.wrapper = $(wrapper);
    let me = this;
    this.wrapper = $(wrapper).find(".page-content");
    $(
      `<div id="aggrid" class="ag-theme-balham" style="height:450px; width:100%; margin-bottom:25px;"></div>`
    ).appendTo(this.wrapper.find(".page-form"));
    this.container = this.wrapper.find(".ag-theme-balham");
    this.page = wrapper.page;

    this.items = [
      { item_name: "Pepita Pesto Wrap", starting: 0, returns: 0 },
      { item_name: "Sunseed Chorizo Wrap", starting: 0, returns: 0 },
      { item_name: "Smokey BBQ Veggie Burger Wrap", starting: 0, returns: 0 },
      { item_name: "Dreamy Creamy Sesame", starting: 0, returns: 0 },
      { item_name: "Classic Vegan Alfredo", starting: 0, returns: 0 },
      { item_name: "Lemongrass Coconut Thai Curry", starting: 0, returns: 0 },
      { item_name: "Creamy Vegan Caesar Salad", starting: 0, returns: 0 },
      { item_name: "Foxy French Lentil", starting: 0, returns: 0 },
      { item_name: "Kinky Qunioa", starting: 0, returns: 0 },
      { item_name: "Madly Mung Bean", starting: 0, returns: 0 },
      { item_name: "Carrot-Bean-Free-Hummus", starting: 0, returns: 0 },
      { item_name: "Beet-Bean-Free-Hummus", starting: 0, returns: 0 },
      { item_name: "Chocolate Truffle Moon", starting: 0, returns: 0 },
      { item_name: "Dark Chocolate Truffle Moon", starting: 0, returns: 0 },
      { item_name: "Helluva Halva Original", starting: 0, returns: 0 },
      { item_name: "Helluva Halva Pistachio", starting: 0, returns: 0 },
      { item_name: "Helluva Halva Cacao Nib", starting: 0, returns: 0 },
    ];

    this.gridOptions = {
      columnDefs: [
        {
          field: "item_name",
          headerName: "Item",
          width: 300,
        },
        {
          field: "starting",
          headerName: "Starting",
          editable: true,
          width: 90,
        },
        {
          field: "returns",
          headerName: "Returns",
          editable: true,
          width: 90,
        },
      ],
      singleClickEdit: true,
      onGridReady: function (params) {
        setTimeout(() => {
          params.api.setRowData(me.items);
          params.api.sizeColumnsToFit();
        }, 100);
      },
    };
    let item_grid = new agGrid.Grid(this.container.get(0), this.gridOptions);
  }

  show() {
    this.wrapper.find(".page-form").removeClass("hide");
  }
}
