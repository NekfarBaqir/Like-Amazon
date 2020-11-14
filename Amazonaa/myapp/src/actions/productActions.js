import {PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS,PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS,PRODUCT_DETAILS_FAIL, PRODUCT_SAVE_REQUEST, PRODUCT_SAVE_SUCCESS, PRODUCT_SAVE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL} from "../constants/productConstants";
import axios from 'axios';
import Axios from "axios";
import { TokenExpiredError } from "jsonwebtoken";
import { productSaveReducer } from "../reducers/productReducers";
const listProducts =() => async (dispatch)=>{
    try{
        dispatch({type:PRODUCT_LIST_REQUEST});
        const {data} = await axios.get("/api/products");
        dispatch({type:PRODUCT_LIST_SUCCESS,payload:data})
    }catch(error){
        dispatch({type:PRODUCT_LIST_FAIL,payload:error.message})
    }
   
}

const saveProduct = (product)=> async(dispatch, getState)=>{
    console.log("here is  the product",product);
try {
    dispatch({type:PRODUCT_SAVE_REQUEST,payload:product});
   // const {userSignin:{userInfo}} = getState;
  
   if(!product._id){
    const {data} = await axios.post('/api/products',product,{headers:{
        // 'Authorization':'Bearer'+userInfo.token 
     }});
     dispatch({type:PRODUCT_SAVE_SUCCESS,payload:data})
   }else{
    const {data} = await axios.put('/api/products/'+product._id,product,{headers:{
        // 'Authorization':'Bearer'+userInfo.token 
      }});
     dispatch({type:PRODUCT_SAVE_SUCCESS,payload:data}) 
   }
   
} catch (error) {
    dispatch({type:PRODUCT_SAVE_FAIL,payload:error.message})     
}
}

const detailsProduct = (productId)=>async(dispatch)=>{
    try{
        dispatch({type:PRODUCT_DETAILS_REQUEST,payload:productId});
        const {data} = await axios.get("/api/products/"+productId);
        dispatch({type:PRODUCT_DETAILS_SUCCESS,payload:data});
    }catch(error){
        dispatch({type:PRODUCT_DETAILS_FAIL,payload:error.message});
    }
}


// delete product

const deleteProduct = (productId)=>async(dispatch)=>{
    try{
        dispatch({type:PRODUCT_DELETE_REQUEST,payload:productId});
        const {data} = await axios.delete("/api/products/"+productId,{headers:{
           // 'Authorization':'Bearer'+userInfo.token 
         }});
        dispatch({type:PRODUCT_DELETE_SUCCESS,payload:data,success:true});
    }catch(error){
        dispatch({type:PRODUCT_DELETE_FAIL,payload:error.message});
    }
}
export {listProducts, detailsProduct,saveProduct,deleteProduct}