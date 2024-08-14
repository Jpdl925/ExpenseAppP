import axios from "axios";
import ExpenseList from "./expense-tracker/components/ExpenseList"
import { BASE_URL } from "./constant";
import { useEffect, useState } from "react";
import ExpenseForm from "./expense-tracker/components/ExpenseForm";
import ExpenseFilter from "./expense-tracker/components/ExpenseFilter";

export interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
}

export interface ExpenseProps {
  expenses: Expense[];
  onDelete: (id: number) => void;
}

const App = () => {

  const [data, setData] = useState<Expense[]>([]);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState('')

  const fetchData = () => {
    axios
      .get(BASE_URL + "Expense")
      .then((res) => {
        setData(res.data);
        console.log(res);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  };

  useEffect(() => {
    fetchData();
    
  }, []);

  const visibileExpense = selectedCategory ? data.filter(e => e.category === selectedCategory) : data;

  
  return (
    <>
<h1 className="text-center">Expense Tracker</h1>

<div className="m-5">
    <ExpenseFilter onSelectCategory={category => setSelectedCategory(category)}/>

    </div>

    <div className="m-5">
    <ExpenseList  expenses={visibileExpense} fetchExpense={fetchData}/>
    </div>
    </>
  )
}

export default App