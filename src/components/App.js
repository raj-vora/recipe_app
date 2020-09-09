import React, { useState, useEffect} from 'react';
import Search from './Search';
import Result from './Result';

function App() {
  const APP_ID= '423fbe29', APP_KEY='d0ec1bf446ec934e32bcb880f78bf980';
  const [searchTerm, setSearchTerm] = useState('');
  const [cuisines, setCuisines] = useState([]);
  const [diet, setDiet] = useState('');
  const [pagination, setPagination] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    var extraString = ''
    // if(meal)
    //   extraString += '&mealType='+meal.toLowerCase();
    if(diet) 
      extraString += '&diet='+diet;
    if(cuisines)
      cuisines.forEach((cuisine) => extraString += '&health='+cuisine)
    var currentPagination = 0;
    const getRecipes = async() => {
      setLoading(true);
      const result = await fetch(`https://api.edamam.com/search?q=${searchTerm}&app_id=${APP_ID}&app_key=${APP_KEY}&from=${currentPagination}&to=${currentPagination+100}`+extraString);
      const data = await result.json();
      if(data.hits.length>0){
        setLoading(false);
        setData(data.hits);
      }
    }    
      if(searchTerm){
        setPagination(0);
        getRecipes();
      }
    
  }, [searchTerm, diet, cuisines]);

  return (
    <div className="App">
      <Search 
        setSearchTerm={setSearchTerm} 
        setCuisine={setCuisines}
        setDiets={setDiet}
        />
      <Result 
        pagination={pagination} 
        setPagination={setPagination} 
        recipes={data} 
        loading={loading}
      />
    </div>
  );
}

export default App;
