import React from 'react';
import Axios from 'axios';
let error = false;
let val_payee_name=false;
let val_purchased_product=false;
let val_product_price=false;
let val_product_date=false;


const url ="http://localhost:8000/posts";
export default class Form extends React.Component{
    constructor(){
        super()
        this.initialState={
            payeeName:'',
            purchasedProduct:'',
            productPrice:'',
            productDate:null
        }
        this.state = this.initialState;
        this.handleChange = this.handleChange.bind(this);

        // var date_current = new Date();
        // var firstDay = new Date(date_current.getFullYear(), date_current.getMonth(), 1);
        // var lastDay = new Date(date_current.getFullYear(), date_current.getMonth() + 1, 0);

        // let date_element = document.getElementById("date");
        // date_element.setAttribute("min", firstDay);
        // date_element.setAttribute("max", lastDay);

       
    }
   
    handleChange(event) {
        event.preventDefault();
        const name = event.target.name;
        const value =  event.target.value;
        this.setState({
            [name]: value
          }); 
          console.log(this.state);      
      }

    handleSubmit(event) {  
      
        event.preventDefault();
        let payee_name =event.currentTarget[0].value
        let purchased_product =event.currentTarget[1].value
        let product_price =event.currentTarget[2].value
        let product_date =event.currentTarget[3].value

        if(payee_name == "Choose Payee" && (val_payee_name == false)){
            event.currentTarget[0].after('Please Enter some value')
            error = true;
            val_payee_name=true;
        }
        else if(purchased_product == "" && (val_purchased_product == false)){
            event.currentTarget[1].after('Please Enter some value')
            error = true;
            val_purchased_product=true;
        }
        else if(product_price == "" && (val_product_price == false)){
            event.currentTarget[2].after('Please Enter some value')
            error = true;
            val_product_price = true;
        }
        else if(product_date == "" && (val_product_date == false)){
            event.currentTarget[3].after('Please Enter some value')
            error = true;
            val_product_date = true;
        }
        if (payee_name && purchased_product && product_price && product_date){
            error = false;
        }
        
        if (!error){
            Axios.post(url,{
                payeeName: payee_name,
                purchasedProduct: purchased_product,
                productPrice: product_price,
                productDate: product_date,
            });
            let cal_data = document.getElementById("cal_data");
            let pay_table = document.getElementById("pay_data");
            let row_table = pay_table.insertRow(-1);
            let pay_cell1 = row_table.insertCell(0);
            let pay_cell2 = row_table.insertCell(1);
            let pay_cell3 = row_table.insertCell(2);
            let pay_cell4 = row_table.insertCell(3);
            pay_cell1.innerHTML = payee_name;
            pay_cell2.innerHTML = purchased_product;
            pay_cell3.innerHTML = product_price;
            pay_cell4.innerHTML = product_date;
            window.location.reload(false);
        }
    }
  
render(){
    return (
        <>
        <form action="" method="post" onSubmit={this.handleSubmit} noValidate>
            <div className="form-group">
                <label>Name<span class="required">*</span></label>
                <select name="payeeName" id="payeeName" onChange={this.handleChange} value={this.state.payeeName} >
                    <option>Choose Payee</option>
                    <option value="Yash">Yash</option>
                    <option value="Ashish">Ashish</option>
                </select>
            </div>

            <div className="form-group">
                <label>Product Purchased<span class="required">*</span></label>
                <input id="productPurchased" type="text" name="purchasedProduct" onChange={this.handleChange} value={this.state.purchasedProduct}/>
            </div>

            <div className="form-group">
                <label>Product Price<span class="required">*</span></label>
                <input id="productPrice" type="number" name="productPrice" onChange={this.handleChange} value={this.state.productPrice}/>
            </div>

            <div className="form-group">
                <label>Date<span class="required">*</span></label>
                {/* <input type="date" id="date" name="productDate" min={firstDay} max={lastDay} onChange={this.handleChange} value={this.state.productDate}></input> */}
                <input id="date" type="date" name="productDate" onChange={this.handleChange} value={this.state.productDate}/>
            </div>

            <div className="formButtons">
                <input className="submit-btn" type="submit" value="submit" />
                <a className="close" href="#">Close</a>
            </div>
            
        </form>
        </>
    );
}}