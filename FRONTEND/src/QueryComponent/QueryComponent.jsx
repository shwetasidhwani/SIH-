import React , {useState} from 'react';
import axios from 'axios';

const QueryComponent = () => {
    const [query , setQuery] = useState('');
    const [response , setResponse] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            console.log(query);
            const res = await axios.post('http://localhost:3000/api/llm/query', {query});
            console.log(res.data);
            setResponse(res.data);
        }
        catch(error){
            console.error("Error in handleSubmit in Query COmponenet : ", error);
            setResponse(error);
        }
    };


    return (
        <div>
            <h2>Ask for Directions</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter your question..."
                />
                <button type="submit">Submit</button>
            </form>
            <p>{response}</p>
        </div>
    );
}

export default QueryComponent;