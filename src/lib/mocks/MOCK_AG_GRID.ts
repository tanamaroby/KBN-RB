// MOCK_AG_GRID.ts
import { ColDef } from "ag-grid-community";

// --- Helper function to generate random dates ---
function randomDate(start: Date, end: Date): Date {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

// --- Helper function to get a random item from an array ---
function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// --- Define the structure of our row data ---
export interface ProductRowData {
  id: number;
  productName: string;
  category: string;
  supplier: string;
  price: number;
  inStock: boolean;
  quantity: number;
  manufactureDate: Date;
  lastOrderDate: Date | null;
  rating: number; // 0-5
  description: string;
}

// --- Generate Mock Row Data ---
const categories = [
  "Electronics",
  "Books",
  "Home & Kitchen",
  "Sports & Outdoors",
  "Toys & Games",
  "Automotive",
  "Health & Personal Care",
];
const suppliers = [
  "Global Imports",
  "Tech Solutions Inc.",
  "Home Goods Ltd.",
  "SportsPro",
  "ToyWorld",
  "AutoParts Direct",
  "PharmaChoice",
  "Local Artisans Co.",
];
const productNamesPrefixes = [
  "Premium",
  "Eco-Friendly",
  "Smart",
  "Compact",
  "Heavy Duty",
  "Lightweight",
  "Wireless",
  "Bluetooth",
];
const productNamesSuffixes = [
  "Gadget",
  "Device",
  "Tool",
  "Appliance",
  "Kit",
  "System",
  "Accessory",
  "Unit",
];

export const mockRowData: ProductRowData[] = [];
const numRows = 150; // Generate 150 rows for good pagination testing

for (let i = 1; i <= numRows; i++) {
  const category = getRandomItem(categories);
  const price = parseFloat((Math.random() * 500 + 10).toFixed(2)); // Price between 10 and 510
  const quantity = Math.floor(Math.random() * 200);
  const inStock = quantity > 0;
  const manufactureDate = randomDate(new Date(2020, 0, 1), new Date());
  const lastOrderDate =
    Math.random() > 0.3 ? randomDate(manufactureDate, new Date()) : null;
  const rating = Math.floor(Math.random() * 6); // 0 to 5

  mockRowData.push({
    id: 1000 + i,
    productName: `${getRandomItem(productNamesPrefixes)} ${
      category.split(" ")[0]
    } ${getRandomItem(productNamesSuffixes)} #${i}`,
    category: category,
    supplier: getRandomItem(suppliers),
    price: price,
    inStock: inStock,
    quantity: quantity,
    manufactureDate: manufactureDate,
    lastOrderDate: lastOrderDate,
    rating: rating,
    description: `This is a high-quality ${category.toLowerCase()} product from ${
      suppliers[i % suppliers.length]
    }. Ideal for various applications. Model X${i * 7}.`,
  });
}

// --- Define Column Definitions ---
export const mockColDefs: ColDef<ProductRowData>[] = [
  {
    headerName: "ID",
    field: "id",
    width: 90,
    pinned: "left", // Pin ID column to the left
    filter: "agNumberColumnFilter",
    sortable: true,
  },
  {
    headerName: "Product Name",
    field: "productName",
    minWidth: 250,
    filter: "agTextColumnFilter",
    sortable: true,
    tooltipField: "description", // Show description on hover
  },
  {
    headerName: "Category",
    field: "category",
    minWidth: 180,
    filter: "agTextColumnFilter",
    sortable: true,
  },
  {
    headerName: "Supplier",
    field: "supplier",
    minWidth: 200,
    filter: "agTextColumnFilter",
    sortable: true,
  },
  {
    headerName: "Price",
    field: "price",
    width: 120,
    filter: "agNumberColumnFilter",
    sortable: true,
    valueFormatter: (params) =>
      params.value != null ? "$" + params.value.toFixed(2) : "", // Format as currency
    cellStyle: (params) =>
      params.value > 200 ? { color: "green" } : { color: "darkred" }, // Conditional styling
  },
  {
    headerName: "In Stock",
    field: "inStock",
    width: 110,
    filter: "agTextColumnFilter",
    sortable: true,
    cellRenderer: (params: any) => (params.value ? "Yes" : "No"), // Custom renderer for boolean
    cellClass: (params) => (params.value ? "ag-stock-yes" : "ag-stock-no"), // Custom cell class
  },
  {
    headerName: "Quantity",
    field: "quantity",
    width: 120,
    filter: "agNumberColumnFilter",
    sortable: true,
    editable: true, // Make quantity editable
    cellEditor: "agNumberCellEditor",
    cellEditorParams: {
      min: 0,
      max: 1000,
      precision: 0,
    },
  },
  {
    headerName: "Manufacture Date",
    field: "manufactureDate",
    minWidth: 180,
    filter: "agDateColumnFilter",
    sortable: true,
    valueFormatter: (params) =>
      params.value ? params.value.toLocaleDateString() : "",
    filterParams: {
      comparator: (filterLocalDateAtMidnight: Date, cellValue: string) => {
        const dateAsString = cellValue;
        if (dateAsString == null) return -1;
        const dateParts = dateAsString.split("/");
        const cellDate = new Date(
          Number(dateParts[2]),
          Number(dateParts[1]) - 1,
          Number(dateParts[0])
        );
        if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
          return 0;
        }
        if (cellDate < filterLocalDateAtMidnight) {
          return -1;
        }
        if (cellDate > filterLocalDateAtMidnight) {
          return 1;
        }
        return 0;
      },
    },
  },
  {
    headerName: "Last Order",
    field: "lastOrderDate",
    minWidth: 180,
    filter: "agDateColumnFilter",
    sortable: true,
    valueFormatter: (params) =>
      params.value ? params.value.toLocaleDateString() : "N/A",
  },
  {
    headerName: "Rating",
    field: "rating",
    width: 150,
    filter: "agNumberColumnFilter",
    sortable: true,
    // Example of a custom cell renderer for stars
    cellRenderer: (params: { value: number }) => {
      if (params.value == null) return "";
      return "⭐".repeat(params.value) + "☆".repeat(5 - params.value);
    },
  },
  {
    headerName: "Description",
    field: "description",
    minWidth: 1000,
    sortable: false, // Usually don't sort by long text fields
    filter: false,
  },
];
