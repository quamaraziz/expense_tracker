import React from 'react';
import Form from './Form';
let price = 0;
class Data extends React.Component{
        // Constructor 
    constructor(props) {
        super(props);
   
        this.state = {
            items: [],
            DataisLoaded: false
        };
    }

   
    // ComponentDidMount is used to
    // execute the code 
    componentDidMount() {
        fetch(
            "http://localhost:8000/posts")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json,
                    DataisLoaded: true
                });
            })

    }

    render() {
        const { DataisLoaded, items } = this.state;
        let price = 0;
        let yashTotalAmt = 0;
        let ashishTotalAmt = 0;
        let amountTobepaid = 0;
        let whomTopay = "";
        let amountTopay = 0;
        let isYash = false;
        let isAshish = false;
       
        {items.map((val, key) => {  
            price = parseInt(val.productPrice)+ price;
            if(val.payeeName == "Yash"){
                yashTotalAmt = parseInt(val.productPrice) + yashTotalAmt;
                isYash = true;
            }else{
                ashishTotalAmt = parseInt(val.productPrice) + ashishTotalAmt;
                isAshish = true;
            }           
        })}
        if (isYash && isAshish){
            if(yashTotalAmt > ashishTotalAmt){
                amountTopay = yashTotalAmt-ashishTotalAmt;
                whomTopay = "Yash";

           }else{
            amountTopay = ashishTotalAmt- yashTotalAmt;
            whomTopay = "Ashish";
           }
        }
        else{
            amountTopay = price;
            if (isYash){
                whomTopay = "Yash";
            }
            else{
                whomTopay = "Ashish";
            }


        }
        
        return(
            <>
            <div class="container">
                <div className="headerBar">
                    <h1>Expense Tracker</h1>
                </div>
                <div class="header">
                    <div className="bodyPanel">
                        <div className="LeftSide">
                                <div className="tableData">
                                    <table id='pay_data'>
                                        <tr>
                                            <th>Date</th>
                                            <th>Product Purchased</th>
                                            <th>Price</th>
                                            <th>Payee</th>                                            
                                        </tr>

                                        {items.map((val, key) => {                                   
                                            return (
                                                <tr key={key}>
                                                    <td id="date">{val.productDate}</td>
                                                    <td id="product_purchased">{val.purchasedProduct}</td>
                                                    <td id="product_price">{val.productPrice}</td>
                                                    <td id="payee_name">{val.payeeName}</td>
                                                </tr>
                                            );
                                        })}
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="rightSide">
                            <div className="box">
                                    <a className="button" href="#addExpense">Add New</a>
                            </div>
                            <div id="addExpense" className="overlay">
                                <div className="popup">
                                    <div className="formtextinnr"> 
                                        <h2>Add New Item</h2>
                                        <p class="red">Read the below instructions before proceeding:</p>
                                        <p>Make sure you fill all fields where * is provided</p>
                                    </div>
                                    <a className="close" href="#">&times;</a>
                                    <div className="content">
                                        <Form />
                                </div>
                            </div>
                        </div>
                    </div>
                        
                </div>
                <hr></hr>
                
            </div>
            
            <div className="bodyPanel">
                    {/* <div className="LeftSide">
                        <div className="tableData">
                            <table id='pay_data'>
                                <tr>
                                    <th>Payee</th>
                                    <th>Item Purchased</th>
                                    <th>Price</th>
                                    <th>Date</th>
                                </tr>

                                {items.map((val, key) => {                                   
                                    return (
                                        <tr key={key}>
                                            <td>{val.payeeName}</td>
                                            <td>{val.purchasedProduct}</td>
                                            <td>{val.productPrice}</td>
                                            <td>{val.productDate}</td>
                                        </tr>
                                    );
                                })}
                            </table>
                        </div>
                    </div> */}
                    <div className="rightSide">
                        {/* <div className="box">
                            <a className="button" href="#addExpense">Add New</a>
                        </div> */}


                        <div id="addExpense" className="overlay">
                            <div className="popup">
                                <div className="formtextinnr"> 
                                    <h2>Add New Item</h2>
                                    <p class="red">Read the below instructions before proceeding:</p>
                                    <p>Make sure you fill all fields where * is provided</p>
                                </div>
                                <a className="close" href="#">&times;</a>
                                <div className="content">
                                    <Form />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
        <div className="bodyPanel">
            <div className="LeftSide">
                <div className="tableData">
                    <table id='pay_data'>                  
                   
                <tr>
                    <td>Total</td>
                    <td>{price}</td>
                </tr>

                <tr>
                        <td>Total amount Paid by Yash:</td>
                        <td>{yashTotalAmt}</td>
                    </tr>
                    <tr>
                        <td>Total amount Paid by Ashish:</td>
                        <td>{ashishTotalAmt}</td>
                    </tr>

                    <tr>
                        <td>Pay {whomTopay}</td>
                        <td>{amountTopay}</td>
                    </tr>
           
                    </table>
                </div>
            </div> 
        </div></>
            
        );
    }
}
export default Data;