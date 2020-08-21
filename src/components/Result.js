import React from 'react'
import Loading from './Loading';

export default ({ pagination, setPagination, recipes, loading }) => {
    recipes = recipes.slice(pagination, pagination+12);
    const prevClick= () => {
        if(pagination===0)
        return;
        setPagination(pagination-12);
    }

    const nextClick = () => {
        if(pagination>=96)
        return;
        setPagination(pagination+12);
    }

    return (
        <div>
            <div className="container">
            {loading && <Loading />}
                <div style={{
                    justifyContent: 'center', 
                    display: (recipes.length>0 && !loading)? 'block': 'none'
                }}>
                    <ul className="pagination">
                        {
                            pagination===0 
                            ? <></> 
                            :   <li className="waves-effect" onClick={prevClick}>
                                    <a href="#!">
                                        <div style={{display: 'flex'}}>
                                            <i className="material-icons">chevron_left</i>
                                            <span style={{fontSize: 18}}>Previous</span>
                                        </div>
                                    </a>
                                </li>
                        }
                        {
                            pagination===96
                            ? <></> 
                            :   <li className="waves-effect" onClick={nextClick}>
                                    <a href="#!">
                                        <div style={{display: 'flex'}}>
                                            <span style={{fontSize: 18}}>Next</span>
                                            <i className="material-icons">chevron_right</i>
                                        </div>
                                    </a>
                                </li>
                        }
                        
                    </ul>
                </div>
                
                <div className="row" style={{ display: "flex", flexWrap: "wrap"}}>
                    {!loading && recipes.map(({ recipe }, index) => (
                        <div className="col s12 m4 l4" key={index}>
                        <div className="card">
                                <div className="card-image waves-effect waves-block waves-light">
                                    <img className="activator" src={recipe.image} alt="food" />
                                </div>
                                <div className="card-content">
                                    <span className="card-title activator grey-text text-darken-4">{recipe.label}<i className="material-icons right">more_vert</i></span>
                                    <a href={recipe.url} target="_blank" rel="noopener noreferrer">Full recipe</a>
                                </div>
                                <div className="card-reveal">
                                    <span className="card-title grey-text text-darken-4">{recipe.label}<i className="material-icons right">close</i></span>
                                    <ul>
                                        {recipe.ingredientLines.map((ingredient, index)=> <ul key={index}>{ingredient}</ul>)}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="row">
            <div className="col s5" />
            <div style={{
                    justifyContent: 'center', 
                    display: (recipes.length>0 && !loading)? 'block': 'none'
            }}>
                <ul className="pagination">
                    {
                        pagination===0 
                        ? <></> 
                        :   <li className="waves-effect" onClick={prevClick}>
                                <a href="#!">
                                    <div style={{display: 'flex'}}>
                                        <i className="material-icons">chevron_left</i>
                                        <span style={{fontSize: 18}}>Previous</span>
                                    </div>
                                </a>
                            </li>
                    }
                    {
                        pagination===96
                        ? <></> 
                        :   <li className="waves-effect" onClick={nextClick}>
                                <a href="#!">
                                    <div style={{display: 'flex'}}>
                                        <span style={{fontSize: 18}}>Next</span>
                                        <i className="material-icons">chevron_right</i>
                                    </div>
                                </a>
                            </li>
                    }
                </ul>
            </div>
            </div>
            
        </div>
    )
}