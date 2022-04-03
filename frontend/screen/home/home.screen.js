import React, { useState, useEffect, useRef } from "react";
import Product from "./products.screen";
import Order from "./orders.screen";
import { LeftMenu } from "../../component";
import { Route } from "react-router-dom";

import '../../assets/css/home/home.css';

export default function Home() {
    return (
        <div className="parent">
            <div className="child-left">
                <LeftMenu />
            </div>
            <div className="child-right">
                <Route path="/" exact >
                    <Product />
                </Route>
                <Route path="/product" >
                    <Product />
                </Route>
                <Route path="/order">
                    <Order />
                </Route>
            </div>
        </div>
    );

}