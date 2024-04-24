import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from '../firebase-config';
import { doc, addDoc, collection } from 'firebase/firestore';

// window.onload = function() {
//     const user = localStorage.getItem('user');

//     if (user) {
//         window.location.href = '/play';
//     }
// };

const Form = () => {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [pnumber, setPnumber] = useState('');
    const [birthday, setBirthday] = useState('');
    const [province, setProvince] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [unit, setUnit] = useState('');
    const [postal, setPostal] = useState('');

  

    let fieldsCheck;

    function namesCheck(dataToCheck){
        let pat2 = /^[A-Z][a-zA-Z]*$/;
        if(pat2.test(dataToCheck.field.value)){
            return true;
        }
        return false;
    }

    function emailCheck(dataToCheck){
        let pat2 = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(pat2.test(dataToCheck.field.value)){
            return true;
        }
        return false;
    }

    function pnumbCheck(dataToCheck){
        let pat2 = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
        if(pat2.test(dataToCheck.field.value)){
            return true;
        }
        return false;
    }



    function birthdayCheck(dataToCheck) {
        let minDate = document.getElementById('birthday').getAttribute('min');
        let maxDate = document.getElementById('birthday').getAttribute('max');
        if (dataToCheck.field.value >= minDate && dataToCheck.field.value <= maxDate) {
            return true;
        } 
        return false;
    }

    function provinceCheck(dataToCheck){
        if(dataToCheck.field.value == ""){
            return false;
        }
        return true;
    }

    function cityCheck(dataToCheck){
        let pat2 = /^[A-Z][a-zA-Z\s-]+(?:\s[A-Za-z\s-]+)*$/;
        if(pat2.test(dataToCheck.field.value)){
            return true;
        }
        return false;
    }

    function streetCheck(dataToCheck){
        let pat2 = /^\d{1,5}\s[A-Za-z]+(?:\s[A-Za-z]+)+$/;
        if(pat2.test(dataToCheck.field.value)){
            return true;
        }
        return false;
    }

    function apptNumbCheck(dataToCheck) {
        let pat2 = /^[a-zA-Z0-9\s#-]+$/;
        if (dataToCheck.field.value === "" || pat2.test(dataToCheck.field.value)) {
            return true;
        }
        return false;
    }

    function postalCodeCheck(dataToCheck){
        let pat2 = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i;
        if(pat2.test(dataToCheck.field.value)){
            return true;
        }
        return false;
    }

    function secretCheck(strVal){
        let secPat = /^(S.*c)\s+(A.*m)$/;
        if(secPat.test(strVal)){
            return true;
        }
        return false;
    }

    function errorsReset(){
        fieldsCheck.forEach(inputField => {
            inputField.error.innerText = "";
            inputField.field.style.border = "";
        });
    }

    function createUser() {
        localStorage.setItem('user', document.querySelector("#email").value);
        const userRef = collection(db, 'users');
        addDoc(userRef, {
            fname: document.querySelector("#firstName").value,
            lname: document.querySelector("#lastName").value,
            email: document.querySelector("#email").value,
            pnumber: document.querySelector("#pnumb").value,
            birthday: document.querySelector("#birthday").value,
            province: document.querySelector("#province").value,
            city: document.querySelector("#city").value,
            address: document.querySelector("#street").value,
            unit: document.querySelector("#unit").value,
            postal: document.querySelector("#postalCode").value
        })
        .then(() => {
            console.log('User added to Firestore');
            window.location.href = "/play";
        })
        .catch((err) => {
            console.error('Error adding user to Firestore: ', err);
        });
    }
    

    function formChecker(e){
        let errorsDetected = 0;
        errorsReset();
        e.preventDefault();
        fieldsCheck.forEach(inputField => {
            if(inputField.checker(inputField)==false){
                inputField.error.innerText = inputField.msg;
                inputField.field.style.border = "2px solid red";
                errorsDetected +=1;
            }
        });
        let ageCheck = document.querySelector("#ageCheck");
        if (document.querySelector("#ageCheck").checked) {
            ageCheck.style.outline = "";
        } else {
            ageCheck.style.outline = "2px solid red";
            errorsDetected +=1;
        }
        let agreeCheck = document.querySelector("#agreeCheck");
        if (document.querySelector("#agreeCheck").checked) {
            agreeCheck.style.outline = "";
        } else {
            agreeCheck.style.outline = "2px solid red";
            errorsDetected +=1;
        }
        if(errorsDetected>0){
            console.log("correct errors before submitting");
        }else{
            let showSecret = secretCheck(document.querySelector("#firstName").value + " " + document.querySelector("#lastName").value);
            if(showSecret){
                console.log("You've found it!");
                let secretBox = document.querySelector(".secretBox");
                secretBox.style.display = "block";
            }else{
                console.log("Welcome to BuyMore!");
                createUser();
            }
        }
    }

    function closeSecretButton() {
        let secretBox = document.querySelector(".secretBox");
        secretBox.style.display = "none";
    }


    function initForm(){
        const user = localStorage.getItem('user');
        if (user) {
            window.location.href = '/play';
        }
        let firstName = document.querySelector("#firstName");
        let lastName = document.querySelector("#lastName");
        let email = document.querySelector("#email");
        let pnumb = document.querySelector("#pnumb");
        let birthday = document.querySelector("#birthday");
        let province = document.querySelector("#province");
        let city = document.querySelector("#city");
        let street = document.querySelector("#street");
        let unit = document.querySelector("#unit");
        let postalCode = document.querySelector("#postalCode");
        let totalError = document.querySelector("#totalError");
        fieldsCheck = [
            {field: firstName, checker:namesCheck, error:totalError,msg:"One or more fields are incorrect"},
            {field: lastName, checker:namesCheck, error:totalError, msg:"One or more fields are incorrect"},
            {field: email, checker:emailCheck, error:totalError, msg:"One or more fields are incorrect"},
            {field: pnumb, checker:pnumbCheck, error:totalError, msg:"One or more fields are incorrect"},
            {field: birthday, checker:birthdayCheck, error:totalError, msg:"One or more fields are incorrect"},
            {field: province, checker:provinceCheck, error:totalError, msg:"One or more fields are incorrect"},
            {field: city, checker:cityCheck, error:totalError, msg:"One or more fields are incorrect"},
            {field: street, checker:streetCheck, error:totalError, msg:"One or more fields are incorrect"},
            {field: unit, checker:apptNumbCheck, error:totalError, msg:"One or more fields are incorrect"},
            {field: postalCode, checker:postalCodeCheck, error:totalError, msg:"One or more fields are incorrect"}
        ]
        let formSubmit = document.querySelector(".signupForm");
        formSubmit.addEventListener("submit", formChecker);    
    }
    // document.addEventListener("DOMContentLoaded", function() {
    //     initForm();
    // });

    useEffect(()=>{
        initForm();
    },[]);

    return (
        <div className='root'>
            <div className="formInstructions">
                <h1>Ready - Set - Match</h1>
                <h2>Sign-up Now!</h2>
                <p>Discover enticing prizes and exciting winning opportunities in the contest! Brace yourself for a skill-testing question that winners must conquer.</p>
                <p>Get ready to dive into the thrill of potential victories!</p>
                <p>Boxes with * are required fields.</p><br />
                <form className="signupForm">
                    <label htmlFor="firstName"><span className='greenSpan'>* </span>First name:</label>
                    <input type="text" id="firstName" name="firstName" placeholder='Ex. "John"' value={fname} onChange={(e) => setFname(e.target.value)} /><br/>
                    <p id="firstNameError"></p>
                    <label htmlFor="lastName"><span className='greenSpan'>* </span>Last name:</label>
                    <input type="text" id="lastName" name="lastName" placeholder='Ex. "Smith"' value={lname} onChange={(e) => setLname(e.target.value)} /><br/>
                    <p id="lastNameError"></p>
                    <label htmlFor="email"><span className='greenSpan'>* </span>Email:</label>
                    <input type="text" id="email" name="email" placeholder='Ex. "buymore@dollars.ca"' value={email} onChange={(e) => setEmail(e.target.value)} /><br/>
                    <p id="emailError"></p>
                    <label htmlFor="pnumb"><span className='greenSpan'>* </span>Phone Number:</label>
                    <input type="text" id="pnumb" name="pnumb"  placeholder='Ex. "123-456-7890"' value={pnumber} onChange={(e) => setPnumber(e.target.value)} /><br/>
                    <p id="pnumbError"></p>
                    <label htmlFor="birthday"><span className='greenSpan'>* </span>Birthday:</label>
                    <input type="date" id="birthday" name="birthday" min="1900-01-01" max="2007-02-07" value={birthday} onChange={(e) => setBirthday(e.target.value)} /><br/>
                    <p id="bdayError"></p>
                    <label htmlFor="province"><span className='greenSpan'>* </span>Province:</label>
                    <select id="province" name="province" value={province} onChange={(e) => setProvince(e.target.value)}>
                        <option value="AB">Alberta</option>
                        <option value="BC">British Columbia</option>
                        <option value="MB">Manitoba</option>
                        <option value="NB">New Brunswick</option>
                        <option value="NL">Newfoundland and Labrador</option>
                        <option value="NS">Nova Scotia</option>
                        <option value="NT">Northwest Territories</option>
                        <option value="NU">Nunavut</option>
                        <option value="ON">Ontario</option>
                        <option value="PE">Prince Edward Island</option>
                        <option value="QC">Quebec</option>
                        <option value="SK">Saskatchewan</option>
                        <option value="YT">Yukon</option>
                    </select>
                    <p id="provinceError"></p>
                    <label htmlFor="city"><span className='greenSpan'>* </span>City:</label>
                    <input type="text" id="city" name="city"  placeholder='Ex. "Oshawa"' value={city} onChange={(e) => setCity(e.target.value)}/><br/>
                    <p id="cityError"></p>
                    <label htmlFor="street"><span className='greenSpan'>* </span>Street:</label>
                    <input type="text" id="street" name="street" placeholder='Ex. "1200 Simcoe Street"' value={address} onChange={(e) => setAddress(e.target.value)} /><br/>
                    <p id="streetError"></p>
                    <label htmlFor="unit">Unit/Apt:</label>
                    <input type="text" id="unit" name="unit" placeholder='Ex. "Apt 101" Optional' value={unit} onChange={(e) => setUnit(e.target.value)} /><br/>
                    <p id="unitError"></p>
                    <label htmlFor="postalCode"><span className='greenSpan'>* </span>Postal Code:</label>
                    <input type="text" id="postalCode" name="postalCode" placeholder='Ex. "L1G0C5"' value={postal} onChange={(e) => setPostal(e.target.value)}/><br/><br></br>
                    <div className="checkLabel">
                        <input type="checkbox" id="ageCheck" name="ageCheck" />
                        <label htmlFor="ageCheck"><span className='greenSpan'>* </span>Are you over the age of 17?</label><br></br>
                        <input type="checkbox" id="agreeCheck" name="agreeCheck" />
                        <label htmlFor="agreeCheck"><span className='greenSpan'>* </span>Do you agree to the <Link to="/legal"><span className="greenSpan">Terms and Conditions?</span></Link></label>
                        <p id="totalError"></p>
                    </div>
                    <div className='submitBtn'>
                        <input type="submit" value="Submit & Play"/>
                    </div>
                </form> 
                <p>Note: that entries could be disqualified at the discretion of the BuyMore Dollars Inc. leadership team for any valid reason. </p>
                <div className="secretBox">
                    <div className="secretInfo">
                        <h1>You Made it!</h1> <button className="closeSecret" onClick={closeSecretButton}>X</button>
                        <h2>This is a secret page</h2>
                        <p>Congratulations! You've cracked the code and emerged victorious! Welcome to the secret admin page. Keep up the winning streak!</p>
                        <p>If you don't know how you got here, get a coupon for Cabbage on a Stick Hut!</p><br></br>
                        <h2>Coupon Code:</h2>
                        <h3>kf3KF21</h3><br></br>
                        <h2><span className="greenSpan">89</span> GIFTS LEFT</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Form;
