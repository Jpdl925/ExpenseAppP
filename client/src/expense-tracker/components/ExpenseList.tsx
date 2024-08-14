import axios from "axios";
import { Expense } from "../../App";
import { BASE_URL } from "../../constant";
import { useState } from "react";
import ExpenseForm from "./ExpenseForm";


export interface ExpenseProps {
  expenses: Expense[];
  fetchExpense: () => void;
}

const ExpenseList = ({ expenses, fetchExpense }: ExpenseProps) => {
  const [currentData, setCurrentData] = useState<Expense>({} as Expense);


  const getExpense = (id:number) => {
    axios
    .get(BASE_URL + "Expense/" + id)
    .then((res) => {
      setCurrentData(res.data);
      console.log(currentData);
      
      
    })
    .catch((error) => {
      console.log(error);
    })    
  }

  const deleteExpense = (id:number) => {
    axios
    .delete(BASE_URL+"Expense/"+id)
    .then(() => {
      console.log(`${id} was deleted`);
      fetchExpense();

    })
    .catch((error) => {
      console.log(error);
      
    })
  }

  return (
    <>
    <div className="m-5">
  <ExpenseForm fetchExpense={fetchExpense} currentData={currentData} breakEdit={() => setCurrentData({} as Expense)}/>
    </div>

<table className="table table-dark table-bordered">
        <thead>
          <tr>
            <th scope="col">Description</th>
            <th scope="col">Amount</th>
            <th scope="col">Category</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(expense => <tr key={expense.id}>
            <td>{expense.description}</td>
            <td>{expense.amount}</td>
            <td>{expense.category}</td>
            <td className="d-flex justify-content-around">
                <button className="btn btn-info" onClick={() => getExpense(expense.id)}>Edit</button>
                <button className="btn btn-outline-danger" onClick={() => deleteExpense(expense.id)}>Delete</button>
            </td>

          </tr>)}

        </tbody>


        <tfoot>
            <tr>
                <td>Total</td>
                <td>{expenses.reduce((acc,expense) => expense.amount + acc,0).toFixed(2)}</td>
                <td></td>
                <td></td>
            </tr>
        </tfoot>

      </table>
    </>
  );
};

export default ExpenseList;
