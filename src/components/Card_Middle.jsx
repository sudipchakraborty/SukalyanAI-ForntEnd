import { useState, useRef, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";

import { ModuleRegistry } from "ag-grid-community";
import { AllCommunityModule } from "ag-grid-community";
ModuleRegistry.registerModules([AllCommunityModule]);

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./Card_Middle.css";

function Card_Middle() {
  const gridRef = useRef();
  const [rowData, setRowData] = useState([
    {
      component: "LED",
      date: "30-11-2025",
      partNo: "L-2001",
      vendor: "REC",
      unitPrice: 2,
      quantity: 20,
      price: 40,
      boxNo: 20,
    },
    {
      component: "Resistor",
      date: "30-11-2025",
      partNo: "R-001",
      vendor: "RANA",
      unitPrice: 0.2,
      quantity: 10,
      price: 2,
      boxNo: 21,
    },
  ]);

  const [deletedRows, setDeletedRows] = useState([]);

  const columnDefs = [
    { checkboxSelection: true, headerCheckboxSelection: true, width: 60 },
    { headerName: "Component", field: "component", editable: true },
    { headerName: "Date", field: "date", editable: true },
    { headerName: "Part No", field: "partNo", editable: true },
    { headerName: "Vendor", field: "vendor", editable: true },
    { headerName: "Unit Price", field: "unitPrice", editable: true },
    { headerName: "Qty", field: "quantity", editable: true },
    { headerName: "Price", field: "price" },
    { headerName: "Box No", field: "boxNo", editable: true },
  ];

  /* Add Row */
  const addRow = () => {
    setRowData([
      ...rowData,
      {
        component: "",
        date: "",
        partNo: "",
        vendor: "",
        unitPrice: 0,
        quantity: 0,
        price: 0,
        boxNo: "",
      },
    ]);
  };

  /* Delete selected rows */
  const deleteSelectedRows = () => {
    const selectedNodes = gridRef.current.api.getSelectedNodes();
    if (selectedNodes.length === 0) return;

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${selectedNodes.length} row(s)?`
    );
    if (!confirmDelete) return;

    const selectedData = selectedNodes.map((n) => n.data);
    setDeletedRows(selectedData); // store for undo

    setRowData(rowData.filter((row) => !selectedData.includes(row)));
  };

  /* Undo delete */
  const undoDelete = () => {
    if (deletedRows.length === 0) return;
    setRowData([...rowData, ...deletedRows]);
    setDeletedRows([]);
  };

  /* Keyboard Delete key support */
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Delete") {
        deleteSelectedRows();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  return (
    <div className="middle-card">
      <div className="middle-header">
        <h3>Material Entry</h3>

        <div className="action-buttons">
          <button className="add-row-btn" onClick={addRow}>
            ➕ Add Row
          </button>

          <button className="delete-row-btn" onClick={deleteSelectedRows}>
            ❌ Delete
          </button>

          <button
            className="undo-btn"
            onClick={undoDelete}
            disabled={deletedRows.length === 0}
          >
            ↩ Undo
          </button>
        </div>
      </div>

      <div className="ag-theme-alpine grid-container">
        <AgGridReact
          ref={gridRef}
          rowData={rowData}
          columnDefs={columnDefs}
          rowSelection="multiple"
          defaultColDef={{
            flex: 1,
            resizable: true,
            sortable: true,
            editable: true,
          }}
        />
      </div>
    </div>
  );
}

export default Card_Middle;
