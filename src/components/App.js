import React, { useState, useEffect, useRef } from 'react';
import Search from './Search';
import Result from './Result';

function App() {
  const APP_ID= '423fbe29', APP_KEY='d0ec1bf446ec934e32bcb880f78bf980';
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const prevSearchIdRef = useRef();
  useEffect(() => {
    prevSearchIdRef.current = searchTerm;
  });
  const prevSearch = prevSearchIdRef.current;


  useEffect(() => {
    var currentPagination = 0;
    const getRecipes = async() => {
      setLoading(true);
      if(prevSearch !== searchTerm){ 
        setPagination(0);
      }
      const result = await fetch(`https://api.edamam.com/search?q=${searchTerm}&app_id=${APP_ID}&app_key=${APP_KEY}&from=${currentPagination}&to=${currentPagination+100}`);
      const data = await result.json();
      if(data.hits.length>0){
        setLoading(false);
        setData(data.hits);
      }
    }    
      if(searchTerm && searchTerm !== prevSearch){
        getRecipes();
      }
    
  }, [searchTerm, pagination]);

  return (
    <div className="App">
      <Search setSearchTerm={setSearchTerm} />
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
