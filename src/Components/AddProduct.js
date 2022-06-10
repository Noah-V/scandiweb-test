import { Link, useNavigate } from "react-router-dom"
import '../css/addProduct.css'
import React from "react"
import axios from "axios";
export default function AddProduct(){
    let navigate = useNavigate();



    // function firstFocus(){
    //     const skuField = document.saveproduct.sku.focus();
    //     return true;
    // }

    function displayRelevantFields(){
        var productType = document.getElementById('productType').value;
        // console.log(productType)
        var relevantFields = document.querySelectorAll('[ifproducttype]');
        // var productTypeResult = document.getElementById('productType-result');
        // console.log(productTypeResult)
        // console.log(relevantFields.)
    
        relevantFields.forEach(field => {
            // console.log(field.getAttribute("ifproducttype"))
            // console.log(field.style)
            field.getAttribute("ifproducttype") === productType ? field.style.display = '' : field.style.display = 'none';
        })
    }
    
    const [productDetails, setProductDetails] = React.useState(
        {
            sku: "",
            name: "",
            price: "",
            dvdsize: "",
            weight: "",
            width: "",
            height: "",
            length: "",
            type: ""
        }
    )

    const [formErrors, setFormErrors] = React.useState({});
    const [isSubmit, setIsSubmit] = React.useState(false);

    
    // const form = document.forms.product_form.name;
    // // console.log(form)
    
    React.useEffect(()=> {
        // firstFocus();
        document.getElementById('productType').addEventListener('change', displayRelevantFields);
        displayRelevantFields();
    })

    React.useEffect(()=> {
        console.log(formErrors)
        if(Object.keys(formErrors).length === 0 ** isSubmit){
            console.log(productDetails);
        }
    },[formErrors])



   async function handleSubmit(event){
        event.preventDefault();
        setFormErrors(validate(productDetails));
        setIsSubmit(true)
        await axios.post("/api/addProduct.php", productDetails)
        .then(res => console.log(res.data));
        navigate('/');
    }
    
    function validate(productDetails){
        const errors = {}
        const regex = /\d[0-9]+/;
        if(!productDetails.name){
            errors.name = "Please Submit Required data"
        }
        if(!productDetails.sku){
            errors.sku = "Please submit required data"
        }
        if(!productDetails.price){
            errors.price = "Please submit required data"
        }
        else if(!regex.test(productDetails.price)){
            errors.price = "Please provide data of indicated type"
        }
        // if(!productDetails.weight){
        //     errors.weight = "Please submit required data"
        // }
        // if(!productDetails.dimension){
        //     errors.dimension = "Please submit required data"
        // }
        return errors
    }
    
    
    function onDetailFieldChange(event){
        const{name, value} = event.target
        setProductDetails(prevProductDetails => {
            return{
                ...prevProductDetails,
                [name]: value
            }
        })
    }
    
    return(
        <div >
            <section>
                {/* <pre>{JSON.stringify(productDetails, undefined, 2)}</pre> */}
                <form action="" id="product_form"   name="saveproduct" onSubmit={handleSubmit} >
                    <div className="product-header">
                        <h2>Product Add</h2>
                        <div className="links">
                            <button className="add-btn">Submit</button>
                            <Link to="/"><button className="cancel-btn" style={{backgroundColor:`#E44D4D`}}>Cancel</button></Link>
                        </div>
                    </div>
                    <hr/>
                    <div className="section-form">
                        <div>
                            <label>SKU</label>
                            <input 
                            type="text" 
                            placeholder="Enter your sku" 
                            id="sku" 
                            name="sku"   
                            onChange={onDetailFieldChange} 
                            value={productDetails.sku}
                        />
                            <span className="error" id="skuError">{formErrors.sku}</span>
                            <span className="good" id="skuGood"></span>
                        </div>
                        <div>
                            <label>Name</label>
                            <input 
                                type="text" 
                                placeholder="Enter your name" 
                                id="name" 
                                name="name"
                                onChange={onDetailFieldChange} 
                                value={productDetails.name} 
                            />
                            <span className="error" id="skuError">{formErrors.name}</span>
                        </div>
                        <div>
                            <label>Price ($)</label>
                            <input 
                                type="text" 
                                placeholder="Enter your price" 
                                id="price" 
                                name="price"
                                onChange={onDetailFieldChange}
                                value={productDetails.price}
                            />
                            <span className="error" id="priceError">{formErrors.price}</span>
                        </div>
                        <div className="responsive-form">
                            <label>Type Switcher</label>
                            <select id="productType" name="type" onChange={onDetailFieldChange} value={productDetails.type}>
                                <option value="" >Select product type</option>
                                <option value="DVD" >DVD</option>
                                <option value="Book" >Book</option>
                                <option value="Furniture" >Furniture</option>
                            </select>
                            <div id="productType-result">
                                <input 
                                    type="text" 
                                    name="dvdsize" 
                                    placeholder="Enter Dvd Size" 
                                    ifproducttype="DVD" id="size" 
                                    onChange={onDetailFieldChange} 
                                    value={productDetails.dvdsize}
                                />
                                <span ifproducttype="DVD" id="dvdError" className="error">{formErrors.size}</span>
                                <input 
                                    type="text" 
                                    name="weight" 
                                    placeholder="Enter book weight" 
                                    id="weight" 
                                    ifproducttype="Book" 
     
                                    onChange={onDetailFieldChange}
                                    value={productDetails.weight}
                                />
                                <span name="weightError"></span>
                                <span name="weightGood"></span>


                                <div ifproducttype="Furniture" name="Furniture" className="furniture" >
                                    <input 
                                        id="height" 
                                        type="text" 
                                        placeholder="Enter furniture height" 
                                        name="height" onChange={onDetailFieldChange} 
                                        value={productDetails.height}
                                    />
                                    <span name="furHeightError" className="error"></span><span name="furHeightGood">{formErrors.dimension}</span>
                                    <input 
                                        id="width" 
                                        type="text" 
                                        placeholder="Enter furniture Width" 
                                        name="width" 
                                        onChange={onDetailFieldChange} 
                                        value={productDetails.width}
                                    />
                                    <span name="furWidthError" className="error"></span><span name="furWidthGood"></span>
                                    <input 
                                        id="length" 
                                        type="text" 
                                        placeholder="Enter furniture length" 
                                        name="length" 
                                        onChange={onDetailFieldChange}
                                        value={productDetails.length}
                                    />
                                    <span name="furLengthError" className="error"></span><span name="furLengthGood"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </div>
    )
}