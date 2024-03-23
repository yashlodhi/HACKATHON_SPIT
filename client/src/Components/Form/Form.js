import axios from 'axios';

function Form() {
    function handlePredictFormSubmit(event) {
        event.preventDefault();  

        const formData = new FormData(event.target);  
        const data = {};  

         
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }

         
        axios.post('http://localhost:9000/predict', data)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return ( 
    <form onSubmit={handlePredictFormSubmit}>
    <label htmlFor="state">State Code: </label>
    <input type="text" id="state"/>
    <br />
    <label htmlFor="account">Account Length: </label>
    <input type="number" id="account"/>
    <br />
    <label htmlFor="Area">Area Code: </label>
    <input type="text" id="Area"/>
    <br />
    <label htmlFor="ip">International Plan: </label>
    <input type="text" id="ip"/>
    <br />
    <label htmlFor="vmp">Voice Mail Plan: </label>
    <input type="text" id="vmp"/>
    <br />
    <label htmlFor="nvmm">Number of Voice Mail: </label>
    <input type="number" id="nvmm"/>
    <br />
    <label htmlFor="tdm">Total Day Minutes: </label>
    <input type="number" id="tdm"/>
    <br />
    <label htmlFor="tdc">Total Day Calls: </label>
    <input type="number" id="tdc"/>
    <br />
    <label htmlFor="tdch">Total Day Charge: </label>
    <input type="number" id="tdch"/>
    <br />
    <label htmlFor="tec">Total Eve Calls: </label>
    <input type="number" id="tec"/>
    <br />
    <label htmlFor="tech">Total Evening Charge: </label>
    <input type="number" id="tech"/>
    <br />
    <label htmlFor="tnm">Total Night Minutes: </label>
    <input type="number" id="tnm"/>
    <br />
    <label htmlFor="tnc">Total Night Calls: </label>
    <input type="number" id="tnc"/>
    <br />
    <label htmlFor="tnch">Total Night Charge: </label>
    <input type="number" id="tnch"/>
    <br />
    <label htmlFor="tim">Total International Minutes: </label>
    <input type="number" id="tim"/>
    <br />
    <label htmlFor="tic">Total International Calls: </label>
    <input type="number" id="tic"/>
    <br />
    <label htmlFor="tich">Total International Charge: </label>
    <input type="number" id="tich"/>
    <br />
    <label htmlFor="ncsc">Number Customer Service Calls: </label>
    <input type="number" id="ncsc"/>
    <br />

    <button >Predict</button>
    
    </form> );
}

export default Form;