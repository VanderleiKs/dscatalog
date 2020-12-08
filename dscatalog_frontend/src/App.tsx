import React, {useState, useEffect} from 'react';
import './core/assets/style/custom.scss';


const App = () => {
  const [valor, setValor] = useState(0);

  useEffect(() => {
    console.log('começou')
  }, [valor])

return (
  <div className="container">
    <span className="mr-5">{valor}</span>
    <input type="Number" name="numero"></input><br/>
    <button className="btn btn-danger mr-5" onClick={() => setValor(valor + 1)}>+</button>
    <button className="btn btn-warning" onClick={() => setValor(valor * 10) }>*</button>
    <button className="btn btn-success ml-5" onClick={() => setValor(valor / 10)}>/</button>

    
    {valor > 5 && <div className="mt-5 mr-5 alert alert-danger">O valor é {valor}</div>}
  
  </div>
  
);
}
export default App;
