import React, { useState, useEffect, useRef } from "react";
import Product from "./products.screen";
import Bill from "./bills.screen";
import { LeftMenu } from "../../component";
import { Route } from "react-router-dom";

import '../../assets/css/home/home.css';

export default function Home() {
    return (
        <div className="parent">
            <div className="child-left">
            <   LeftMenu />
            </div>
            <div className="child-right">
                {/* <Route path="/product">
                    <Product />
                </Route>
                <Route path="/bill">
                    <Bill />
                </Route> */}
            </div>
        </div>
    );

}