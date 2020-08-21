import React, {useState} from 'react'

export default ({ setSearchTerm }) => {
    const [search, setSearch] = useState('');

    const onSubmit = (event) => {
        event.preventDefault();
        setSearchTerm(search);
    }

    return (
        <div>
            <div className="row">
                <form className="col s12" onSubmit={(event) => onSubmit(event) }>
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
                        <button className="btn waves-effect waves-light" type="submit" name="action">Search
                            <i className="material-icons right">search</i>
                        </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
