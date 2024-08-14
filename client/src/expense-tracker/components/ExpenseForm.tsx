import { useState } from "react";
import { Expense } from "../../App";
import categories from "../categories"
import axios from "axios";
import { BASE_URL } from "../../constant";


interface ExpenseFormProps{
    fetchExpense: () => void;
    currentData?:Expense;
    breakEdit: () => void;
}


const ExpenseForm = ({fetchExpense,currentData,breakEdit}:ExpenseFormProps) => {

    

    const [expense, setExpense] = useState({
        id: currentData?.id || 0,
        description: currentData?.description || "",
        amount: currentData?.amount || 0,
        category: currentData?.category || "",
    });

    const onSave = () => {
        if (currentData?.id){
            editExpense();
        } else{
            addExpense();
        }
    }

    const editExpense = () => {
        console.log(currentData);
        
        axios
        .put(BASE_URL + "Expense/" + currentData?.id, expense)
        .then(() => {
            fetchExpense();
            breakEdit();
        })
        .catch((error) =>{
            console.log(error.response.data);
            
        })
    }

    const addExpense = () => {
        axios
        .post(BASE_URL + "Expense" , expense)
        .then(() => {
            fetchExpense();
        })
        .catch((error) => {
            console.log(error);
            
        })
        console.log(expense);
        
    };






    return (
      <>
        
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input id="description" type="text" className="form-control" value={expense.description} onChange={(e) => setExpense({...expense, description: e.target.value})}/>
          </div>
          <div className="mb-3">
            <label htmlFor="amount" className="form-label">Amount</label>
            <input id="amount" type="number" className="form-control" value={expense.amount} onChange={(e) => setExpense({...expense, amount: parseInt(e.target.value)})}/>
          </div>
          <div className="mb-3">
            <label htmlFor="category" className="form-label">Category</label>
            <select id="category" className="form-select" value={expense.category} onChange={(e) => setExpense({...expense, category: e.target.value})}>
              <option value=""></option>
              {categories.map(category => <option key={category} value={category}>{category}</option>)}
            </select>
          </div>
          <button className="btn btn-outline-primary" onClick={onSave}>Submit</button>
        
      </>
    );
  };

export default ExpenseForm