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

function GroceryLists({ items, onDeleteItem, onToggleCheck, onClearItems }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItmes;

  if (sortBy === "input") {
    sortedItmes = items;
  }

  if (sortBy === "name") {
    sortedItmes = items.slice().sort((a, b) => a.name.localeCompare(b.name));
  }

  if (sortBy === "checked") {
    sortedItmes = items.slice().sort((a, b) => a.checked - b.checked);
  }

  return (
    <>
      <div className="list">
        <ul>
          {sortedItmes.map((item) => (
            <ListItem
              item={item}
              key={item.id}
              onDeleteItem={onDeleteItem}
              onToggleCheck={onToggleCheck}
            />
          ))}
        </ul>
      </div>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Urutkan berdasarkan urutan input</option>
          <option value="name">Urutkan berdasarkan nama barang</option>
          <option value="checked">Urutkan berdasarkan ceklis</option>
        </select>
        <button onClick={onClearItems}>Bersihkan Daftar</button>
      </div>
    </>
  );
}

function ListItem({ item, onDeleteItem, onToggleCheck }) {
  return (
    <>
      <li key={item.id}>
        <input type="checkbox" onChange={() => onToggleCheck(item.id)} />
        <span style={item.checked ? { textDecoration: "line-through" } : {}}>
          {item.quantity + " " + item.name}
        </span>
        <button onClick={() => onDeleteItem(item.id)}>&times;</button>
      </li>
      ;
    </>
  );
}

function Footer({ items }) {
  if (items.length == 0) {
    return <footer className="stats">daftar belanjaan masih kosong</footer>;
  }

  let totalItems = items.length;
  let buyedItems = items.filter((item) => item.checked).length;
  let percentage = Math.round((buyedItems / totalItems) * 100);

  return (
    <>
      <footer className="stats">
        Ada {totalItems} barang di daftar belanjaan, {buyedItems} barang sudah
        dibeli ({percentage}%)
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

  /* 
    handleToggleCheck adalah fungsi yang digunakan untuk mengubah status ceklis pada item
    fungsi ini menerima parameter id yang digunakan untuk mencari item yang ingin diubah
    fungsi ini menggunakan metode map untuk mengubah item yang sesuai dengan id yang akan diubah status ceklisnya menjadi kebalikan
    item yang tidak sesuai dengan id akan tetap sama
    */
  function handleToggleCheck(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  }

  function handleClearItems() {
    setItems([]);
  }

  return (
    <>
      <div className="app">
        <Header />
        <Form onAddItem={handleAddItem} />
        <GroceryLists
          items={items}
          onDeleteItem={handleDeleteItem}
          onToggleCheck={handleToggleCheck}
          onClearItems={handleClearItems}
        />
        <Footer items={items} />
      </div>
    </>
  );
}
