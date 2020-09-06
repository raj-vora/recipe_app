import React, {useState} from 'react'
import M from 'materialize-css'

export default ({ setSearchTerm, setMeals, setCuisine, setDiets }) => {
    const mealType = ['Breakfast', 'Lunch', 'Teatime', 'Snack', 'Dinner'], 
    health = ['Vegan', 'Vegetarian', 'Sugar-conscious', 'Peanut-free', 'Tree-nut-free', 'Alcohol-free'], 
    dietType=['Balanced', 'High-protein', 'Low-fat', 'Low-carb'];
    const [search, setSearch] = useState('');
    const [meal, setMeal] = useState('');
    const [cuisines, setCuisines] = useState([]);
    const [diet, setDiet] = useState('');

    document.addEventListener('DOMContentLoaded', function() {
        const elems = document.querySelector('.collapsible');
        M.Collapsible.init(elems);
        const selectElems = document.querySelectorAll('select');
        M.FormSelect.init(selectElems);
    });

    const onSubmit = (event) => {
        event.preventDefault();
        const elems = document.querySelector('.collapsible');
        const instance = M.Collapsible.getInstance(elems);
        instance.close(0);
        instance.close(1);
        instance.close(2);
        setSearchTerm(search);
        setMeals(meal);
        setCuisine(cuisines);
        setDiets(diet);
    }


    return (
        <div>
            <div className="row">
                <form className="col s12" onSubmit={(event) => {onSubmit(event)}}>
                    <div className="row">
                        <div className="input-field col s10">
                            <input 
                                placeholder="Add ingredients here..." 
                                id="searchbar" type="text"
                                className="validate" 
                                value={search} 
                                onChange={(event) => setSearch(event.target.value)} 
                            />
                            <label htmlFor="searchbar">Search for Recipe</label>
                        </div>
                        <div className="col s2" style={{padding: 10}}>
                        <button className="btn waves-effect" type="submit" name="action">Search
                            <i className="material-icons right">search</i>
                        </button>
                        </div>
                        
                    </div>
                    <ul className="collapsible">
                            {/* <li>
                                <div className="collapsible-header"><i className="material-icons">fastfood</i>Meal</div>
                                <div className="collapsible-body">
                                    {mealType.map((type) => <p key={type}><label>
                                            <input 
                                                name="mealtype" 
                                                type="radio" 
                                                value={type.toLowerCase()} 
                                                onChange={(event) => setMeal(type)}  
                                                />
                                            <span>{type}</span>
                                        </label></p>)}
                                </div>
                            </li> */}
                            <li>
                            <div className="collapsible-header"><i className="material-icons">cake</i>Diet</div>
                            <div className="collapsible-body">
                            <div className="input-field">
                                    <select defaultValue="" onChange={(event) => setDiet(event.target.value) } >
                                    <option value="" >None</option>
                                    {dietType.map((value) => <option value={value.toLowerCase()} key={value}>{value}</option>)}
                                    </select>
                                    <label>Select a diet</label>
                                </div>
                            </div>
                            </li>
                            <li>
                                <div className="collapsible-header"><i className="material-icons">menu_book</i>Health</div>
                                <div className="collapsible-body">
                                        {health.map((item => <p key={item}>
                                            <label>
                                            <input 
                                                type="checkbox" 
                                                value={item.toLowerCase()} 
                                                onChange={(event) =>  
                                                    cuisines.includes(event.target.value) ? setCuisines(cuisines.filter(cuisine => cuisine!==event.target.value)) : setCuisines([...cuisines, event.target.value])
                                                
                                                }
                                            />
                                            <span>{item}</span>
                                        </label>
                                        </p>))}
                                </div>
                            </li>
                        </ul>
                </form>
            </div>
        </div>
    )
}
// cuisines.includes(item) ? setCuisines([...cuisines.filter(cuisine => cuisine!==item)]) : setCuisines([...cuisines, event.target.value])