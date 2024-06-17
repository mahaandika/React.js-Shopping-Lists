import { useState } from "react";

const groceryItems = [
  {
    id: 1,
    name: "Kopi Bubuk",
    quantity: 2,
    checked: true,
  },
  {
    id: 2,
    name: "Gula Pasir",
    quantity: 5,
    checked: false,
  },
  {
    id: 3,
    name: "Air Mineral",
    quantity: 3,
    checked: false,
  },
];

function Header() {
  return <h1>Catatan Belanjaku 📝</h1>;
}

function Form({ onAddItem }) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!name) return;

    const newItem = {
      id: Math.random(),
      name: name,
      quantity: quantity,
      checked: false,
    };

    setName("");
    setQuantity(1);

    onAddItem(newItem);
  }

  const quantityNum = [...Array(10)].map((_, i) => (
    <option value={i + 1} key={i + 1}>
      {i + 1}
    </option>
  ));
  return (
    <>
      <form className="add-form" onSubmit={handleSubmit}>
        <h3>Hari ini belanja apa kita?</h3>
        <div>
          <select
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          >
            {quantityNum}
          </select>
          <input
            type="text"
            placeholder="nama barang..."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button>Tambah</button>
      </form>
    </>
  );
}

function GroceryLists({ items, onDeleteItem }) {
  return (
    <>
      <div className="list">
        <ul>
          {items.map((item) => (
            <ListItem item={item} key={item.id} onDeleteItem={onDeleteItem} />
          ))}
        </ul>
      </div>
      <div className="actions">
        <select>
          <option value="input">Urutkan berdasarkan urutan input</option>
          <option value="name">Urutkan berdasarkan nama barang</option>
          <option value="checked">Urutkan berdasarkan ceklis</option>
        </select>
        <button>Bersihkan Daftar</button>
      </div>
    </>
  );
}

function ListItem({ item, onDeleteItem }) {
  return (
    <>
      <li key={item.id}>
        <input type="checkbox" />
        <span style={item.checked ? { textDecoration: "line-through" } : {}}>
          {item.quantity + " " + item.name}
        </span>
        <button onClick={() => onDeleteItem(item.id)}>&times;</button>
      </li>
      ;
    </>
  );
}

function Footer() {
  return (
    <>
      <footer className="stats">
        Ada 10 barang di daftar belanjaan, 5 barang sudah dibeli (50%)
      </footer>
    </>
  );
}

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItem(item) {
    setItems([...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  return (
    <>
      <div className="app">
        <Header />
        <Form onAddItem={handleAddItem} />
        <GroceryLists items={items} onDeleteItem={handleDeleteItem} />
        <Footer />
      </div>
    </>
  );
}
