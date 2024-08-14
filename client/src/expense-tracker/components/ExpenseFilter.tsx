import categories from "../categories";

interface FilterProps {
    onSelectCategory: (category: string) => void;
}


const ExpenseFilter = ({onSelectCategory}:FilterProps) => {
  return (
    <>
    <h1 className="text-center">Filter</h1>
    <div className="d-flex justify-content-center">
    <select onChange={(e) => onSelectCategory(e.target.value)}>
        <option></option>
        {categories.map(category => <option  key={category} value={category}>{category}</option>)}
    </select>
    </div>
    </>
  )
}

export default ExpenseFilter