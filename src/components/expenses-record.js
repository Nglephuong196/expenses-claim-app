import React, { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import CustomInput from "../commons/custom-input";
import { EmptyExpense } from "../constants/empty-expense";

export default function ExpensesRecord({ expenseProps, isEditing, handleCreateExpense, onDoubleClick, handleUpdateExpense, handleDelete }) {
    const [expense, setExpense] = useState(EmptyExpense)
    const handleChange = (e) => {
        setExpense({...expense, [e.target.name]: e.target.value})
    }
    const handleSave = () => {
        if (expense.id) {
            handleUpdateExpense(expense)
        } else {
            handleCreateExpense(expense)
        }
    }
    useEffect(() => {
        setExpense(expenseProps)
    }, [expenseProps])
  return isEditing ? (
    <tr>
      <td><CustomInput value={expense.id} disabled /></td>
      <td><CustomInput type="datetime-local" name="date" onChange={handleChange} value={expense.date} /></td>
      <td><CustomInput name="description" onChange={handleChange} value={expense.description} /></td>
      <td><CustomInput name="invoiceNo" onChange={handleChange} value={expense.invoiceNo} /></td>
      <td><CustomInput name="amount" onChange={handleChange} value={expense.amount} /></td>
      <td><button onClick={handleSave}>Save</button></td>
      {expense.id && (
          <td><button onClick={e => handleDelete(expense.id)}>Delete</button></td>
      )}
    </tr>
  ) : (
    <tr onDoubleClick={onDoubleClick}>
      <td >{expense.id}</td>
      <td>{expense.date}</td>
      <td>{expense.description}</td>
      <td>{expense.invoiceNo}</td>
      <td>{expense.amount}</td>
    </tr>
  );
}
