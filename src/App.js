import ProductList from "./Components/ProductList"
import AddProduct from "./Components/AddProduct"
import {  Route, Routes } from "react-router-dom"

export default function App(){

   

    
    return(
        <Routes>
            <Route path="/" element={<ProductList/>}/>
            <Route path="/AddProduct" element={<AddProduct/>}/>
        </Routes>
    )
}
