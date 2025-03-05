import React, { useEffect, useState } from 'react'
import M from 'materialize-css'
import logo from '../logo.png';

export default ({ setSearchTerm, setCuisine, setDiets }) => {
    const health = ['Vegan', 'Vegetarian', 'Sugar-conscious', 'Peanut-free', 'Tree-nut-free', 'Alcohol-free'],
        dietType = ['Balanced', 'High-protein', 'Low-fat', 'Low-carb'];
    const [search, setSearch] = useState('');
    const [cuisines, setCuisines] = useState([]);
    const [diet, setDiet] = useState('');
    const [route, setRoute] = useState(window.location.pathname);

    document.addEventListener('DOMContentLoaded', function () {
        const elems = document.querySelector('.collapsible');
        M.Collapsible.init(elems);
        const selectElems = document.querySelectorAll('select');
        M.FormSelect.init(selectElems);
    });

    useEffect(() => {
        if (route != "/") {
            const params = route;
            var terms = params.split('&');
            const term = terms[0].substring(6);
            var c = [];
            var d = '';
            if (terms.length == 3) {
                c = terms[1].substring(9).split(',');
                d = terms[2].substring(5);
            } else if (terms.length == 2) {
                if (terms[1].includes('cuisine')) {
                    c = terms[1].substring(9).split(',');
                } else {
                    d = terms[1].substring(5);
                }
            }

            if (term) {
                setSearch(term);
                setSearchTerm(term);
            }
            if (c.length > 0) {
                setCuisines(c);
                setCuisine(c);
            }
            if (d) {
                setDiet(d);
                setDiets(d);
            }
        }
    }, [route]);

    const onSubmit = (event) => {
        event.preventDefault();
        const elems = document.querySelector('.collapsible');
        const instance = M.Collapsible.getInstance(elems);
        if (instance) {
            instance.close(0);
            instance.close(1);
            instance.close(2);
        }
        var c = cuisines.length > 0 ? `&cuisines=${cuisines}` : '';
        var d = diet ? `&diet=${diet}` : '';
        var path = `term=${search}` + c + d;
        setRoute(path);
        window.history.pushState({}, '', path);
        setSearch(search);
        setSearchTerm(search);
        setCuisine(cuisines);
        setDiets(diet);
    }


    return (
        <div className="row" style={{ paddingTop: 20 }}>
            <div className="center-align">
                <img src={logo} className='logo' />
            </div>
            <form className="col s12 m12" onSubmit={(event) => { onSubmit(event) }}>
                <div className="row">
                    <div className="input-field col s12 m10">
                        <label htmlFor="searchbar">Search for Recipe</label>
                        <input
                            placeholder="Add ingredients here..."
                            id="searchbar" type="text"
                            className="validate"
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                        />
                    </div>
                    <div className="col s3 m2" style={{ paddingTop: 10 }}>
                        <button className="btn waves-effect" type="submit" name="action">Search
                            <i className="material-icons right">search</i>
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12 m10">
                        <ul className="collapsible">
                            <li>
                                <div className="collapsible-header"><i className="material-icons">cake</i>Diet</div>
                                <div className="collapsible-body">
                                    <div className="input-field">
                                        <select className={window.innerWidth < 640 ? "browser-default" : ""} value={diet} onChange={(event) => setDiet(event.target.value)} >
                                            <option value="" >None</option>
                                            {dietType.map((value) => <option value={value.toLowerCase()} key={value}>{value}</option>)}
                                        </select>
                                        {window.innerWidth < 640 ? <></> : <label>Select a diet</label>}

                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="collapsible-header"><i className="material-icons">menu_book</i>Health</div>
                                <div className="collapsible-body">
                                    {health.map((item => <p key={item}>
                                        <label>
                                            <input
                                                checked={cuisines.includes(item.toLowerCase())}
                                                type="checkbox"
                                                value={item.toLowerCase()}
                                                onChange={(event) =>
                                                    cuisines.includes(event.target.value) ? setCuisines(cuisines.filter(cuisine => cuisine !== event.target.value)) : setCuisines([...cuisines, event.target.value])
                                                }
                                            />
                                            <span>{item}</span>
                                        </label>
                                    </p>))}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </form>
        </div>
    )
}