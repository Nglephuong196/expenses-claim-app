import logo from './logo.svg';
import './App.css';
import ExpensesRecord from './components/expenses-record';
import { useEffect, useState } from 'react';
import {createRecord, deleteRecord, getRecords, updateRecord} from './services/expenses'
import { EmptyExpense } from './constants/empty-expense';
import getHtmlTable from './utils/export-html';

function App() {
  const [expenses, setExpenses] = useState([])
  const [currentItem, setCurrentItem] = useState()
  const handleGetData = () => {
    const data = getRecords()
    setExpenses(data)
  }
  const handleCreateExpense = (data) => {
    createRecord({...data, id: expenses[expenses.length-1]?.id+1 || 1})
    window.location.reload(false)
  }
  const handleUpdateExpense = (data) => {
    updateRecord(data)
    window.location.reload(false)
  }
  const handleDelete = (id) => {
    deleteRecord(id)
    window.location.reload(false)
  }
  const hanldeCopyToClipboard = () => {
    const copyText = getHtmlTable()
    navigator.clipboard.writeText(copyText)
  }
  useEffect(() => {
    handleGetData()
  }, [expenses.length])
  return (
    <div className="App">
      <h2>Expenses Claim App</h2>
      <button onClick={e => hanldeCopyToClipboard()}>Copy to clipboard</button>
      <table>
        <tr>
          <th>No.</th>
          <th>Date</th>
          <th>Descriptions</th>
          <th>Invoice No.</th>
          <th>Amount ($)</th>
        </tr>
        {[...expenses, EmptyExpense].map(i => 
          <ExpensesRecord 
          keys={i.id} 
          expenseProps={i} 
          onDoubleClick={e => setCurrentItem(i.id)} 
          handleCreateExpense={handleCreateExpense}
          handleUpdateExpense={handleUpdateExpense}
          handleDelete={handleDelete}
          isEditing={currentItem === i.id} />
        )}
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td>Total</td>
          <td>{expenses.reduce((acc,cur) => acc+parseInt(cur.amount), 0)}</td>
        </tr>
      </table>
    </div>
  );
}

export default App;
