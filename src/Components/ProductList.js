import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import '../css/ProductList.css';
export default function ProductList(){



    const [products, setProducts] = React.useState([]);


    const loadProducts =  async () => {
        const result = await axios.get("https://scandiwebnoah.000webhostapp.com/viewProducts.php")
        setProducts(result.data.phpresult);
        console.log(result.data.phpresult);
        // console.log(result.data.phpresult[0])
    }


    React.useEffect(()=> {
        loadProducts();
    }, [])

    const deleteProducts = (e) =>  {
        e.preventDefault()
        console.log("fjdnlfjd")
            products.forEach(product => {
                if(product.select){
                    // axios.delete(`https://scandiwebnoah.000webhostapp.com/deleteProducts.php?id=${product.ID}`)
                    fetch(`https://scandiwebnoah.000webhostapp.com/deleteProducts.php?id=${product.ID}`)
                    // .then(res => {
                    //     console.log(res.data);
                    //     loadProducts();
                    // })   
                    .then(res => res.json())
                    .then(loadProducts())   
                }
            })
    }

    
    function type(product){
        if(product.SIZE !== null){
            return <span>{product.SIZE + " MB "}</span>
        }
        else if(product.WEIGHT !== null){
            return <span>{product.WEIGHT + " KG "}</span>
        }
        else{
            return <span>{product.DIMENSION}</span>
        }
    }
    return(
        <div>
            <section className="product-container">
                <form action="" method="post" onSubmit={deleteProducts}>
                    <div className="product-header">
                        <h2>Product List</h2>
                        <div className="links">
                            <Link to="/AddProduct" className="add-btn"> <button>ADD</button></Link>
                            <button to="/" className="del-button">MASS DELETE</button>
                        </div>
                    </div>
                    <hr/>
                    <div className="product-list">
                    {products.map(product =>
                        <div key={product.ID} className="product">
                            <div>
                                <input 
                                    type="checkbox" id="checkbox" 
                                    onChange={(event)=> product.select = event.target.checked} 
                                    className="delete-checkbox" 
                                    value={product.ID} 
                                    name={product.ID}
                                />
                            </div>
                            <h4>{product.ID}</h4>
                            <h4>{product.SKU}</h4>
                            <h4>{product.NAME}</h4>
                            <p>{product.PRICE}</p>
                            <p>{type(product)}</p>
                        </div>
                    )}
                    </div>
                </form>
            </section>
        </div>
    )
}